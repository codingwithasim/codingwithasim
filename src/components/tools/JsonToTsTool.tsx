'use client';

import { useCallback, useMemo, useState } from 'react';
import { Copy, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type TypeResult = {
  type: string;
  defs: string[];
};

type PrimitiveKind = 'string' | 'number' | 'boolean' | 'null' | 'unknown';

type TypeInfo =
  | { kind: 'primitive'; name: PrimitiveKind }
  | { kind: 'literal'; name: 'string' | 'number' | 'boolean'; value: string | number | boolean }
  | { kind: 'array'; element: TypeInfo }
  | { kind: 'object'; props: Map<string, { type: TypeInfo; optional: boolean }> }
  | { kind: 'union'; types: TypeInfo[] };


type Context = {
  defs: string[];
  defined: Map<string, string>;
  signatureToName: Map<string, string>;
  usedNames: Set<string>;
};

const SAMPLE_JSON = `{
  "id": 42,
  "name": "Bilal",
  "email": "bilal@example.com",
  "active": true,
  "roles": ["admin", "editor"],
  "profile": {
    "timezone": "Europe/Paris",
    "created_at": "2024-08-21T10:04:22Z"
  }
}`;

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const toPascalCase = (value: string) =>
  value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') || 'Type';

const sanitizeTypeName = (value: string) => {
  const name = toPascalCase(value);
  return /^[A-Za-z]/.test(name) ? name : `Type${name}`;
};

const singularizeWord = (value: string) => {
  if (value.endsWith('ies') && value.length > 3) return `${value.slice(0, -3)}y`;
  if (value.endsWith('ses') && value.length > 3) return value.slice(0, -2);
  if (value.endsWith('s') && !value.endsWith('ss') && value.length > 1) return value.slice(0, -1);
  return value;
};

const singularizeName = (value: string) => {
  const cleaned = value.replace(/[_-]+/g, ' ').trim();
  const parts = cleaned.split(' ').filter(Boolean);
  if (parts.length === 0) return 'Item';
  const last = parts[parts.length - 1];
  parts[parts.length - 1] = singularizeWord(last);
  return sanitizeTypeName(parts.join(' '));
};

const isValidIdentifier = (value: string) => /^[A-Za-z_$][\w$]*$/.test(value);

const getUniqueName = (base: string, ctx: Context) => {
  let name = sanitizeTypeName(base);
  if (!ctx.usedNames.has(name)) {
    ctx.usedNames.add(name);
    return name;
  }
  let index = 2;
  while (ctx.usedNames.has(`${name}${index}`)) {
    index += 1;
  }
  const unique = `${name}${index}`;
  ctx.usedNames.add(unique);
  return unique;
};

const isSameType = (a: TypeInfo, b: TypeInfo) => signatureOf(a) === signatureOf(b);

const mergeTypes = (a: TypeInfo, b: TypeInfo): TypeInfo => {
  if (isSameType(a, b)) return a;

  if (a.kind === 'union') {
    return addToUnion(a, b);
  }
  if (b.kind === 'union') {
    return addToUnion(b, a);
  }

  if (a.kind === 'array' && b.kind === 'array') {
    return { kind: 'array', element: mergeTypes(a.element, b.element) };
  }

  if (a.kind === 'object' && b.kind === 'object') {
    return mergeObjects(a, b);
  }

  if (a.kind === 'literal' && b.kind === 'literal' && a.name === b.name) {
    return { kind: 'union', types: [a, b] };
  }

  if (a.kind === 'literal' && b.kind === 'primitive' && b.name === a.name) return b;
  if (b.kind === 'literal' && a.kind === 'primitive' && a.name === b.name) return a;

  return addToUnion({ kind: 'union', types: [a] }, b);
};

const addToUnion = (union: { kind: 'union'; types: TypeInfo[] }, next: TypeInfo): TypeInfo => {
  const types = [...union.types];
  const existing = types.find((type) => isSameType(type, next));
  if (!existing) types.push(next);
  return normalizeUnion({ kind: 'union', types });
};

const normalizeUnion = (union: { kind: 'union'; types: TypeInfo[] }): TypeInfo => {
  const flattened: TypeInfo[] = [];
  union.types.forEach((type) => {
    if (type.kind === 'union') {
      flattened.push(...type.types);
    } else {
      flattened.push(type);
    }
  });

  const unique: TypeInfo[] = [];
  flattened.forEach((type) => {
    if (!unique.some((item) => isSameType(item, type))) {
      unique.push(type);
    }
  });

  const objects = unique.filter((type) => type.kind === 'object') as Array<
    Extract<TypeInfo, { kind: 'object' }>
  >;

  if (objects.length === unique.length && objects.length > 1) {
    const merged = objects.reduce((acc, item) => mergeObjects(acc, item));
    return merged;
  }

  if (unique.length === 1) return unique[0];
  return { kind: 'union', types: unique };
};

const mergeObjects = (a: Extract<TypeInfo, { kind: 'object' }>, b: Extract<TypeInfo, { kind: 'object' }>) => {
  const merged = new Map<string, { type: TypeInfo; optional: boolean }>();
  const keys = new Set([...a.props.keys(), ...b.props.keys()]);

  keys.forEach((key) => {
    const aProp = a.props.get(key);
    const bProp = b.props.get(key);
    if (aProp && bProp) {
      merged.set(key, {
        type: mergeTypes(aProp.type, bProp.type),
        optional: aProp.optional || bProp.optional,
      });
    } else if (aProp) {
      merged.set(key, { type: aProp.type, optional: true });
    } else if (bProp) {
      merged.set(key, { type: bProp.type, optional: true });
    }
  });

  return { kind: 'object', props: merged } satisfies TypeInfo;
};

const inferType = (value: unknown, nameHint: string): TypeInfo => {
  if (value === null) return { kind: 'primitive', name: 'null' };
  if (Array.isArray(value)) {
    if (value.length === 0) return { kind: 'array', element: { kind: 'primitive', name: 'unknown' } };
    const elementName = singularizeName(nameHint);
    const element = value
      .map((item) => inferType(item, elementName))
      .reduce((acc, item) => mergeTypes(acc, item));
    return { kind: 'array', element };
  }
  const type = typeof value;
  if (type === 'string') return { kind: 'literal', name: 'string', value: value as string };
  if (type === 'number') return { kind: 'literal', name: 'number', value: value as number };
  if (type === 'boolean') return { kind: 'literal', name: 'boolean', value: value as boolean };
  if (type === 'object') {
    const record = value as Record<string, unknown>;
    const propMap = new Map<string, { type: TypeInfo; optional: boolean }>();
    Object.entries(record)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([key, val]) => {
        propMap.set(key, { type: inferType(val, key), optional: false });
      });
    return { kind: 'object', props: propMap };
  }
  return { kind: 'primitive', name: 'unknown' };
};

