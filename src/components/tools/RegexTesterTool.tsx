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

const DEFAULT_SAMPLE = {
  pattern: '\\b\\w{4}\\b',
  text: 'This text contains some four letter words.',
};

const DEFAULT_FLAGS = {
  g: true,
  i: false,
  m: false,
  s: false,
  u: false,
  y: false,
};

type FlagKey = keyof typeof DEFAULT_FLAGS;

type MatchInfo = {
  value: string;
  index: number;
  groups: string[];
};

const FLAG_OPTIONS: Array<{ key: FlagKey; label: string; description: string }> = [
  { key: 'g', label: 'g', description: 'Global' },
  { key: 'i', label: 'i', description: 'Case-insensitive' },
  { key: 'm', label: 'm', description: 'Multiline' },
  { key: 's', label: 's', description: 'Dot matches newline' },
  { key: 'u', label: 'u', description: 'Unicode' },
  { key: 'y', label: 'y', description: 'Sticky' },
];

const buildFlagString = (flags: typeof DEFAULT_FLAGS) =>
  FLAG_OPTIONS.filter((flag) => flags[flag.key]).map((flag) => flag.label).join('');

const collectMatches = (regex: RegExp, text: string): MatchInfo[] => {
  if (!text) {
    return [];
  }

  const results: MatchInfo[] = [];

  if (regex.global || regex.sticky) {
    regex.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const groups = match.slice(1).map((group) => group ?? '');
      results.push({ value: match[0], index: match.index, groups });

      if (match[0] === '') {
        regex.lastIndex += 1;
        if (regex.lastIndex > text.length) {
          break;
        }
      }
    }
  } else {
    const match = regex.exec(text);
    if (match) {
      const groups = match.slice(1).map((group) => group ?? '');
      results.push({ value: match[0], index: match.index, groups });
    }
  }

  return results;
};

