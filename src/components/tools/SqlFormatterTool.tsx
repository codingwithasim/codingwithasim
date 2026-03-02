'use client';

import { useCallback, useMemo, useState } from 'react';
import { Copy, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

type CaseMode = 'upper' | 'lower' | 'preserve';
type LayoutMode = 'expanded' | 'compact';

const SAMPLE_SQL = `select u.id, u.name, u.email, o.total, o.created_at
from users u
left join orders o on o.user_id = u.id
where u.active = 1 and o.status in ('paid', 'fulfilled')
order by o.created_at desc
limit 50;`;

const KEYWORDS = [
  'select',
  'from',
  'where',
  'group by',
  'order by',
  'having',
  'limit',
  'offset',
  'insert',
  'into',
  'values',
  'update',
  'set',
  'delete',
  'join',
  'left join',
  'right join',
  'inner join',
  'outer join',
  'full join',
  'cross join',
  'on',
  'and',
  'or',
  'union',
  'distinct',
  'case',
  'when',
  'then',
  'else',
  'end',
  'as',
  'in',
  'is',
  'null',
  'like',
  'between',
  'exists',
  'asc',
  'desc',
];

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const applyCase = (value: string, mode: CaseMode) => {
  if (mode === 'upper') return value.toUpperCase();
  if (mode === 'lower') return value.toLowerCase();
  return value;
};

type Segment = { text: string; quoted: boolean };

const splitSegments = (input: string): Segment[] => {
  const segments: Segment[] = [];
  let current = '';
  let quote: string | null = null;

  const flush = (quoted: boolean) => {
    if (!current) return;
    segments.push({ text: current, quoted });
    current = '';
  };

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if (quote) {
      current += char;
      if (char === quote) {
        if ((quote === "'" || quote === '"') && input[index + 1] === quote) {
          current += input[index + 1];
          index += 1;
          continue;
        }
        flush(true);
        quote = null;
      }
      continue;
    }

    if (char === "'" || char === '"' || char === '`') {
      flush(false);
      quote = char;
      current = char;
      continue;
    }

    if (char === '[') {
      flush(false);
      quote = ']';
      current = char;
      continue;
    }

    current += char;
  }

  flush(Boolean(quote));
  return segments;
};

const replaceOutsideQuotes = (
  input: string,
  regex: RegExp,
  replacement: string | ((substring: string, ...args: string[]) => string)
) => {
  const segments = splitSegments(input);
  return segments
    .map((segment) => (segment.quoted ? segment.text : segment.text.replace(regex, replacement as any)))
    .join('');
};

const applyKeywordCase = (input: string, caseMode: CaseMode) => {
  if (caseMode === 'preserve') return input;
  const ordered = [...KEYWORDS].sort((a, b) => b.length - a.length);
  const pattern = ordered.map((word) => word.replace(/\s+/g, '\\s+')).join('|');
  const keywordRegex = new RegExp(`\\b(${pattern})\\b`, 'gi');
  return replaceOutsideQuotes(input, keywordRegex, (match: string) => applyCase(match, caseMode));
};

const formatSql = (input: string, caseMode: CaseMode, indentSize: number, layoutMode: LayoutMode) => {
  if (!input.trim()) return '';

  const normalized = input.replace(/\s+/g, ' ').trim();
  let working = normalized;

  if (layoutMode === 'compact') {
    return applyKeywordCase(working, caseMode);
  }

  const multiWord = [
    'left join',
    'right join',
    'inner join',
    'full join',
    'cross join',
    'group by',
    'order by',
  ];

  multiWord.forEach((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    working = replaceOutsideQuotes(working, regex, `\n${phrase}`);
  });

  const breakWords = [
    'select',
    'from',
    'where',
    'having',
    'limit',
    'offset',
    'insert',
    'update',
    'delete',
    'values',
    'set',
    'join',
    'on',
    'union',
  ];

  breakWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    working = replaceOutsideQuotes(working, regex, `\n${word}`);
  });

  working = replaceOutsideQuotes(working, /,\s*/g, ',\n');

  const indent = ' '.repeat(indentSize);
  const lines = working
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const formatted = lines.map((line) => {
    if (/^(and|or|on)\b/i.test(line)) {
      return `${indent}${line}`;
    }
    return line;
  });

  return applyKeywordCase(formatted.join('\n'), caseMode);
};

