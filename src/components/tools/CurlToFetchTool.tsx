'use client';

import { useCallback, useMemo, useState } from 'react';
import { Copy, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type ParsedCurl = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
  redirect: 'follow' | 'manual';
  warnings: string[];
};

const SAMPLE_CURL = `curl -X POST "https://api.example.com/v1/users" \\
  -H "Authorization: Bearer token123" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Bilal","role":"admin"}'`;

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const highlightJs = (input: string) => {
  if (!input) return '';
  const keywordSet = new Set(['const', 'let', 'await', 'return']);
  const apiSet = new Set(['fetch', 'response', 'data']);
  const optionSet = new Set(['headers', 'method', 'body', 'redirect']);
  const literalSet = new Set(['true', 'false', 'null', 'undefined']);
  const tokenRegex = /("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`|\b(?:const|let|await|return|fetch|headers|method|body|redirect|response|data)\b|\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b)/g;

  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(input)) !== null) {
    const token = match[0];
    const start = match.index;
    result += escapeHtml(input.slice(lastIndex, start));

    if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) {
      result += `<span class="text-emerald-600 dark:text-emerald-300">${escapeHtml(token)}</span>`;
    } else if (keywordSet.has(token)) {
      result += `<span class="text-sky-600 dark:text-sky-300 font-semibold">${escapeHtml(token)}</span>`;
    } else if (apiSet.has(token)) {
      result += `<span class="text-cyan-600 dark:text-cyan-300 font-semibold">${escapeHtml(token)}</span>`;
    } else if (optionSet.has(token)) {
      result += `<span class="text-indigo-600 dark:text-indigo-300">${escapeHtml(token)}</span>`;
    } else if (literalSet.has(token)) {
      result += `<span class="text-violet-600 dark:text-violet-300">${escapeHtml(token)}</span>`;
    } else {
      result += `<span class="text-amber-600 dark:text-amber-300">${escapeHtml(token)}</span>`;
    }

    lastIndex = start + token.length;
  }

  result += escapeHtml(input.slice(lastIndex));
  return result;
};

const tokenize = (input: string) => {
  const tokens: string[] = [];
  let current = '';
  let quote: string | null = null;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if (quote) {
      if (char === quote) {
        quote = null;
        continue;
      }
      if (char === '\\' && quote === '"' && index + 1 < input.length) {
        current += input[index + 1];
        index += 1;
        continue;
      }
      current += char;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (/\s/.test(char)) {
      if (current) {
        tokens.push(current);
        current = '';
      }
      continue;
    }

    if (char === '\\' && index + 1 < input.length && /\s/.test(input[index + 1])) {
      index += 1;
      continue;
    }

    current += char;
  }

  if (current) tokens.push(current);
  return tokens;
};

const appendBody = (existing: string | null, next: string) => {
  if (!existing) return next;
  if (existing.includes('=') || next.includes('=')) {
    return `${existing}&${next}`;
  }
  return `${existing}\n${next}`;
};

