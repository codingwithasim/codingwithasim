'use client';

import { useCallback, useMemo, useState } from 'react';
import { Copy, FileDown, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  formatUuid,
  generateUniqueUuids,
  generateUuidV4,
  supportsCrypto,
  supportsRandomUUID,
  type UuidFormat,
} from '@/lib/uuid';

const MAX_QUANTITY = 1000;

const formatOptions: Array<{ value: UuidFormat; label: string }> = [
  { value: 'lowercase', label: 'Lowercase' },
  { value: 'uppercase', label: 'Uppercase' },
  { value: 'no-hyphens', label: 'No hyphens' },
];

const normalizeQuantity = (value: number) => {
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.min(Math.max(Math.floor(value), 0), MAX_QUANTITY);
};

export default function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [quantityInput, setQuantityInput] = useState('1');
  const [format, setFormat] = useState<UuidFormat>('lowercase');

  const cryptoAvailable = useMemo(() => supportsCrypto(), []);
  const randomUuidAvailable = useMemo(() => supportsRandomUUID(), []);

  const quantityValue = useMemo(() => Number.parseInt(quantityInput, 10), [quantityInput]);
  const formattedUuids = useMemo(() => uuids.map((uuid) => formatUuid(uuid, format)), [uuids, format]);

  const handleGenerate = useCallback(() => {
    const normalized = normalizeQuantity(quantityValue);
    const wasOverMax = quantityValue > MAX_QUANTITY;

    if (Number.isNaN(quantityValue)) {
      toast.error('Enter a valid quantity between 1 and 1000.');
      return;
    }

    if (normalized !== quantityValue) {
      setQuantityInput(String(normalized));
    }

    if (normalized <= 0) {
      setUuids([]);
      toast.error('Quantity must be between 1 and 1000.');
      return;
    }

    const batch = generateUniqueUuids(normalized, generateUuidV4);
    setUuids(batch);

    if (batch.length < normalized) {
      toast.warning(`Generated ${batch.length} UUIDs. Try again for the full set.`);
      return;
    }

    if (!cryptoAvailable) {
      toast.warning('Secure random is unavailable in this browser. UUIDs may be less unique.');
      return;
    }

    if (wasOverMax) {
      toast.info(`Maximum is ${MAX_QUANTITY}. Generated ${batch.length} UUIDs.`);
      return;
    }

    toast.success(`Generated ${batch.length} UUID${batch.length === 1 ? '' : 's'}.`);
  }, [cryptoAvailable, quantityValue]);

  const handleCopyAll = useCallback(async () => {
    if (formattedUuids.length === 0) {
      toast.info('Nothing to copy yet.');
      return;
    }

    try {
      await navigator.clipboard.writeText(formattedUuids.join('\n'));
      toast.success('Copied all UUIDs.');
    } catch {
      toast.error('Unable to copy. Please copy manually.');
    }
  }, [formattedUuids]);

  const handleCopySingle = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success('Copied UUID.');
    } catch {
      toast.error('Unable to copy. Please copy manually.');
    }
  }, []);

  const handleClear = useCallback(() => {
    setUuids([]);
    toast.info('Cleared UUIDs.');
  }, []);

  const handleDownload = useCallback(() => {
    if (formattedUuids.length === 0) {
      toast.info('Nothing to download yet.');
      return;
    }

    const blob = new Blob([formattedUuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'uuids.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast.success('Downloaded UUIDs.');
  }, [formattedUuids]);

  const handleQuantityBlur = useCallback(() => {
    if (quantityInput.trim() === '') {
      setQuantityInput('1');
      return;
    }

    const normalized = normalizeQuantity(quantityValue);
    if (Number.isNaN(quantityValue)) {
      setQuantityInput('1');
      return;
    }

    if (normalized !== quantityValue) {
      setQuantityInput(String(normalized));
    }
  }, [quantityInput, quantityValue]);

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">UUID Tool</div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">UUID Generator</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Generate UUID v4 identifiers instantly. Copy, download, and reuse them for APIs, databases, and tests.
          </p>
          <p className="text-xs text-slate-400">Client-side only • No tracking • {randomUuidAvailable ? 'Uses crypto.randomUUID()' : 'Crypto fallback'}</p>
        </div>
      </div>

      <Card className="rounded-xl border border-slate-200/70 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/70">
        <CardContent className="space-y-6 p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="uuid-quantity" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Quantity
                </Label>
                <Input
                  id="uuid-quantity"
                  type="number"
                  min={0}
                  max={MAX_QUANTITY}
                  value={quantityInput}
                  onChange={(event) => setQuantityInput(event.target.value)}
                  onBlur={handleQuantityBlur}
                  className="h-10 bg-white/70 text-sm text-slate-700 shadow-none dark:bg-slate-950/40 dark:text-slate-100"
                  aria-describedby="uuid-quantity-helper"
                />
                <p id="uuid-quantity-helper" className="text-xs text-slate-400">
                  Choose between 1 and {MAX_QUANTITY} per batch.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="uuid-format" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Format
                </Label>
                <select
                  id="uuid-format"
                  value={format}
                  onChange={(event) => setFormat(event.target.value as UuidFormat)}
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-600 shadow-none transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                >
                  {formatOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
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
                onClick={handleCopyAll}
                className="h-10 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                <Copy size={12} />
                Copy All
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
                <Trash2 size={12} />
                Clear
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:border-slate-800">
              <span>Generated UUIDs</span>
              <span>{formattedUuids.length} total</span>
            </div>
            <div
              className="min-h-[240px] max-h-[360px] overflow-auto"
              role="textbox"
              aria-readonly="true"
              aria-label="Generated UUIDs"
            >
              {formattedUuids.length === 0 ? (
                <div className="p-4 text-sm text-slate-400">No UUIDs generated yet.</div>
              ) : (
                <ul className="divide-y divide-slate-200 group text-sm text-slate-700 dark:divide-slate-800 dark:text-slate-200">
                  {formattedUuids.map((uuid, index) => (
                    <li key={`${uuid}-${index}`} className="flex cursor-pointer group-hover:not-hover:opacity-60 transition-opacity items-center justify-between gap-3 px-4 py-3">
                      <span className="font-mono text-[0.95rem] text-slate-800 dark:text-slate-100">{uuid}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopySingle(uuid)}
                        className="h-8 rounded-md border-slate-200 bg-white text-[0.65rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                        aria-label={`Copy UUID ${index + 1}`}
                      >
                        <Copy size={12} />
                        Copy
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {!cryptoAvailable ? (
            <p className="text-xs text-amber-600 dark:text-amber-300">
              Secure randomness is unavailable in this browser. Results may be less unique.
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
        <CardContent className="p-4 text-xs text-slate-500 dark:text-slate-400">
          UUIDs are generated locally in your browser. No data is sent to any server.
        </CardContent>
      </Card>
    </section>
  );
}
