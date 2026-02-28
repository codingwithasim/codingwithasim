'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Copy, RefreshCw, SendHorizonal, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const;
const REQUEST_TABS = ['Params', 'Headers', 'Body'] as const;
const RESPONSE_TABS = ['Body', 'Headers'] as const;

const createRow = () => ({ id: crypto.randomUUID(), key: '', value: '', enabled: true });

type KeyValueRow = ReturnType<typeof createRow>;
type RequestTab = (typeof REQUEST_TABS)[number];
type ResponseTab = (typeof RESPONSE_TABS)[number];

type BodyType = 'none' | 'json' | 'text';

type ResponseState = {
  status: number | null;
  statusText: string;
  timeMs: number | null;
  size: number | null;
  headers: Record<string, string>;
  body: string;
  error: string | null;
};

const emptyResponse: ResponseState = {
  status: null,
  statusText: '',
  timeMs: null,
  size: null,
  headers: {},
  body: '',
  error: null,
};

const buildHeaders = (rows: KeyValueRow[]) => {
  const headers = new Headers();
  rows.forEach((row) => {
    if (!row.enabled) return;
    if (!row.key.trim()) return;
    headers.set(row.key.trim(), row.value);
  });
  return headers;
};

const buildQuery = (rows: KeyValueRow[]) => {
  const params = new URLSearchParams();
  rows.forEach((row) => {
    if (!row.enabled) return;
    if (!row.key.trim()) return;
    params.append(row.key.trim(), row.value);
  });
  return params.toString();
};

const stringifyHeaders = (headers: Record<string, string>) => {
  const lines = Object.entries(headers).map(([key, value]) => `${key}: ${value}`);
  return lines.join('\n');
};

