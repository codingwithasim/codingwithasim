'use client';

import { useCallback, useMemo, useState } from 'react';
import { Copy, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const SAMPLE_HEADER = {
  alg: 'HS256',
  typ: 'JWT',
};

const SAMPLE_PAYLOAD = {
  sub: '1234567890',
  name: 'Jane Doe',
  admin: true,
  iat: 1516239022,
  exp: 1893456000,
};

type DecodeResult = {
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string | null;
  error: string | null;
};

const base64UrlDecode = (input: string) => {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
};

const base64UrlEncode = (input: string) => {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const decodeJwt = (token: string): DecodeResult => {
  if (!token.trim()) {
    return { header: null, payload: null, signature: null, error: 'Paste a JWT to decode.' };
  }

  const parts = token.trim().split('.');
  if (parts.length < 2) {
    return { header: null, payload: null, signature: null, error: 'JWT must have at least two parts.' };
  }

  try {
    const headerJson = base64UrlDecode(parts[0]);
    const payloadJson = base64UrlDecode(parts[1]);
    const header = JSON.parse(headerJson) as Record<string, unknown>;
    const payload = JSON.parse(payloadJson) as Record<string, unknown>;
    const signature = parts[2] ?? null;
    return { header, payload, signature, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to decode token.';
    return { header: null, payload: null, signature: null, error: `Invalid token: ${message}` };
  }
};

const formatJson = (value: Record<string, unknown> | null) => {
  if (!value) return '';
  return JSON.stringify(value, null, 2);
};

const formatClaimValue = (value: unknown) => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value === null || value === undefined) return '-';
  return JSON.stringify(value);
};

const unixToLocal = (value: unknown) => {
  if (typeof value !== 'number') return null;
  const date = new Date(value * 1000);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString();
};

export default function JwtDecoderTool() {
  const [token, setToken] = useState('');

  const decoded = useMemo(() => decodeJwt(token), [token]);

  const claims = useMemo(() => {
    if (!decoded.payload) return [] as Array<{ key: string; value: string; note?: string }>;
    return Object.entries(decoded.payload).map(([key, value]) => {
      const note = ['exp', 'iat', 'nbf'].includes(key) ? unixToLocal(value) ?? undefined : undefined;
      return { key, value: formatClaimValue(value), note };
    });
  }, [decoded.payload]);

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

  const handleCopyAll = useCallback(() => {
    if (!decoded.payload && !decoded.header) {
      toast.info('Nothing to copy yet.');
      return;
    }

    const payload = {
      header: decoded.header,
      payload: decoded.payload,
      signature: decoded.signature,
    };

    navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(
      () => toast.success('Copied decoded token.'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [decoded.header, decoded.payload, decoded.signature]);

  const handleClear = useCallback(() => {
    setToken('');
    toast.info('Cleared token.');
  }, []);

  const handleSample = useCallback(() => {
    const header = base64UrlEncode(JSON.stringify(SAMPLE_HEADER));
    const payload = base64UrlEncode(JSON.stringify(SAMPLE_PAYLOAD));
    const signature = 'signature';
    setToken(`${header}.${payload}.${signature}`);
    toast.info('Loaded sample token.');
  }, []);

  const headerJson = useMemo(() => formatJson(decoded.header), [decoded.header]);
  const payloadJson = useMemo(() => formatJson(decoded.payload), [decoded.payload]);

  const expiryNote = useMemo(() => {
    const exp = decoded.payload?.exp;
    if (typeof exp !== 'number') return null;
    const date = new Date(exp * 1000);
    if (Number.isNaN(date.getTime())) return null;
    const isExpired = Date.now() > date.getTime();
    return isExpired ? 'Expired' : 'Active';
  }, [decoded.payload]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            JWT Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">JWT Decoder</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Decode JSON Web Tokens locally in your browser. Inspect headers, payloads, and common claims instantly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Client-side
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No tracking
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Offline ready
          </Badge>
        </div>
      </div>

      <Card className="rounded-xl border border-slate-200/70 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/70">
        <CardContent className="space-y-6 p-5">
          <div className="space-y-2">
            <Label htmlFor="jwt-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              JWT Token
            </Label>
            <Textarea
              id="jwt-input"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Paste your JWT here..."
              className="min-h-[160px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
              spellCheck={false}
            />
            {decoded.error ? <p className="text-xs text-rose-500">{decoded.error}</p> : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleCopy('header JSON', headerJson)}
              className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <Copy size={12} />
              Copy Header
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleCopy('payload JSON', payloadJson)}
              className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <Copy size={12} />
              Copy Payload
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCopyAll}
              className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <Copy size={12} />
              Copy All
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSample}
              className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              Sample Token
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

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Header</div>
              <pre className="mt-3 min-h-[180px] whitespace-pre-wrap break-words font-mono text-xs text-slate-700 dark:text-slate-200">
                {headerJson || '-'}
              </pre>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Payload</div>
              <pre className="mt-3 min-h-[180px] whitespace-pre-wrap break-words font-mono text-xs text-slate-700 dark:text-slate-200">
                {payloadJson || '-'}
              </pre>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Claims</div>
            {claims.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">No claims found yet.</p>
            ) : (
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {claims.map((claim) => (
                  <div key={claim.key} className="rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.25em] text-slate-400">
                      <span>{claim.key}</span>
                      {claim.note ? <span>{claim.note}</span> : null}
                    </div>
                    <div className="mt-2 font-mono text-sm text-slate-800 dark:text-slate-100">{claim.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white/70 p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Token Summary</div>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              <div className="flex items-center justify-between">
                <span>Algorithm</span>
                <span className="font-semibold text-slate-700 dark:text-slate-100">
                  {decoded.header?.alg ? String(decoded.header.alg) : '-'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Type</span>
                <span className="font-semibold text-slate-700 dark:text-slate-100">
                  {decoded.header?.typ ? String(decoded.header.typ) : '-'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Expires</span>
                <span className="font-semibold text-slate-700 dark:text-slate-100">
                  {expiryNote ?? '-'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
        <CardContent className="p-4 text-xs text-slate-500 dark:text-slate-400">
          JWTs are decoded locally in your browser. Signatures are not verified by this tool.
        </CardContent>
      </Card>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">What is a JWT?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A JSON Web Token (JWT) is a compact, URL-safe token used to securely transmit claims between parties. It includes a header,
              payload, and signature.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">How to decode JWTs</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Paste a token into the input and the header and payload decode instantly. Use the claims list to review expiry and issued
              timestamps.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Common JWT claims</h2>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><span className="font-mono">sub</span> - subject identifier</li>
              <li><span className="font-mono">exp</span> - expiration time</li>
              <li><span className="font-mono">iat</span> - issued at</li>
              <li><span className="font-mono">nbf</span> - not before</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Why decode JWTs locally</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Decoding tokens locally keeps your credentials private and lets you inspect payloads without sending data to external APIs.
            </p>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