const inferNullFallback = (key: string): PrimitiveKind => {
  const normalized = key.toLowerCase();
  if (/(^|_)(date|time|timestamp|created_at|updated_at|deleted_at|last_login_at)$/.test(normalized)) {
    return 'string';
  }
  if (/(^|_)at$/.test(normalized)) {
    return 'string';
  }
  return 'unknown';
};

const finalizeUnion = (union: { kind: 'union'; types: TypeInfo[] }): TypeInfo => {
  const flattened = union.types.flatMap((type) => (type.kind === 'union' ? type.types : [type]));
  const normalized = flattened.map((type) => {
    if (type.kind === 'literal') {
      return { kind: 'primitive', name: type.name } as TypeInfo;
    }
    return finalizeType(type);
  });

  const unique: TypeInfo[] = [];
  normalized.forEach((type) => {
    if (!unique.some((item) => isSameType(item, type))) {
      unique.push(type);
    }
  });

  const primitives = unique.filter((type) => type.kind === 'primitive') as Array<
    Extract<TypeInfo, { kind: 'primitive' }>
  >;
  const literals = unique.filter((type) => type.kind === 'literal') as Array<
    Extract<TypeInfo, { kind: 'literal' }>
  >;

  literals.forEach((literal) => {
    if (primitives.some((prim) => prim.name === literal.name)) {
      const index = unique.findIndex((item) => isSameType(item, literal));
      if (index >= 0) unique.splice(index, 1);
    }
  });

  const objectTypes = unique.filter((type) => type.kind === 'object') as Array<
    Extract<TypeInfo, { kind: 'object' }>
  >;
  if (objectTypes.length === unique.length && objectTypes.length > 1) {
    return objectTypes.reduce((acc, item) => mergeObjects(acc, item));
  }

  if (unique.length === 1) return unique[0];
  return { kind: 'union', types: unique };
};

