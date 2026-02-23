'use client';

import { useCallback, useMemo, useState } from 'react';
import { Copy, FileDown, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const WORD_POOL = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
  'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute',
  'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat',
  'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui',
  'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'integer', 'ornare', 'porta', 'massa', 'ultricies',
  'mattis', 'viverra', 'aliquet', 'placerat', 'turpis', 'morbi', 'nibh', 'pretium', 'nisl', 'sagittis', 'tellus',
  'volutpat', 'quisque', 'eros', 'elementum', 'pharetra', 'faucibus', 'pellentesque',
];

const START_WORDS = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];

const MIN_COUNT = 1;
const MAX_COUNT = 100;
const SENTENCE_MIN_WORDS = 6;
const SENTENCE_MAX_WORDS = 18;
const PARAGRAPH_MIN_SENTENCES = 4;
const PARAGRAPH_MAX_SENTENCES = 8;

type Mode = 'paragraphs' | 'sentences' | 'words';

const MODE_OPTIONS: Array<{ value: Mode; label: string }> = [
  { value: 'paragraphs', label: 'Paragraphs' },
  { value: 'sentences', label: 'Sentences' },
  { value: 'words', label: 'Words' },
];

const normalizeCount = (value: number) => {
  if (!Number.isFinite(value)) {
    return MIN_COUNT;
  }

  return Math.min(Math.max(Math.floor(value), MIN_COUNT), MAX_COUNT);
};

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const pickWord = () => WORD_POOL[randomInt(0, WORD_POOL.length - 1)];

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const buildSentence = (useLoremStart: boolean) => {
  const targetLength = randomInt(SENTENCE_MIN_WORDS, SENTENCE_MAX_WORDS);
  const words: string[] = [];

  if (useLoremStart) {
    words.push(...START_WORDS);
  }

  while (words.length < targetLength) {
    words.push(pickWord());
  }

  const trimmed = words.slice(0, targetLength);
  trimmed[0] = capitalize(trimmed[0]);
  return `${trimmed.join(' ')}.`;
};

const buildWordBlock = (count: number, useLoremStart: boolean) => {
  const words: string[] = [];

  if (useLoremStart) {
    words.push(...START_WORDS);
  }

  while (words.length < count) {
    words.push(pickWord());
  }

  const trimmed = words.slice(0, count);
  trimmed[0] = capitalize(trimmed[0]);
  return trimmed.join(' ');
};

