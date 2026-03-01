'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Copy, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

type Algorithm = 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512';

const ALGORITHMS: Array<{ value: Algorithm; label: string }> = [
  { value: 'md5', label: 'MD5' },
  { value: 'sha1', label: 'SHA-1' },
  { value: 'sha256', label: 'SHA-256' },
  { value: 'sha384', label: 'SHA-384' },
  { value: 'sha512', label: 'SHA-512' },
];

const MD5_SHIFTS = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
];

const MD5_K = [
  0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
  0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
  0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
  0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
  0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
  0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
  0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
  0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
];

const toHex = (value: number) => value.toString(16).padStart(2, '0');

const bufferToHex = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let output = '';
  bytes.forEach((byte) => {
    output += toHex(byte);
  });
  return output;
};

const md5 = (input: string) => {
  const data = new TextEncoder().encode(input);
  const bitLength = data.length * 8;
  const paddedLength = ((data.length + 9 + 63) >> 6) << 6;
  const padded = new Uint8Array(paddedLength);
  padded.set(data);
  padded[data.length] = 0x80;

  const view = new DataView(padded.buffer);
  view.setUint32(paddedLength - 8, bitLength >>> 0, true);
  view.setUint32(paddedLength - 4, Math.floor(bitLength / 2 ** 32), true);

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  const block = new Uint32Array(16);

  const add = (x: number, y: number) => (x + y) >>> 0;
  const rotl = (x: number, s: number) => (x << s) | (x >>> (32 - s));
  const f = (x: number, y: number, z: number) => (x & y) | (~x & z);
  const g = (x: number, y: number, z: number) => (x & z) | (y & ~z);
  const h = (x: number, y: number, z: number) => x ^ y ^ z;
  const i = (x: number, y: number, z: number) => y ^ (x | ~z);

  for (let offset = 0; offset < paddedLength; offset += 64) {
    for (let index = 0; index < 16; index += 1) {
      block[index] = view.getUint32(offset + index * 4, true);
    }

    let aa = a;
    let bb = b;
    let cc = c;
    let dd = d;

    for (let index = 0; index < 64; index += 1) {
      let func = 0;
      let blockIndex = 0;

      if (index < 16) {
        func = f(b, c, d);
        blockIndex = index;
      } else if (index < 32) {
        func = g(b, c, d);
        blockIndex = (5 * index + 1) % 16;
      } else if (index < 48) {
        func = h(b, c, d);
        blockIndex = (3 * index + 5) % 16;
      } else {
        func = i(b, c, d);
        blockIndex = (7 * index) % 16;
      }

      const temp = d;
      d = c;
      c = b;
      const sum = add(add(add(a, func), MD5_K[index]), block[blockIndex]);
      b = add(b, rotl(sum, MD5_SHIFTS[index]));
      a = temp;
    }

    a = add(a, aa);
    b = add(b, bb);
    c = add(c, cc);
    d = add(d, dd);
  }

  const toHexLE = (value: number) => {
    let output = '';
    for (let index = 0; index < 4; index += 1) {
      output += toHex((value >> (index * 8)) & 0xff);
    }
    return output;
  };

  return `${toHexLE(a)}${toHexLE(b)}${toHexLE(c)}${toHexLE(d)}`;
};

const hashWithSubtle = async (algorithm: Algorithm, input: string) => {
  if (!crypto?.subtle) {
    throw new Error('Web Crypto API not available.');
  }

  const algoName =
    algorithm === 'sha1'
      ? 'SHA-1'
      : algorithm === 'sha384'
        ? 'SHA-384'
        : algorithm === 'sha512'
          ? 'SHA-512'
          : 'SHA-256';
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest(algoName, data);
  return bufferToHex(digest);
};

export default function HashGeneratorTool() {
  const [algorithm, setAlgorithm] = useState<Algorithm>('sha256');
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!input) {
        setHash('');
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = algorithm === 'md5' ? md5(input) : await hashWithSubtle(algorithm, input);
        if (!cancelled) {
          setHash(result);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Unable to generate hash.';
          setError(message);
          setHash('');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [algorithm, input]);

  const inputLength = useMemo(() => new TextEncoder().encode(input).length, [input]);

  const handleCopy = useCallback(() => {
    if (!hash) {
      toast.info('Nothing to copy yet.');
      return;
    }

    navigator.clipboard.writeText(hash).then(
      () => toast.success('Copied hash.'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [hash]);

  const handleClear = useCallback(() => {
    setInput('');
    toast.info('Cleared input.');
  }, []);

  const handleSample = useCallback(() => {
    setInput('The quick brown fox jumps over the lazy dog');
    toast.info('Loaded sample text.');
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            Security Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Hash Generator</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly. Everything runs locally in your browser.
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
            <div className="space-y-2 overflow-hidden">
              <Label className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                Algorithm
              </Label>
              <Tabs value={algorithm} onValueChange={(value) => setAlgorithm(value as Algorithm)} className="w-full overflow-x-auto">
                <TabsList >
                  {ALGORITHMS.map((item) => (
                    <TabsTrigger key={item.value} value={item.value} className="flex-1">
                      {item.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
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

          <div className="space-y-2">
            <Label htmlFor="hash-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Input Text
            </Label>
            <Textarea
              id="hash-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type or paste text to hash..."
              className="min-h-[160px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
              spellCheck={false}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500">
              <span>{inputLength} bytes</span>
              <span className="uppercase tracking-[0.25em]">{ALGORITHMS.find((item) => item.value === algorithm)?.label}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Hash Output
            </Label>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
              {isLoading ? 'Generating hash...' : hash || 'Hash will appear here.'}
            </div>
            {error ? <p className="text-xs text-rose-500">{error}</p> : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
              <Copy size={14} />
              Copy Hash
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