const finalizeType = (type: TypeInfo): TypeInfo => {
  switch (type.kind) {
    case 'primitive':
      return type;
    case 'literal':
      return { kind: 'primitive', name: type.name };
    case 'array':
      {
        let element = finalizeType(type.element);
        if (element.kind === 'primitive' && element.name === 'null') {
          element = finalizeUnion(
            {
              kind: 'union',
              types: [
                { kind: 'primitive', name: 'unknown' },
                { kind: 'primitive', name: 'null' },
              ],
            },
          );
        }
        return { kind: 'array', element };
      }
    case 'object': {
      const props = new Map<string, { type: TypeInfo; optional: boolean }>();
      type.props.forEach((meta, key) => {
        let finalized = finalizeType(meta.type);
        if (finalized.kind === 'primitive' && finalized.name === 'null') {
          const fallback = inferNullFallback(key);
          finalized = finalizeUnion(
            {
              kind: 'union',
              types: [
                { kind: 'primitive', name: fallback },
                { kind: 'primitive', name: 'null' },
              ],
            },
          );
        } else if (finalized.kind === 'union') {
          finalized = finalizeUnion(finalized);
        }
        props.set(key, { type: finalized, optional: meta.optional });
      });
      return { kind: 'object', props };
    }
    case 'union':
      return finalizeUnion(type);
  }
};

const signatureOf = (type: TypeInfo): string => {
  switch (type.kind) {
    case 'primitive':
      return `p:${type.name}`;
    case 'literal':
      return `l:${type.name}:${String(type.value)}`;
    case 'array':
      return `a:${signatureOf(type.element)}`;
    case 'object': {
      const entries = Array.from(type.props.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, meta]) => `${key}${meta.optional ? '?' : ''}:${signatureOf(meta.type)}`);
      return `o:{${entries.join(',')}}`;
    }
    case 'union': {
      const parts = type.types.map(signatureOf).sort();
      return `u:${parts.join('|')}`;
    }
  }
};

const typeToString = (type: TypeInfo, nameHint: string, ctx: Context): string => {
  const unionSortKey = (item: TypeInfo) => {
    if (item.kind === 'primitive') {
      if (item.name === 'null') return 'z_null';
      if (item.name === 'unknown') return 'y_unknown';
    }
    return `a_${signatureOf(item)}`;
  };

  switch (type.kind) {
    case 'primitive':
      return type.name;
    case 'literal':
      return typeof type.value === 'string' ? JSON.stringify(type.value) : String(type.value);
    case 'array': {
      const elementName = singularizeName(nameHint);
      const element = typeToString(type.element, elementName, ctx);
      const needsParens = type.element.kind === 'union';
      return `${needsParens ? `(${element})` : element}[]`;
    }
    case 'union': {
      const parts = type.types
        .slice()
        .sort((a, b) => unionSortKey(a).localeCompare(unionSortKey(b)))
        .map((item) => typeToString(item, nameHint, ctx));
      return parts.join(' | ');
    }
    case 'object': {
      const signature = signatureOf(type);
      const existing = ctx.signatureToName.get(signature);
      if (existing) return existing;

      const permissionKeys = ['create', 'read', 'update', 'delete'];
      const propKeys = Array.from(type.props.keys());
      const isPermissionShape = propKeys.length > 0 && propKeys.every((key) => permissionKeys.includes(key));
      let preferredName = nameHint;
      if (isPermissionShape) {
        preferredName =
          propKeys.length === 4 ? 'CrudPermissions' : `${sanitizeTypeName(nameHint)}Permissions`;
      }

      const interfaceName = getUniqueName(preferredName, ctx);
      ctx.signatureToName.set(signature, interfaceName);

      const lines: string[] = [];
      lines.push(`export interface ${interfaceName} {`);
      Array.from(type.props.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([key, meta]) => {
          const safeKey = isValidIdentifier(key) ? key : `"${key.replace(/"/g, '\\"')}"`;
          const propType = typeToString(meta.type, key, ctx);
          lines.push(`  ${safeKey}${meta.optional ? '?' : ''}: ${propType};`);
        });
      lines.push('}');

      const definition = lines.join('\n');
      if (!ctx.defined.has(interfaceName)) {
        ctx.defined.set(interfaceName, definition);
        ctx.defs.push(definition);
      }
      return interfaceName;
    }
  }
};