const parseCurl = (input: string): ParsedCurl => {
  const warnings: string[] = [];
  const tokens = tokenize(input);
  const headers: Record<string, string> = {};
  let url = '';
  let method = '';
  let body: string | null = null;
  let redirect: 'follow' | 'manual' = 'manual';
  let forceGet = false;

  const getNext = (index: number) => tokens[index + 1] ?? '';

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];

    if (token === 'curl') continue;

    if (token === '-X' || token === '--request') {
      method = getNext(i).toUpperCase();
      i += 1;
      continue;
    }

    if (token === '-H' || token === '--header') {
      const headerLine = getNext(i);
      const [key, ...rest] = headerLine.split(':');
      if (key && rest.length) {
        headers[key.trim()] = rest.join(':').trim();
      }
      i += 1;
      continue;
    }

    if (token === '-d' || token === '--data' || token === '--data-raw' || token === '--data-binary' || token === '--data-ascii') {
      body = appendBody(body, getNext(i));
      i += 1;
      continue;
    }

    if (token === '--data-urlencode') {
      warnings.push('`--data-urlencode` needs manual encoding.');
      body = appendBody(body, getNext(i));
      i += 1;
      continue;
    }

    if (token === '-G' || token === '--get') {
      forceGet = true;
      continue;
    }

    if (token === '-I' || token === '--head') {
      method = 'HEAD';
      continue;
    }

    if (token === '-L' || token === '--location') {
      redirect = 'follow';
      continue;
    }

    if (token === '-A' || token === '--user-agent') {
      headers['User-Agent'] = getNext(i);
      i += 1;
      continue;
    }

    if (token === '-e' || token === '--referer') {
      headers['Referer'] = getNext(i);
      i += 1;
      continue;
    }

    if (token === '-b' || token === '--cookie') {
      headers['Cookie'] = getNext(i);
      i += 1;
      continue;
    }

    if (token === '-u' || token === '--user') {
      warnings.push('Basic auth (`-u`) needs manual handling.');
      i += 1;
      continue;
    }

    if (token === '-F' || token === '--form') {
      warnings.push('Form data (`-F`) is not auto-converted. Use FormData manually.');
      i += 1;
      continue;
    }

    if (token === '--compressed') {
      continue;
    }

    if (token === '-k' || token === '--insecure') {
      warnings.push('TLS verification disabled in curl (`-k`). Fetch does not support this in browsers.');
      continue;
    }

    if (token === '--url') {
      url = getNext(i);
      i += 1;
      continue;
    }

    if (token.startsWith('http://') || token.startsWith('https://')) {
      url = token;
      continue;
    }
  }

  if (forceGet && body) {
    if (url) {
      const separator = url.includes('?') ? '&' : '?';
      url = `${url}${separator}${body}`;
    }
    body = null;
    if (!method) method = 'GET';
  }

  if (!method) {
    method = body ? 'POST' : 'GET';
  }

  if (body && !headers['Content-Type']) {
    const trimmed = body.trim();
    headers['Content-Type'] = trimmed.startsWith('{') || trimmed.startsWith('[') ? 'application/json' : 'application/x-www-form-urlencoded';
  }

  return {
    url,
    method,
    headers,
    body,
    redirect,
    warnings,
  };
};

const formatFetch = (parsed: ParsedCurl) => {
  if (!parsed.url) return '';

  const lines: string[] = [];
  lines.push(`const response = await fetch("${parsed.url}", {`);
  lines.push(`  method: "${parsed.method}",`);

  if (Object.keys(parsed.headers).length) {
    lines.push('  headers: {');
    Object.entries(parsed.headers).forEach(([key, value]) => {
      lines.push(`    "${key}": "${value.replace(/"/g, '\\"')}",`);
    });
    lines.push('  },');
  }

  if (parsed.body) {
    lines.push(`  body: ${JSON.stringify(parsed.body)},`);
  }

  if (parsed.redirect === 'follow') {
    lines.push('  redirect: "follow",');
  }

  lines.push('});');
  lines.push('');
  lines.push('const data = await response.text();');

  return lines.join('\n');
};

export default function CurlToFetchTool() {
  const [input, setInput] = useState('');

  const parsed = useMemo(() => parseCurl(input), [input]);
  const output = useMemo(() => formatFetch(parsed), [parsed]);
  const highlightedJs = useMemo(() => highlightJs(output), [output]);

  const handleCopy = useCallback(() => {
    if (!output) {
      toast.info('Nothing to copy yet.');
      return;
    }
    navigator.clipboard.writeText(output).then(
      () => toast.success('Copied fetch snippet.'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [output]);

  const handleClear = useCallback(() => {
    setInput('');
    toast.info('Cleared input.');
  }, []);

  const handleSample = useCallback(() => {
    setInput(SAMPLE_CURL);
    toast.info('Loaded sample curl.');
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            Developer Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Curl → Fetch Converter</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Paste curl → get JS fetch code. Everything runs locally in your browser.
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
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white/70 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
            <div className="space-y-1">
              <Label className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                Quick Actions
              </Label>
              <p className="text-xs text-slate-400">Paste a curl command and get a fetch snippet.</p>
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
              <Label htmlFor="curl-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Curl Command
              </Label>
              <Textarea
                id="curl-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Paste curl command here..."
                className="min-h-[220px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
                spellCheck={false}
              />
              {parsed.warnings.length ? (
                <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                  {parsed.warnings.map((warning) => (
                    <div key={warning}>{warning}</div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Fetch Output
              </Label>
              <div className="min-h-[220px] rounded-lg border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                {output ? (
                  <pre className="whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: highlightedJs }} />
                ) : (
                  'Fetch snippet will appear here.'
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
              <Copy size={14} />
              Copy Fetch
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
