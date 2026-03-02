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

type DiffOp = { type: 'equal' | 'add' | 'del'; value: string };
type DiffEntry =
  | { type: 'equal'; a: string }
  | { type: 'add'; b: string }
  | { type: 'del'; a: string }
  | { type: 'modify'; a: string; b: string };

type ViewMode = 'inline' | 'split';

const SAMPLE_TEXT_A = `Hello team,
We shipped version 2.1 today.
Please review the release notes.`;

const SAMPLE_TEXT_B = `Hello team,
We shipped version 2.2 today.
Please review the updated release notes.`;

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Myers diff for sequences (efficient for large inputs).
const diffSequence = (a: string[], b: string[]): DiffOp[] => {
  const n = a.length;
  const m = b.length;
  const max = n + m;
  const offset = max;
  const v = new Array(2 * max + 1).fill(0);
  const trace: number[][] = [];

  for (let d = 0; d <= max; d += 1) {
    const snapshot = v.slice();
    for (let k = -d; k <= d; k += 2) {
      const kIndex = k + offset;
      let x;
      if (k === -d || (k !== d && v[kIndex - 1] < v[kIndex + 1])) {
        x = v[kIndex + 1];
      } else {
        x = v[kIndex - 1] + 1;
      }
      let y = x - k;
      while (x < n && y < m && a[x] === b[y]) {
        x += 1;
        y += 1;
      }
      v[kIndex] = x;
      if (x >= n && y >= m) {
        trace.push(v.slice());
        return backtrack(a, b, trace, offset);
      }
    }
    trace.push(snapshot);
  }

  return [];
};

// Reconstruct diff operations from the trace.
const backtrack = (a: string[], b: string[], trace: number[][], offset: number): DiffOp[] => {
  const ops: DiffOp[] = [];
  let x = a.length;
  let y = b.length;

  for (let d = trace.length - 1; d >= 0; d -= 1) {
    const v = trace[d];
    const k = x - y;
    const kIndex = k + offset;
    let prevK;
    if (k === -d || (k !== d && v[kIndex - 1] < v[kIndex + 1])) {
      prevK = k + 1;
    } else {
      prevK = k - 1;
    }
    const prevX = v[prevK + offset];
    const prevY = prevX - prevK;

    while (x > prevX && y > prevY) {
      ops.push({ type: 'equal', value: a[x - 1] });
      x -= 1;
      y -= 1;
    }

    if (d === 0) break;
    if (x === prevX) {
      ops.push({ type: 'add', value: b[prevY] });
    } else {
      ops.push({ type: 'del', value: a[prevX] });
    }
    x = prevX;
    y = prevY;
  }

  return ops.reverse();
};

// Merge adjacent deletions/additions into "modify" entries.
const mergeOps = (ops: DiffOp[]): DiffEntry[] => {
  const merged: DiffEntry[] = [];
  let i = 0;
  while (i < ops.length) {
    const current = ops[i];
    if (current.type === 'del') {
      const delBlock: DiffOp[] = [];
      const addBlock: DiffOp[] = [];
      while (i < ops.length && ops[i].type === 'del') {
        delBlock.push(ops[i]);
        i += 1;
      }
      let j = i;
      while (j < ops.length && ops[j].type === 'add') {
        addBlock.push(ops[j]);
        j += 1;
      }
      const pairCount = Math.max(delBlock.length, addBlock.length);
      for (let index = 0; index < pairCount; index += 1) {
        const delItem = delBlock[index];
        const addItem = addBlock[index];
        if (delItem && addItem) {
          merged.push({ type: 'modify', a: delItem.value, b: addItem.value });
        } else if (delItem) {
          merged.push({ type: 'del', a: delItem.value });
        } else if (addItem) {
          merged.push({ type: 'add', b: addItem.value });
        }
      }
      i = j;
      continue;
    }

    if (current.type === 'add') {
      merged.push({ type: 'add', b: current.value });
      i += 1;
      continue;
    }

    merged.push({ type: 'equal', a: current.value });
    i += 1;
  }
  return merged;
};

// Compute word-level diff for modified lines.
const diffWords = (a: string, b: string) => {
  const tokensA = a.split(/(\s+)/);
  const tokensB = b.split(/(\s+)/);
  return diffSequence(tokensA, tokensB);
};

// Build a unified text output for copy.
const buildCopyText = (entries: DiffEntry[]) =>
  entries
    .map((entry) => {
      switch (entry.type) {
        case 'equal':
          return `  ${entry.a}`;
        case 'add':
          return `+ ${entry.b}`;
        case 'del':
          return `- ${entry.a}`;
        case 'modify':
          return `- ${entry.a}\n+ ${entry.b}`;
        default:
          return '';
      }
    })
    .join('\n');