const highlightSql = (input: string) => {
  if (!input) return '';
  const ordered = [...KEYWORDS].sort((a, b) => b.length - a.length);
  const pattern = ordered.map((word) => word.replace(/\s+/g, '\\s+')).join('|');
  const keywordRegex = new RegExp(`\\b(${pattern})\\b`, 'gi');
  const segments = splitSegments(input);
  return segments
    .map((segment) => {
      const escaped = escapeHtml(segment.text);
      if (segment.quoted) return escaped;
      return escaped.replace(
        keywordRegex,
        (match) => `<span class="text-sky-600 dark:text-sky-300 font-semibold">${match}</span>`
      );
    })
    .join('');
};

export default function SqlFormatterTool() {
  const [input, setInput] = useState('');
  const [caseMode, setCaseMode] = useState<CaseMode>('upper');
  const [indentSize, setIndentSize] = useState(2);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('expanded');

  const formatted = useMemo(
    () => formatSql(input, caseMode, indentSize, layoutMode),
    [input, caseMode, indentSize, layoutMode]
  );
  const highlighted = useMemo(() => highlightSql(formatted), [formatted]);

  const handleCopy = useCallback(() => {
    if (!formatted) {
      toast.info('Nothing to copy yet.');
      return;
    }
    navigator.clipboard.writeText(formatted).then(
      () => toast.success('Copied formatted SQL.'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [formatted]);

  const handleClear = useCallback(() => {
    setInput('');
    toast.info('Cleared input.');
  }, []);

  const handleSample = useCallback(() => {
    setInput(SAMPLE_SQL);
    toast.info('Loaded sample query.');
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            Developer Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">SQL Formatter</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Format SQL queries with readable structure and keyword highlighting. Everything runs locally in your browser.
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
              <Label className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                Keyword Case
              </Label>
              <Tabs value={caseMode} onValueChange={(value) => setCaseMode(value as CaseMode)} className="w-full">
                <TabsList className="flex w-full flex-wrap gap-2">
                  <TabsTrigger value="upper" className="flex-1 min-w-[96px]">
                    UPPER
                  </TabsTrigger>
                  <TabsTrigger value="lower" className="flex-1 min-w-[96px]">
                    lower
                  </TabsTrigger>
                  <TabsTrigger value="preserve" className="flex-1 min-w-[96px]">
                    Preserve
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-2">
              <Label className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                Layout
              </Label>
              <Tabs value={layoutMode} onValueChange={(value) => setLayoutMode(value as LayoutMode)} className="w-full">
                <TabsList className="flex w-full flex-wrap gap-2">
                  <TabsTrigger value="expanded" className="flex-1 min-w-[96px]">
                    Expanded
                  </TabsTrigger>
                  <TabsTrigger value="compact" className="flex-1 min-w-[96px]">
                    Compact
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Label className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Indent
                </Label>
                <input
                  type="number"
                  min={2}
                  max={8}
                  value={indentSize}
                  onChange={(event) => setIndentSize(Math.min(8, Math.max(2, Number(event.target.value))))}
                  className="h-9 w-16 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-600 shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                />
              </div>
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
              <Label htmlFor="sql-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Input SQL
              </Label>
              <Textarea
                id="sql-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Paste your SQL query here..."
                className="min-h-[220px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
                spellCheck={false}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Formatted Output
              </Label>
              <div className="min-h-[220px] rounded-lg border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                {formatted ? (
                  <pre className="whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: highlighted }} />
                ) : (
                  'Formatted SQL will appear here.'
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
              <Copy size={14} />
              Copy SQL
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