export default function LoremIpsumTool() {
  const [mode, setMode] = useState<Mode>('paragraphs');
  const [countInput, setCountInput] = useState('3');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [outputText, setOutputText] = useState('');

  const countValue = useMemo(() => Number.parseInt(countInput, 10), [countInput]);

  const stats = useMemo(() => {
    const text = outputText.trim();
    const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;
    return {
      words: wordCount,
      characters: outputText.length,
    };
  }, [outputText]);

  const handleGenerate = useCallback(() => {
    if (Number.isNaN(countValue)) {
      toast.error('Enter a valid number between 1 and 100.');
      return;
    }

    const normalized = normalizeCount(countValue);
    if (normalized !== countValue) {
      setCountInput(String(normalized));
    }

    if (normalized <= 0) {
      toast.error('Count must be between 1 and 100.');
      return;
    }

    let result = '';

    if (mode === 'words') {
      result = buildWordBlock(normalized, startWithLorem);
    } else if (mode === 'sentences') {
      const sentences = Array.from({ length: normalized }, (_, index) => buildSentence(startWithLorem && index === 0));
      result = sentences.join(' ');
    } else {
      const paragraphs = Array.from({ length: normalized }, (_, index) => {
        const sentenceCount = randomInt(PARAGRAPH_MIN_SENTENCES, PARAGRAPH_MAX_SENTENCES);
        const sentences = Array.from({ length: sentenceCount }, (__, sentenceIndex) =>
          buildSentence(startWithLorem && index === 0 && sentenceIndex === 0)
        );
        return sentences.join(' ');
      });
      result = paragraphs.join('\n\n');
    }

    setOutputText(result);
    toast.success('Generated text.');
  }, [countValue, mode, startWithLorem]);

  const handleCopy = useCallback(() => {
    if (!outputText.trim()) {
      toast.info('Nothing to copy yet.');
      return;
    }

    navigator.clipboard.writeText(outputText).then(
      () => toast.success('Copied!'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [outputText]);

  const handleClear = useCallback(() => {
    setOutputText('');
    toast.info('Cleared output.');
  }, []);

  const handleDownload = useCallback(() => {
    if (!outputText.trim()) {
      toast.info('Nothing to download yet.');
      return;
    }

    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lorem-ipsum.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast.success('Downloaded text.');
  }, [outputText]);

  const handleBlurCount = useCallback(() => {
    if (countInput.trim() === '') {
      setCountInput(String(MIN_COUNT));
      return;
    }

    const normalized = normalizeCount(countValue);
    if (Number.isNaN(countValue)) {
      setCountInput(String(MIN_COUNT));
      return;
    }

    if (normalized !== countValue) {
      setCountInput(String(normalized));
    }
  }, [countInput, countValue]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            Text Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Lorem Ipsum Generator</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Generate clean placeholder text for layouts, prototypes, and content previews. Everything runs locally in your browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Client-side
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Editable output
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Offline ready
          </Badge>
        </div>
      </div>

      <Card className="rounded-xl border border-slate-200/70 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/70">
        <CardContent className="space-y-6 p-5">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Mode
                </Label>
                <div className="flex flex-wrap gap-2">
                  {MODE_OPTIONS.map((option) => {
                    const isActive = option.value === mode;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setMode(option.value)}
                        className={`rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                          isActive
                            ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white'
                        }`}
                        aria-pressed={isActive}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lorem-count" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                    Count
                  </Label>
                  <Input
                    id="lorem-count"
                    type="number"
                    min={MIN_COUNT}
                    max={MAX_COUNT}
                    value={countInput}
                    onChange={(event) => setCountInput(event.target.value)}
                    onBlur={handleBlurCount}
                    className="h-10 bg-white/70 text-sm text-slate-700 shadow-none dark:bg-slate-950/40 dark:text-slate-100"
                  />
                  <p className="text-xs text-slate-400">Min {MIN_COUNT}, max {MAX_COUNT}.</p>
                </div>

                <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
                  <input
                    id="lorem-start"
                    type="checkbox"
                    checked={startWithLorem}
                    onChange={(event) => setStartWithLorem(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-700"
                  />
                  <Label htmlFor="lorem-start" className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Start with Lorem ipsum
                  </Label>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={handleGenerate}
                  className="h-10 rounded-md bg-slate-900 text-xs font-semibold uppercase tracking-[0.25em] text-white hover:scale-100 active:scale-100 hover:bg-slate-800"
                >
                  <RefreshCw size={12} />
                  Generate
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopy}
                  className="h-10 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <Copy size={12} />
                  Copy to Clipboard
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDownload}
                  className="h-10 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <FileDown size={12} />
                  Download
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="h-10 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  Clear
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white/70 p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Summary</div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Mode</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-100">{mode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Count</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-100">{countValue || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Words</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-100">{stats.words}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Characters</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-100">{stats.characters}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lorem-output" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Output
            </Label>
            <Textarea
              id="lorem-output"
              value={outputText}
              onChange={(event) => setOutputText(event.target.value)}
              placeholder="Generated lorem ipsum will appear here..."
              className="min-h-[280px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
              spellCheck={false}
            />
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">What is Lorem Ipsum?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Lorem Ipsum is placeholder text used to demonstrate the visual form of a document or a design without relying on
              meaningful content.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Why designers use placeholder text</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Placeholder text keeps attention on layout, typography, and spacing while real content is still in progress.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">When to use Lorem Ipsum</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Use it for wireframes, mockups, prototypes, and early drafts when the final copy is not ready yet.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Alternatives to Lorem Ipsum</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Try real content snippets, product copy, or content generators that match your brand tone when accuracy matters.
            </p>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
