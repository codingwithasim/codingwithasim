'use client';

import { useCallback, useMemo, useState } from 'react';
import { Copy, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const pad = (value: number, length = 2) => String(value).padStart(length, '0');

type Timezone = 'local' | 'utc';
type Unit = 'seconds' | 'milliseconds';

const formatDateTime = (date: Date, timezone: Timezone) => {
  const year = timezone === 'utc' ? date.getUTCFullYear() : date.getFullYear();
  const month = timezone === 'utc' ? date.getUTCMonth() + 1 : date.getMonth() + 1;
  const day = timezone === 'utc' ? date.getUTCDate() : date.getDate();
  const hour = timezone === 'utc' ? date.getUTCHours() : date.getHours();
  const minute = timezone === 'utc' ? date.getUTCMinutes() : date.getMinutes();
  const second = timezone === 'utc' ? date.getUTCSeconds() : date.getSeconds();

  return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`;
};

const formatDateInputValue = (date: Date, timezone: Timezone) => {
  const year = timezone === 'utc' ? date.getUTCFullYear() : date.getFullYear();
  const month = timezone === 'utc' ? date.getUTCMonth() + 1 : date.getMonth() + 1;
  const day = timezone === 'utc' ? date.getUTCDate() : date.getDate();
  const hour = timezone === 'utc' ? date.getUTCHours() : date.getHours();
  const minute = timezone === 'utc' ? date.getUTCMinutes() : date.getMinutes();
  const second = timezone === 'utc' ? date.getUTCSeconds() : date.getSeconds();
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`;
};

const parseDateInput = (value: string, timezone: Timezone) => {
  if (!value) return null;
  const [datePart, timePart] = value.split('T');
  if (!datePart || !timePart) return null;

  const [year, month, day] = datePart.split('-').map((part) => Number(part));
  const [hourStr, minuteStr, secondStrRaw] = timePart.split(':');
  const secondStr = secondStrRaw?.split('.')[0] ?? '0';
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  const second = Number(secondStr);

  if ([year, month, day, hour, minute, second].some((part) => Number.isNaN(part))) {
    return null;
  }

  if (timezone === 'utc') {
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  }

  return new Date(year, month - 1, day, hour, minute, second);
};

export default function TimestampTool() {
  const [unixInput, setUnixInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [unit, setUnit] = useState<Unit>('seconds');
  const [timezone, setTimezone] = useState<Timezone>('local');

  const unixParse = useMemo(() => {
    if (!unixInput.trim()) {
      return { date: null as Date | null, error: null as string | null };
    }

    const numeric = Number(unixInput.trim());
    if (!Number.isFinite(numeric)) {
      return { date: null, error: 'Enter a valid number.' };
    }

    const ms = unit === 'seconds' ? numeric * 1000 : numeric;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) {
      return { date: null, error: 'Invalid timestamp.' };
    }

    return { date, error: null };
  }, [unixInput, unit]);

  const dateParse = useMemo(() => {
    if (!dateInput.trim()) {
      return { date: null as Date | null, error: null as string | null };
    }

    const date = parseDateInput(dateInput, timezone);
    if (!date || Number.isNaN(date.getTime())) {
      return { date: null, error: 'Enter a valid date and time.' };
    }

    return { date, error: null };
  }, [dateInput, timezone]);

  const unixFormatted = useMemo(() => {
    if (!unixParse.date) return null;
    return {
      display: formatDateTime(unixParse.date, timezone),
      iso: unixParse.date.toISOString(),
    };
  }, [unixParse.date, timezone]);

  const dateOutput = useMemo(() => {
    if (!dateParse.date) return null;
    const ms = dateParse.date.getTime();
    const seconds = Math.floor(ms / 1000);
    return {
      seconds: String(seconds),
      milliseconds: String(ms),
    };
  }, [dateParse.date]);

  const handleNowUnix = useCallback(() => {
    const now = Date.now();
    const value = unit === 'seconds' ? Math.floor(now / 1000) : now;
    setUnixInput(String(value));
    toast.info('Set current timestamp.');
  }, [unit]);

  const handleNowDate = useCallback(() => {
    setDateInput(formatDateInputValue(new Date(), timezone));
    toast.info('Set current date and time.');
  }, [timezone]);

  const handleCopy = useCallback((label: string, value: string) => {
    if (!value.trim()) {
      toast.info(`Nothing to copy for ${label}.`);
      return;
    }

    navigator.clipboard.writeText(value).then(
      () => toast.success(`Copied ${label}.`),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, []);

  const handleClear = useCallback(() => {
    setUnixInput('');
    setDateInput('');
    toast.info('Cleared inputs.');
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            Time Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Timestamp Converter</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Convert Unix timestamps to human-readable dates and back. Everything runs locally in your browser.
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
            <div className="flex items-center gap-2">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Timezone</span>
              <div className="flex rounded-md border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => setTimezone('local')}
                  className={`rounded-md px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${
                    timezone === 'local'
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Local
                </button>
                <button
                  type="button"
                  onClick={() => setTimezone('utc')}
                  className={`rounded-md px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${
                    timezone === 'utc'
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  UTC
                </button>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="h-8 rounded-md border-slate-200 bg-white text-[0.65rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <RefreshCw size={12} />
              Clear All
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Unix Timestamp</div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Convert from epoch to a readable date.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleNowUnix}
                  className="h-8 rounded-md border-slate-200 bg-white text-[0.65rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  Now
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="unix-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Timestamp
                </Label>
                <Input
                  id="unix-input"
                  type="text"
                  value={unixInput}
                  onChange={(event) => setUnixInput(event.target.value)}
                  placeholder="e.g. 1700000000"
                  className="h-10 bg-white/70 text-sm text-slate-700 shadow-none dark:bg-slate-950/40 dark:text-slate-100"
                />
                {unixParse.error ? <p className="text-xs text-rose-500">{unixParse.error}</p> : null}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Unit</span>
                <div className="flex rounded-md border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
                  <button
                    type="button"
                    onClick={() => setUnit('seconds')}
                    className={`rounded-md px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${
                      unit === 'seconds'
                        ? 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Seconds
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('milliseconds')}
                    className={`rounded-md px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${
                      unit === 'milliseconds'
                        ? 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    Milliseconds
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Formatted</span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopy('formatted date', unixFormatted?.display ?? '')}
                    className="h-7 rounded-md border-slate-200 bg-white text-[0.6rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <Copy size={12} />
                    Copy
                  </Button>
                </div>
                <div className="mt-2 font-mono text-sm text-slate-800 dark:text-slate-100">
                  {unixFormatted?.display ?? '-'}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-400">ISO 8601</span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopy('ISO date', unixFormatted?.iso ?? '')}
                    className="h-7 rounded-md border-slate-200 bg-white text-[0.6rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <Copy size={12} />
                    Copy
                  </Button>
                </div>
                <div className="mt-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                  {unixFormatted?.iso ?? '-'}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Date and Time</div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Convert from a date to epoch values.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleNowDate}
                  className="h-8 rounded-md border-slate-200 bg-white text-[0.65rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  Now
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="date-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Date Input
                </Label>
                <Input
                  id="date-input"
                  type="datetime-local"
                  step="1"
                  value={dateInput}
                  onChange={(event) => setDateInput(event.target.value)}
                  className="h-10 bg-white/70 text-sm text-slate-700 shadow-none dark:bg-slate-950/40 dark:text-slate-100"
                />
                {dateParse.error ? <p className="text-xs text-rose-500">{dateParse.error}</p> : null}
              </div>

              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Seconds</span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopy('seconds', dateOutput?.seconds ?? '')}
                    className="h-7 rounded-md border-slate-200 bg-white text-[0.6rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <Copy size={12} />
                    Copy
                  </Button>
                </div>
                <div className="mt-2 font-mono text-sm text-slate-800 dark:text-slate-100">
                  {dateOutput?.seconds ?? '-'}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Milliseconds</span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopy('milliseconds', dateOutput?.milliseconds ?? '')}
                    className="h-7 rounded-md border-slate-200 bg-white text-[0.6rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <Copy size={12} />
                    Copy
                  </Button>
                </div>
                <div className="mt-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                  {dateOutput?.milliseconds ?? '-'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">What is a Unix timestamp?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A Unix timestamp counts the number of seconds or milliseconds since January 1, 1970 (UTC). It is used for logs, APIs, and
              databases to track time consistently.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">How to convert timestamps</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enter a timestamp to see its date, or choose a date to get the epoch value. Use the timezone toggle to switch between local
              time and UTC.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Common timestamp units</h2>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><span className="font-mono">seconds</span> - 10 digits, used in many APIs</li>
              <li><span className="font-mono">milliseconds</span> - 13 digits, common in JavaScript</li>
              <li><span className="font-mono">ISO 8601</span> - human-readable standard</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Why use a converter</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Converting timestamps quickly helps debug logs, schedule jobs, and validate time-sensitive data without switching tools.
            </p>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