export default function ApiTesterTool() {
  const [method, setMethod] = useState<(typeof METHODS)[number]>('GET');
  const [url, setUrl] = useState('');
  const [params, setParams] = useState<KeyValueRow[]>([createRow()]);
  const [headers, setHeaders] = useState<KeyValueRow[]>([createRow()]);
  const [bodyType, setBodyType] = useState<BodyType>('none');
  const [bodyText, setBodyText] = useState('');
  const [requestTab, setRequestTab] = useState<RequestTab>('Params');
  const [responseTab, setResponseTab] = useState<ResponseTab>('Body');
  const [prettyJson, setPrettyJson] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState<ResponseState>(emptyResponse);

  const controllerRef = useRef<AbortController | null>(null);

  const requestUrl = useMemo(() => {
    if (!url.trim()) return '';
    try {
      const base = new URL(url.trim());
      const query = buildQuery(params);
      if (query) {
        base.search = query;
      }
      return base.toString();
    } catch {
      return '';
    }
  }, [params, url]);

  const responseBodyView = useMemo(() => {
    if (!response.body) return '';
    if (!prettyJson) return response.body;
    const contentType = response.headers['content-type'] ?? '';
    if (!contentType.includes('application/json')) return response.body;
    try {
      return JSON.stringify(JSON.parse(response.body), null, 2);
    } catch {
      return response.body;
    }
  }, [prettyJson, response.body, response.headers]);

  const handleAddRow = useCallback((setter: React.Dispatch<React.SetStateAction<KeyValueRow[]>>) => {
    setter((prev) => [...prev, createRow()]);
  }, []);

  const handleRemoveRow = useCallback((setter: React.Dispatch<React.SetStateAction<KeyValueRow[]>>, id: string) => {
    setter((prev) => prev.filter((row) => row.id !== id));
  }, []);

  const handleRowChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<KeyValueRow[]>>, id: string, key: 'key' | 'value') =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setter((prev) => prev.map((row) => (row.id === id ? { ...row, [key]: value } : row)));
      },
    []
  );

  const handleToggleRow = useCallback(
    (setter: React.Dispatch<React.SetStateAction<KeyValueRow[]>>, id: string) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setter((prev) => prev.map((row) => (row.id === id ? { ...row, enabled: checked } : row)));
      },
    []
  );

  const handleSend = useCallback(async () => {
    if (isSending) return;
    if (!url.trim()) {
      toast.error('Enter a request URL.');
      return;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(requestUrl || url.trim());
    } catch {
      toast.error('Enter a valid URL (include https://).');
      return;
    }

    let body: string | undefined;
    if (bodyType === 'json') {
      if (!bodyText.trim()) {
        body = '';
      } else {
        try {
          JSON.parse(bodyText);
          body = bodyText;
        } catch {
          toast.error('Body is not valid JSON.');
          return;
        }
      }
    } else if (bodyType === 'text') {
      body = bodyText;
    }

    const headersList = buildHeaders(headers);
    if (bodyType === 'json' && !headersList.has('Content-Type')) {
      headersList.set('Content-Type', 'application/json');
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setIsSending(true);
    setResponse(emptyResponse);

    const start = performance.now();

    try {
      const response = await fetch(parsedUrl.toString(), {
        method,
        headers: headersList,
        body: method === 'GET' || method === 'HEAD' ? undefined : body,
        signal: controller.signal,
      });

      const text = await response.text();
      const timeMs = Math.round(performance.now() - start);
      const size = new TextEncoder().encode(text).length;

      const headersObj: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headersObj[key.toLowerCase()] = value;
      });

      setResponse({
        status: response.status,
        statusText: response.statusText,
        timeMs,
        size,
        headers: headersObj,
        body: text,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed.';
      setResponse((prev) => ({ ...prev, error: message }));
      toast.error('Request failed. Check CORS or network settings.');
    } finally {
      setIsSending(false);
      controllerRef.current = null;
    }
  }, [bodyText, bodyType, headers, isSending, method, requestUrl, url]);

  const handleCancel = useCallback(() => {
    controllerRef.current?.abort();
    setIsSending(false);
    toast.info('Request cancelled.');
  }, []);

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

  const handleReset = useCallback(() => {
    setMethod('GET');
    setUrl('');
    setParams([createRow()]);
    setHeaders([createRow()]);
    setBodyType('none');
    setBodyText('');
    setResponse(emptyResponse);
    toast.info('Cleared request.');
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            API Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">API Tester</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Test REST APIs with headers, params, and JSON bodies. Requests run locally in your browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Client-side
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Postman-like
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No tracking
          </Badge>
        </div>
      </div>

      <Card className="rounded-2xl border border-slate-200/70 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/70">
        <CardContent className="space-y-6 p-5">
          <div className="grid gap-3 rounded-xl border border-slate-200 bg-white/70 p-3 dark:border-slate-800 dark:bg-slate-950/40 lg:grid-cols-[120px_1fr_auto]">
            <div className="space-y-1">
              <Label className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Method</Label>
              <select
                value={method}
                onChange={(event) => setMethod(event.target.value as (typeof METHODS)[number])}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              >
                {METHODS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="api-url" className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                Request URL
              </Label>
              <Input
                id="api-url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://api.example.com/v1/users"
                className="h-10 bg-white/70 text-sm text-slate-700 shadow-none dark:bg-slate-950/40 dark:text-slate-100"
              />
            </div>

            <div className="flex items-end gap-2">
              <Button
                type="button"
                onClick={handleSend}
                disabled={isSending}
                className="h-10 rounded-md bg-slate-900 px-5 text-xs font-semibold uppercase tracking-[0.25em] text-white hover:scale-100 active:scale-100 hover:bg-slate-800"
              >
                <SendHorizonal size={12} />
                {isSending ? 'Sending' : 'Send'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={isSending ? handleCancel : handleReset}
                className="h-10 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                {isSending ? <X size={12} /> : <RefreshCw size={12} />}
                {isSending ? 'Cancel' : 'Clear'}
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                {REQUEST_TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setRequestTab(tab)}
                    className={`rounded-md border px-3 py-2 text-[0.65rem] transition ${
                      requestTab === tab
                        ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {requestTab === 'Params' ? (
                <div className="space-y-3">
                  {params.map((row) => (
                    <div key={row.id} className="grid gap-2 rounded-lg border border-slate-200 bg-white/70 p-3 dark:border-slate-800 dark:bg-slate-950/40 sm:grid-cols-[24px_1fr_1fr_auto]">
                      <input
                        type="checkbox"
                        checked={row.enabled}
                        onChange={handleToggleRow(setParams, row.id)}
                        className="mt-2 h-4 w-4 rounded border-slate-300 text-sky-600 dark:border-slate-700"
                      />
                      <Input
                        value={row.key}
                        onChange={handleRowChange(setParams, row.id, 'key')}
                        placeholder="key"
                        className="h-9 bg-white/70 text-sm text-slate-700 shadow-none dark:bg-slate-950/40 dark:text-slate-100"
                      />
                      <Input
                        value={row.value}
                        onChange={handleRowChange(setParams, row.id, 'value')}
                        placeholder="value"
                        className="h-9 bg-white/70 text-sm text-slate-700 shadow-none dark:bg-slate-950/40 dark:text-slate-100"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRemoveRow(setParams, row.id)}
                        className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddRow(setParams)}
                    className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    Add Param
                  </Button>
                </div>
              ) : null}

              {requestTab === 'Headers' ? (
                <div className="space-y-3">
                  {headers.map((row) => (
                    <div key={row.id} className="grid gap-2 rounded-lg border border-slate-200 bg-white/70 p-3 dark:border-slate-800 dark:bg-slate-950/40 sm:grid-cols-[24px_1fr_1fr_auto]">
                      <input
                        type="checkbox"
                        checked={row.enabled}
                        onChange={handleToggleRow(setHeaders, row.id)}
                        className="mt-2 h-4 w-4 rounded border-slate-300 text-sky-600 dark:border-slate-700"
                      />
                      <Input
                        value={row.key}
                        onChange={handleRowChange(setHeaders, row.id, 'key')}
                        placeholder="Header"
                        className="h-9 bg-white/70 text-sm text-slate-700 shadow-none dark:bg-slate-950/40 dark:text-slate-100"
                      />
                      <Input
                        value={row.value}
                        onChange={handleRowChange(setHeaders, row.id, 'value')}
                        placeholder="Value"
                        className="h-9 bg-white/70 text-sm text-slate-700 shadow-none dark:bg-slate-950/40 dark:text-slate-100"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRemoveRow(setHeaders, row.id)}
                        className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddRow(setHeaders)}
                    className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    Add Header
                  </Button>
                </div>
              ) : null}

              {requestTab === 'Body' ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {(['none', 'json', 'text'] as BodyType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setBodyType(type)}
                        className={`rounded-md border px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] transition ${
                          bodyType === type
                            ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {bodyType === 'none' ? (
                    <p className="text-sm text-slate-400">No request body for this method.</p>
                  ) : (
                    <Textarea
                      value={bodyText}
                      onChange={(event) => setBodyText(event.target.value)}
                      placeholder={bodyType === 'json' ? '{"name": "Ada"}' : 'Raw text body'}
                      className="min-h-[180px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
                      spellCheck={false}
                    />
                  )}
                </div>
              ) : null}

              <div className="rounded-lg border border-slate-200 bg-white/70 p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Request Preview</div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Resolved URL</span>
                    <span className="font-mono text-slate-700 dark:text-slate-100 truncate">{requestUrl || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Body Type</span>
                    <span className="font-mono text-slate-700 dark:text-slate-100">{bodyType}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Response</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Status {response.status ?? '-'} {response.statusText}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{response.timeMs ? `${response.timeMs} ms` : '-'}</span>
                    <span>{response.size ? `${response.size} bytes` : '-'}</span>
                  </div>
                </div>

                {response.error ? <p className="mt-3 text-sm text-rose-500">{response.error}</p> : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  {RESPONSE_TABS.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setResponseTab(tab)}
                      className={`rounded-md border px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] transition ${
                        responseTab === tab
                          ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                  <label className="ml-auto flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">
                    <input
                      type="checkbox"
                      checked={prettyJson}
                      onChange={(event) => setPrettyJson(event.target.checked)}
                      className="h-3.5 w-3.5 rounded border-slate-300 text-sky-600 dark:border-slate-700"
                    />
                    Pretty JSON
                  </label>
                </div>

                {responseTab === 'Body' ? (
                  <div className="mt-4 rounded-md border border-slate-200 bg-white/70 p-3 font-mono text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200">
                    <pre className="whitespace-pre-wrap break-words">{responseBodyView || 'Response body will appear here.'}</pre>
                  </div>
                ) : null}

                {responseTab === 'Headers' ? (
                  <div className="mt-4 rounded-md border border-slate-200 bg-white/70 p-3 font-mono text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200">
                    <pre className="whitespace-pre-wrap break-words">{stringifyHeaders(response.headers) || 'Response headers will appear here.'}</pre>
                  </div>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopy('response body', response.body)}
                    className="h-8 rounded-md border-slate-200 bg-white text-[0.65rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <Copy size={12} />
                    Copy Body
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopy('response headers', stringifyHeaders(response.headers))}
                    className="h-8 rounded-md border-slate-200 bg-white text-[0.65rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <Copy size={12} />
                    Copy Headers
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white/70 p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Note</div>
                <p className="mt-2 text-sm">
                  Some APIs block browser requests due to CORS. If a request fails, try the same endpoint in a server or proxy.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">What is an API tester?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              An API tester lets you send HTTP requests to endpoints and inspect the response. It is useful for debugging REST APIs,
              checking payloads, and validating headers.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">How to use this API tester</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Choose a method, enter a URL, add headers or params, and send the request. The response panel shows status, headers, and
              body output.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Common REST requests</h2>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><span className="font-mono">GET</span> - fetch data</li>
              <li><span className="font-mono">POST</span> - create a resource</li>
              <li><span className="font-mono">PATCH</span> - update fields</li>
              <li><span className="font-mono">DELETE</span> - remove a resource</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Why test APIs locally</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Running requests in the browser is fast and private. You can validate responses quickly before integrating them into your
              app.
            </p>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