const buildHighlightSegments = (text: string, matches: MatchInfo[]) => {
  if (!text) {
    return [] as Array<{ text: string; isMatch: boolean; key: string }>; 
  }

  if (matches.length === 0) {
    return [{ text, isMatch: false, key: 'text-0' }];
  }

  const segments: Array<{ text: string; isMatch: boolean; key: string }> = [];
  let cursor = 0;

  matches.forEach((match, index) => {
    const start = Math.max(match.index, 0);
    const end = start + match.value.length;

    if (start > cursor) {
      segments.push({ text: text.slice(cursor, start), isMatch: false, key: `text-${index}-${cursor}` });
    }

    if (match.value.length > 0) {
      segments.push({ text: match.value, isMatch: true, key: `match-${index}-${start}` });
    } else {
      segments.push({ text: '[empty]', isMatch: true, key: `match-${index}-${start}-empty` });
    }

    cursor = end;
  });

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), isMatch: false, key: `text-${cursor}` });
  }

  return segments;
};

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState(DEFAULT_FLAGS);
  const [testText, setTestText] = useState('');

  const flagString = useMemo(() => buildFlagString(flags), [flags]);

  const regexState = useMemo(() => {
    if (!pattern.trim()) {
      return { regex: null, error: null, matches: [] as MatchInfo[] };
    }

    try {
      const regex = new RegExp(pattern, flagString);
      const matches = collectMatches(regex, testText);
      return { regex, error: null, matches };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid regular expression.';
      return { regex: null, error: message, matches: [] as MatchInfo[] };
    }
  }, [pattern, flagString, testText]);

  const highlightSegments = useMemo(
    () => (regexState.error ? [{ text: testText, isMatch: false, key: 'text-error' }] : buildHighlightSegments(testText, regexState.matches)),
    [regexState.error, regexState.matches, testText]
  );

  const handleToggleFlag = useCallback((key: FlagKey) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleCopyRegex = useCallback(() => {
    if (!pattern.trim()) {
      toast.info('Nothing to copy yet.');
      return;
    }

    const literal = `/${pattern}/${flagString}`;
    navigator.clipboard.writeText(literal).then(
      () => toast.success('Copied regex.'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [flagString, pattern]);

  const handleCopyMatches = useCallback(() => {
    if (regexState.matches.length === 0) {
      toast.info('No matches to copy.');
      return;
    }

    const payload = regexState.matches.map((match) => match.value).join('\n');
    navigator.clipboard.writeText(payload).then(
      () => toast.success('Copied matches.'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [regexState.matches]);

  const handleCopyJson = useCallback(() => {
    const payload = {
      pattern,
      flags: flagString,
      matches: regexState.matches,
    };

    navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(
      () => toast.success('Copied result JSON.'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [flagString, pattern, regexState.matches]);

  const handleSample = useCallback(() => {
    setPattern(DEFAULT_SAMPLE.pattern);
    setTestText(DEFAULT_SAMPLE.text);
    setFlags(DEFAULT_FLAGS);
    toast.info('Loaded sample data.');
  }, []);

  const handleClear = useCallback(() => {
    setPattern('');
    setTestText('');
    setFlags(DEFAULT_FLAGS);
    toast.info('Cleared all fields.');
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            Regex Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Regex Tester</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Test regular expressions instantly and see matches update in real time. Everything runs locally in your browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Client-side
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Live preview
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No tracking
          </Badge>
        </div>
      </div>

      <Card className="rounded-xl border border-slate-200/70 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/70">
        <CardContent className="space-y-6 p-5">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="regex-pattern" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Pattern
                </Label>
                <Input
                  id="regex-pattern"
                  value={pattern}
                  onChange={(event) => setPattern(event.target.value)}
                  placeholder="Type a regex pattern (no slashes)"
                  className="h-10 bg-white/70 text-sm text-slate-700 shadow-none dark:bg-slate-950/40 dark:text-slate-100"
                />
                {regexState.error ? (
                  <p className="text-xs text-rose-500">{regexState.error}</p>
                ) : (
                  <p className="text-xs text-slate-400">Example: \\d+ or ^[a-z]+$</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Flags
                </Label>
                <div className="flex flex-wrap gap-2">
                  {FLAG_OPTIONS.map((flag) => {
                    const isActive = flags[flag.key];
                    return (
                      <button
                        key={flag.key}
                        type="button"
                        onClick={() => handleToggleFlag(flag.key)}
                        className={`rounded-md border px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                          isActive
                            ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white'
                        }`}
                        aria-pressed={isActive}
                        title={flag.description}
                      >
                        {flag.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopyRegex}
                  className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <Copy size={12} />
                  Copy Regex
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopyMatches}
                  className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <Copy size={12} />
                  Copy Matches
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopyJson}
                  className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <Copy size={12} />
                  Copy JSON
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSample}
                  className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  Sample Data
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <RefreshCw size={12} />
                  Clear
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white/70 p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Results</div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Total matches</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-100">{regexState.matches.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Flags</span>
                  <span className="font-mono text-slate-700 dark:text-slate-100">{flagString || 'none'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pattern</span>
                  <span className="font-mono text-slate-700 dark:text-slate-100">{pattern || '-'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="regex-text" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Test Text
              </Label>
              <Textarea
                id="regex-text"
                value={testText}
                onChange={(event) => setTestText(event.target.value)}
                placeholder="Paste or type text to test your regex..."
                className="min-h-[280px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
                spellCheck={false}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Highlighted Matches
              </Label>
              <div className="min-h-[280px] rounded-md border border-slate-200 bg-white/70 p-4 font-mono text-sm text-slate-800 shadow-none dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-100">
                {testText ? (
                  <pre className="whitespace-pre-wrap break-words">
                    {highlightSegments.map((segment) =>
                      segment.isMatch ? (
                        <mark
                          key={segment.key}
                          className="rounded bg-amber-200/80 px-0.5 text-slate-900 dark:bg-amber-400/40 dark:text-amber-100"
                        >
                          {segment.text}
                        </mark>
                      ) : (
                        <span key={segment.key}>{segment.text}</span>
                      )
                    )}
                  </pre>
                ) : (
                  <div className="text-slate-400">Matches will appear here.</div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Matches Detail</div>
            {regexState.matches.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">No matches found yet.</p>
            ) : (
              <ul className="mt-4 max-h-[320px] overflow-auto space-y-3 pr-1 text-sm text-slate-700 dark:text-slate-200">
                {regexState.matches.map((match, index) => (
                  <li key={`${match.index}-${index}`} className="rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-400">
                      <span>Match {index + 1}</span>
                      <span>Index {match.index}</span>
                    </div>
                    <div className="mt-2 font-mono text-sm text-slate-800 dark:text-slate-100">{match.value || '(empty)'}</div>
                    <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Groups: {match.groups.length ? match.groups.map((group, idx) => (
                        <span key={`${match.index}-${idx}`} className="mr-2 inline-flex rounded bg-slate-100 px-2 py-1 font-mono text-[0.65rem] text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                          {group || '(empty)'}
                        </span>
                      )) : 'None'}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">What is a regular expression?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A regular expression (regex) is a search pattern used to find and manipulate text. It lets you match characters,
              words, or formats quickly without writing complex parsing logic.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">How to use this regex tester</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enter a pattern, choose any flags, and paste your test text. Matches update instantly, with highlights and a
              detailed list of results below.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Common regex examples</h2>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><span className="font-mono">\\d+</span> - numbers</li>
              <li><span className="font-mono">\\b\\w{4}\\b</span> - four-letter words</li>
              <li><span className="font-mono">^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$</span> - email-like pattern</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Why test regex online</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Testing regex interactively helps you validate patterns, debug edge cases, and speed up development without writing
              extra scripts. This tool runs locally, so your data stays private.
            </p>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
