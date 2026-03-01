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
import { HiSwitchHorizontal } from 'react-icons/hi';

type Mode = 'encode' | 'decode';

const SAMPLE_TEXT = 'https://example.com/search?q=hello world&ref=dev tools';

export default function UrlEncoderTool() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [decodePlusAsSpace, setDecodePlusAsSpace] = useState(true);

  const { output, error } = useMemo(() => {
    if (!input.trim()) {
      return { output: '', error: null as string | null };
    }

    if (mode === 'encode') {
      return { output: encodeURIComponent(input), error: null };
    }

    try {
      const source = decodePlusAsSpace ? input.replace(/\+/g, ' ') : input;
      return { output: decodeURIComponent(source), error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid URL-encoded string.';
      return { output: '', error: message };
    }
  }, [decodePlusAsSpace, input, mode]);

  const handleCopy = useCallback(() => {
    if (!output) {
      toast.info('Nothing to copy yet.');
      return;
    }

    navigator.clipboard.writeText(output).then(
      () => toast.success('Copied output.'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [output]);

  const handleClear = useCallback(() => {
    setInput('');
    toast.info('Cleared input.');
  }, []);

  const handleSample = useCallback(() => {
    setInput(SAMPLE_TEXT);
    toast.info('Loaded sample text.');
  }, []);

  const handleSwap = useCallback(() => {
    if (!output) {
      toast.info('Nothing to swap yet.');
      return;
    }
    setInput(output);
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
  }, [output]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            Converter Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">URL Encoder / Decoder</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Encode or decode URL components instantly. Everything runs locally in your browser.
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
                Mode
              </Label>
              <Tabs value={mode} onValueChange={(value) => setMode(value as Mode)} className="w-full">
                <TabsList className="flex w-full flex-wrap gap-2">
                  <TabsTrigger value="encode" className="flex-1 min-w-[110px]">
                    Encode
                  </TabsTrigger>
                  <TabsTrigger value="decode" className="flex-1 min-w-[110px]">
                    Decode
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleSample}>
                Sample
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={handleSwap}>
                <HiSwitchHorizontal size={14} />
                Swap
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={handleClear}>
                <RefreshCw size={14} />
                Clear
              </Button>
            </div>
          </div>

          {mode === 'decode' ? (
            <label className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <input
                type="checkbox"
                checked={decodePlusAsSpace}
                onChange={(event) => setDecodePlusAsSpace(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-slate-900 dark:border-slate-700"
              />
              Treat + as space when decoding
            </label>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="url-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Input
              </Label>
              <Textarea
                id="url-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={mode === 'encode' ? 'Paste text to encode...' : 'Paste encoded string to decode...'}
                className="min-h-[180px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
                spellCheck={false}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Output
              </Label>
              <div className="min-h-[180px] rounded-lg border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
                {output || 'Output will appear here.'}
              </div>
              {error ? <p className="text-xs text-rose-500">{error}</p> : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
              <Copy size={14} />
              Copy Output
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