export default function DiffCheckerTool() {
  // Text inputs
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  // View toggle
  const [view, setView] = useState<ViewMode>('inline');
  // Diff result (computed live)
  const diffEntries = useMemo(() => {
    if (!textA && !textB) return [] as DiffEntry[];
    const linesA = textA.replace(/\r\n/g, '\n').split('\n');
    const linesB = textB.replace(/\r\n/g, '\n').split('\n');
    const ops = diffSequence(linesA, linesB);
    return mergeOps(ops);
  }, [textA, textB]);

  const copyText = useMemo(() => buildCopyText(diffEntries), [diffEntries]);

  const handleCopy = useCallback(() => {
    if (!copyText.trim()) {
      toast.info('Nothing to copy yet.');
      return;
    }
    navigator.clipboard.writeText(copyText).then(
      () => toast.success('Copied comparison.'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [copyText]);

  const handleReset = useCallback(() => {
    setTextA('');
    setTextB('');
    toast.info('Cleared inputs.');
  }, []);

  const handleSample = useCallback(() => {
    setTextA(SAMPLE_TEXT_A);
    setTextB(SAMPLE_TEXT_B);
    toast.info('Loaded sample text.');
  }, []);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            Developer Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Diff Checker (Text Compare)</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Compare two texts line-by-line and word-by-word with clean, readable highlights.
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
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white/70 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
            <div className="space-y-2">
              <Label className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                View
              </Label>
              <Tabs value={view} onValueChange={(value) => setView(value as ViewMode)} className="w-full">
                <TabsList className="flex w-full flex-wrap gap-2">
                  <TabsTrigger value="inline" className="flex-1 min-w-[96px]">
                    Inline
                  </TabsTrigger>
                  <TabsTrigger value="split" className="flex-1 min-w-[96px]">
                    Side-by-Side
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleSample}>
                Sample
              </Button>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="text-a" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Text A
              </Label>
              <Textarea
                id="text-a"
                value={textA}
                onChange={(event) => setTextA(event.target.value)}
                placeholder="Paste the first text..."
                className="min-h-[220px] max-h-[360px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
                spellCheck={false}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text-b" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Text B
              </Label>
              <Textarea
                id="text-b"
                value={textB}
                onChange={(event) => setTextB(event.target.value)}
                placeholder="Paste the second text..."
                className="min-h-[220px] max-h-[360px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Diff output */}
          <div className="rounded-lg border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Differences</p>
            <div className="mt-3 max-h-[420px] overflow-auto rounded-md border border-slate-200 bg-white p-3 font-mono text-sm text-slate-700 shadow-inner dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              {diffEntries.length === 0 ? (
                <p className="text-slate-400">Run a comparison to see differences.</p>
              ) : view === 'inline' ? (
                <div className="space-y-1 animate-in fade-in-50">
                  {diffEntries.map((entry, index) => {
                    if (entry.type === 'equal') {
                      return <div key={`eq-${index}`}>{entry.a}</div>;
                    }
                    if (entry.type === 'add') {
                      return (
                        <div
                          key={`add-${index}`}
                          className="rounded bg-emerald-100/70 px-2 py-1 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200"
                        >
                          + {entry.b}
                        </div>
                      );
                    }
                    if (entry.type === 'del') {
                      return (
                        <div
                          key={`del-${index}`}
                          className="rounded bg-rose-100/70 px-2 py-1 text-rose-900 line-through dark:bg-rose-500/20 dark:text-rose-200"
                        >
                          - {entry.a}
                        </div>
                      );
                    }

                    const wordOps = diffWords(entry.a, entry.b);
                    return (
                      <div key={`mod-${index}`} className="rounded bg-amber-50 px-2 py-1 dark:bg-amber-500/10">
                        {wordOps.map((word, idx) => {
                          if (word.type === 'equal') {
                            return <span key={`${index}-eq-${idx}`}>{word.value}</span>;
                          }
                          if (word.type === 'add') {
                            return (
                              <span
                                key={`${index}-add-${idx}`}
                                className="rounded bg-emerald-100 px-1 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200"
                              >
                                {word.value}
                              </span>
                            );
                          }
                          return (
                            <span
                              key={`${index}-del-${idx}`}
                              className="rounded bg-rose-100 px-1 text-rose-900 line-through dark:bg-rose-500/20 dark:text-rose-200"
                            >
                              {word.value}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid gap-3 md:grid-cols-2 animate-in fade-in-50">
                  {diffEntries.map((entry, index) => (
                    <div key={`row-${index}`} className="grid grid-cols-2 gap-2">
                      <div
                        className={`rounded px-2 py-1 ${
                          entry.type === 'del' || entry.type === 'modify'
                            ? 'bg-rose-100/70 text-rose-900 dark:bg-rose-500/20 dark:text-rose-200'
                            : 'bg-transparent'
                        }`}
                      >
                        {entry.type === 'add' ? '' : entry.type === 'equal' ? entry.a : entry.a}
                      </div>
                      <div
                        className={`rounded px-2 py-1 ${
                          entry.type === 'add' || entry.type === 'modify'
                            ? 'bg-emerald-100/70 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200'
                            : 'bg-transparent'
                        }`}
                      >
                        {entry.type === 'del' ? '' : entry.type === 'equal' ? entry.a : entry.b}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex flex-wrap justify-between gap-2">
            <Button type="button" variant="outline" onClick={handleCopy} className="text-xs font-semibold uppercase tracking-[0.2em]">
              <Copy size={14} />
              Copy Result
            </Button>
            <Button type="button" variant="outline" onClick={handleReset} className="text-xs font-semibold uppercase tracking-[0.2em]">
              <RefreshCw size={14} />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