const generateTypes = (input: string, rootName: string): TypeResult => {
  if (!input.trim()) {
    return { type: '', defs: [] };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid JSON';
    return { type: `// ${message}`, defs: [] };
  }

  const ctx: Context = {
    defs: [],
    defined: new Map(),
    signatureToName: new Map(),
    usedNames: new Set(),
  };
  const rootTypeName = sanitizeTypeName(rootName || 'Root');
  const inferred = inferType(parsed, rootTypeName);
  const normalized = finalizeType(inferred);
  const rootType = typeToString(normalized, rootTypeName, ctx);

  if (rootType !== rootTypeName) {
    ctx.usedNames.add(rootTypeName);
    ctx.defs.push(`export type ${rootTypeName} = ${rootType};`);
  }

  return { type: rootType, defs: ctx.defs };
};

const highlightTs = (input: string) => {
  if (!input) return '';
  const keywordSet = new Set(['interface', 'type', 'export', 'extends']);
  const typeSet = new Set(['string', 'number', 'boolean', 'unknown', 'null']);
  const literalSet = new Set(['true', 'false', 'null', 'undefined']);
  const tokenRegex = /("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|\b(?:interface|type|export|extends|string|number|boolean|unknown|null|true|false|undefined)\b|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*(?=\??:))/g;

  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(input)) !== null) {
    const token = match[0];
    const start = match.index;
    result += escapeHtml(input.slice(lastIndex, start));

    if (token.startsWith('"') || token.startsWith("'")) {
      result += `<span class="text-emerald-600 dark:text-emerald-300">${escapeHtml(token)}</span>`;
    } else if (keywordSet.has(token)) {
      result += `<span class="text-sky-600 dark:text-sky-300 font-semibold">${escapeHtml(token)}</span>`;
    } else if (typeSet.has(token)) {
      result += `<span class="text-indigo-600 dark:text-indigo-300">${escapeHtml(token)}</span>`;
    } else if (literalSet.has(token)) {
      result += `<span class="text-violet-600 dark:text-violet-300">${escapeHtml(token)}</span>`;
    } else if (/^\d/.test(token)) {
      result += `<span class="text-amber-600 dark:text-amber-300">${escapeHtml(token)}</span>`;
    } else {
      result += `<span class="text-cyan-600 dark:text-cyan-300">${escapeHtml(token)}</span>`;
    }

    lastIndex = start + token.length;
  }

  result += escapeHtml(input.slice(lastIndex));
  return result;
};

export default function JsonToTsTool() {
  const [input, setInput] = useState('');
  const [rootName, setRootName] = useState('Root');

  const result = useMemo(() => generateTypes(input, rootName), [input, rootName]);
  const output = useMemo(() => result.defs.join('\n\n'), [result.defs]);
  const highlighted = useMemo(() => highlightTs(output), [output]);

  const handleCopy = useCallback(() => {
    if (!output.trim()) {
      toast.info('Nothing to copy yet.');
      return;
    }
    navigator.clipboard.writeText(output).then(
      () => toast.success('Copied TypeScript types.'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [output]);

  const handleClear = useCallback(() => {
    setInput('');
    toast.info('Cleared input.');
  }, []);

  const handleSample = useCallback(() => {
    setInput(SAMPLE_JSON);
    toast.info('Loaded sample JSON.');
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            Developer Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">JSON → TypeScript</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Convert JSON into clean TypeScript interfaces. Everything runs locally in your browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Client-side
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Instant
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Offline ready
          </Badge>
        </div>
      </div>

      <Card className="rounded-xl border border-slate-200/70 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/70">
        <CardContent className="space-y-6 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white/70 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
            <div className="space-y-2">
              <Label htmlFor="root-name" className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                Root Name
              </Label>
              <Input
                id="root-name"
                value={rootName}
                onChange={(event) => setRootName(event.target.value)}
                className="h-9 w-48 bg-white text-sm text-slate-700 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950 dark:text-slate-100"
                placeholder="Root"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleSample}>
                Sample
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={handleClear}>
                <RefreshCw size={14} />
                Clear
              </Button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="json-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                JSON Input
              </Label>
              <Textarea
                id="json-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Paste JSON here..."
                className="min-h-[220px] max-h-[360px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
                spellCheck={false}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                TypeScript Output
              </Label>
              <div className="min-h-[220px] max-h-[360px] overflow-auto rounded-lg border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                {output ? (
                  <pre className="whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: highlighted }} />
                ) : (
                  'TypeScript interfaces will appear here.'
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
              <Copy size={14} />
              Copy Types
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
