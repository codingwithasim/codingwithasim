'use client';

import { useCallback, useMemo, useState } from 'react';
import { Copy, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const toHex = (value: number) => value.toString(16).padStart(2, '0');

const rgbToHex = (rgb: RGB) => `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;

const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta) % 6;
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      default:
        h = (rNorm - gNorm) / delta + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const hslToRgb = ({ h, s, l }: HSL): RGB => {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

const parseHex = (value: string): RGB | null => {
  const raw = value.trim().replace(/^#/, '').toLowerCase();
  if (![3, 6].includes(raw.length)) return null;
  if (!/^[0-9a-f]+$/.test(raw)) return null;
  const expanded = raw.length === 3 ? raw.split('').map((ch) => ch + ch).join('') : raw;
  const r = parseInt(expanded.slice(0, 2), 16);
  const g = parseInt(expanded.slice(2, 4), 16);
  const b = parseInt(expanded.slice(4, 6), 16);
  return { r, g, b };
};

const parseRgb = (value: string): RGB | null => {
  const matches = value.match(/-?\d+(\.\d+)?/g);
  if (!matches || matches.length < 3) return null;
  const [rRaw, gRaw, bRaw] = matches;
  const r = Number(rRaw);
  const g = Number(gRaw);
  const b = Number(bRaw);
  if ([r, g, b].some((num) => Number.isNaN(num))) return null;
  if ([r, g, b].some((num) => num < 0 || num > 255)) return null;
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
};

const parseHsl = (value: string): HSL | null => {
  const matches = value.match(/-?\d+(\.\d+)?/g);
  if (!matches || matches.length < 3) return null;
  const [hRaw, sRaw, lRaw] = matches;
  const h = Number(hRaw);
  const s = Number(sRaw);
  const l = Number(lRaw);
  if ([h, s, l].some((num) => Number.isNaN(num))) return null;
  if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) return null;
  return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
};

const formatRgb = (rgb: RGB) => `${rgb.r}, ${rgb.g}, ${rgb.b}`;

const formatHsl = (hsl: HSL) => `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;

export default function ColorConverterTool() {
  const [rgb, setRgb] = useState<RGB>({ r: 56, g: 189, b: 248 });
  const [hexInput, setHexInput] = useState('#38bdf8');
  const [rgbInput, setRgbInput] = useState('56, 189, 248');
  const [hslInput, setHslInput] = useState('195, 92%, 60%');
  const [errors, setErrors] = useState<{ hex: string | null; rgb: string | null; hsl: string | null }>({
    hex: null,
    rgb: null,
    hsl: null,
  });

  const currentHex = useMemo(() => rgbToHex(rgb), [rgb]);
  const currentHsl = useMemo(() => rgbToHsl(rgb), [rgb]);

  const syncFromRgb = useCallback((next: RGB) => {
    const clamped = {
      r: clamp(next.r, 0, 255),
      g: clamp(next.g, 0, 255),
      b: clamp(next.b, 0, 255),
    };
    setRgb(clamped);
    setHexInput(rgbToHex(clamped));
    setRgbInput(formatRgb(clamped));
    setHslInput(formatHsl(rgbToHsl(clamped)));
    setErrors({ hex: null, rgb: null, hsl: null });
  }, []);

  const handleHexChange = useCallback(
    (value: string) => {
      setHexInput(value);
      const parsed = parseHex(value);
      if (!parsed) {
        setErrors((prev) => ({ ...prev, hex: 'Enter a valid HEX value (#RGB or #RRGGBB).' }));
        return;
      }
      syncFromRgb(parsed);
    },
    [syncFromRgb]
  );

  const handleRgbChange = useCallback(
    (value: string) => {
      setRgbInput(value);
      const parsed = parseRgb(value);
      if (!parsed) {
        setErrors((prev) => ({ ...prev, rgb: 'Use the format 255, 255, 255 (values 0-255).' }));
        return;
      }
      syncFromRgb(parsed);
    },
    [syncFromRgb]
  );

  const handleHslChange = useCallback(
    (value: string) => {
      setHslInput(value);
      const parsed = parseHsl(value);
      if (!parsed) {
        setErrors((prev) => ({ ...prev, hsl: 'Use the format 180, 50%, 50% (H 0-360, S/L 0-100).' }));
        return;
      }
      syncFromRgb(hslToRgb(parsed));
    },
    [syncFromRgb]
  );

  const handlePickerChange = useCallback(
    (value: string) => {
      const parsed = parseHex(value);
      if (!parsed) return;
      syncFromRgb(parsed);
    },
    [syncFromRgb]
  );

  const handleHslChannelChange = useCallback(
    (channel: keyof HSL, value: number) => {
      const next = {
        ...currentHsl,
        [channel]: value,
      };
      syncFromRgb(hslToRgb(next));
    },
    [currentHsl, syncFromRgb]
  );

  const handleCopy = useCallback((label: string, value: string) => {
    if (!value) {
      toast.info(`Nothing to copy for ${label}.`);
      return;
    }
    navigator.clipboard.writeText(value).then(
      () => toast.success(`Copied ${label}.`),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, []);

  const handleReset = useCallback(() => {
    syncFromRgb({ r: 56, g: 189, b: 248 });
    toast.info('Reset to default color.');
  }, [syncFromRgb]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            Color Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Color Converter</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Convert between HEX, RGB, and HSL instantly. Everything runs locally in your browser.
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
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={currentHex}
                onChange={(event) => handlePickerChange(event.target.value)}
                className="h-12 w-12 cursor-pointer rounded-md border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-950"
                aria-label="Pick color"
              />
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Current</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{currentHex.toUpperCase()}</p>
                <p className="text-xs text-slate-400">{formatHsl(currentHsl)}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => handleCopy('HEX', currentHex)}>
                <Copy size={14} />
                Copy HEX
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw size={14} />
                Reset
              </Button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-2 rounded-lg border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <Label htmlFor="hex-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                HEX
              </Label>
              <Input
                id="hex-input"
                value={hexInput}
                onChange={(event) => handleHexChange(event.target.value)}
                placeholder="#RRGGBB"
                className="h-10 bg-white font-mono text-sm text-slate-700 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950 dark:text-slate-100"
              />
              {errors.hex ? <p className="text-xs text-rose-500">{errors.hex}</p> : null}
              <Button type="button" variant="outline" size="sm" onClick={() => handleCopy('HEX', currentHex)}>
                <Copy size={14} />
                Copy
              </Button>
            </div>

            <div className="space-y-2 rounded-lg border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <Label htmlFor="rgb-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                RGB
              </Label>
              <Input
                id="rgb-input"
                value={rgbInput}
                onChange={(event) => handleRgbChange(event.target.value)}
                placeholder="255, 255, 255"
                className="h-10 bg-white font-mono text-sm text-slate-700 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950 dark:text-slate-100"
              />
              {errors.rgb ? <p className="text-xs text-rose-500">{errors.rgb}</p> : null}
              <Button type="button" variant="outline" size="sm" onClick={() => handleCopy('RGB', formatRgb(rgb))}>
                <Copy size={14} />
                Copy
              </Button>
            </div>

            <div className="space-y-2 rounded-lg border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <Label htmlFor="hsl-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                HSL
              </Label>
              <Input
                id="hsl-input"
                value={hslInput}
                onChange={(event) => handleHslChange(event.target.value)}
                placeholder="180, 50%, 50%"
                className="h-10 bg-white font-mono text-sm text-slate-700 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950 dark:text-slate-100"
              />
              {errors.hsl ? <p className="text-xs text-rose-500">{errors.hsl}</p> : null}
              <Button type="button" variant="outline" size="sm" onClick={() => handleCopy('HSL', formatHsl(currentHsl))}>
                <Copy size={14} />
                Copy
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Custom Picker
                </p>
                <p className="text-xs text-slate-400">Tune the color using HSL sliders.</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>HSL</span>
                <span className="font-mono">{formatHsl(currentHsl)}</span>
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              <div className="grid gap-2 sm:grid-cols-[120px_1fr_80px] sm:items-center">
                <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Hue
                </Label>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={currentHsl.h}
                  onChange={(event) => handleHslChannelChange('h', Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-900 dark:bg-slate-800"
                  aria-label="Hue"
                />
                <Input
                  value={currentHsl.h}
                  onChange={(event) => handleHslChannelChange('h', clamp(Number(event.target.value), 0, 360))}
                  className="h-9 bg-white font-mono text-sm text-slate-700 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-[120px_1fr_80px] sm:items-center">
                <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Saturation
                </Label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={currentHsl.s}
                  onChange={(event) => handleHslChannelChange('s', Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-900 dark:bg-slate-800"
                  aria-label="Saturation"
                />
                <Input
                  value={currentHsl.s}
                  onChange={(event) => handleHslChannelChange('s', clamp(Number(event.target.value), 0, 100))}
                  className="h-9 bg-white font-mono text-sm text-slate-700 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-[120px_1fr_80px] sm:items-center">
                <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Lightness
                </Label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={currentHsl.l}
                  onChange={(event) => handleHslChannelChange('l', Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-900 dark:bg-slate-800"
                  aria-label="Lightness"
                />
                <Input
                  value={currentHsl.l}
                  onChange={(event) => handleHslChannelChange('l', clamp(Number(event.target.value), 0, 100))}
                  className="h-9 bg-white font-mono text-sm text-slate-700 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
