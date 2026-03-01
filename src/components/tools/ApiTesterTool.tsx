'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Copy, RefreshCw, SendHorizonal, X } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '../ui/toggle';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const;
const REQUEST_TABS = ['Params', 'Headers', 'Body'] as const;
const RESPONSE_TABS = ['Body', 'Headers'] as const;

const createRow = () => ({ id: crypto.randomUUID(), key: '', value: '', description: '', enabled: true });

type KeyValueRow = ReturnType<typeof createRow>;

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

const countEnabled = (rows: KeyValueRow[]) => rows.filter((row) => row.enabled && row.key.trim()).length;

const tokenColors = {
  key: 'text-purple-700 dark:text-purple-300',
  string: 'text-green-700 dark:text-green-300',
  number: 'text-blue-700 dark:text-blue-300',
  boolean: 'text-yellow-700 dark:text-yellow-300',
  null: 'text-slate-500 dark:text-slate-400',
};

const escapeHtml = (input: string) =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const syntaxHighlightJson = (json: string) => {
  const escaped = escapeHtml(json);
  return escaped.replace(
    /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = tokenColors.number;
      if (match.startsWith('"')) {
        cls = match.endsWith(':') ? tokenColors.key : tokenColors.string;
      } else if (match === 'true' || match === 'false') {
        cls = tokenColors.boolean;
      } else if (match === 'null') {
        cls = tokenColors.null;
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
};

export default function ApiTesterTool() {
  const [method, setMethod] = useState<(typeof METHODS)[number]>('GET');
  const [url, setUrl] = useState('');
  const [params, setParams] = useState<KeyValueRow[]>([createRow()]);
  const [headers, setHeaders] = useState<KeyValueRow[]>([createRow()]);
  const [bodyType, setBodyType] = useState<BodyType>('none');
  const [bodyText, setBodyText] = useState('');
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

  const responseBodyHighlighted = useMemo(() => {
    if (!responseBodyView) return '';
    const contentType = response.headers['content-type'] ?? '';
    if (!contentType.includes('application/json')) return '';
    return syntaxHighlightJson(responseBodyView);
  }, [responseBodyView, response.headers]);

  const paramsCount = useMemo(() => countEnabled(params), [params]);
  const headersCount = useMemo(() => countEnabled(headers), [headers]);

  const methodTone = useMemo(() => {
    switch (method) {
      case 'GET':
        return 'border-emerald-200 text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-200';
      case 'POST':
        return 'border-sky-200 text-sky-700 dark:border-sky-500/40 dark:text-sky-200';
      case 'PUT':
        return 'border-amber-200 text-amber-700 dark:border-amber-500/40 dark:text-amber-200';
      case 'PATCH':
        return 'border-violet-200 text-violet-700 dark:border-violet-500/40 dark:text-violet-200';
      case 'DELETE':
        return 'border-rose-200 text-rose-700 dark:border-rose-500/40 dark:text-rose-200';
      default:
        return 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300';
    }
  }, [method]);

  const statusTone = useMemo(() => {
    if (!response.status) return 'border-slate-200 text-slate-500 bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:bg-slate-900';
    if (response.status >= 200 && response.status < 300) {
      return 'border-emerald-200 text-emerald-700 bg-emerald-50 dark:border-emerald-500/40 dark:text-emerald-200 dark:bg-emerald-500/10';
    }
    if (response.status >= 300 && response.status < 400) {
      return 'border-amber-200 text-amber-700 bg-amber-50 dark:border-amber-500/40 dark:text-amber-200 dark:bg-amber-500/10';
    }
    return 'border-rose-200 text-rose-700 bg-rose-50 dark:border-rose-500/40 dark:text-rose-200 dark:bg-rose-500/10';
  }, [response.status]);

  const handleAddRow = useCallback((setter: React.Dispatch<React.SetStateAction<KeyValueRow[]>>) => {
    setter((prev) => [...prev, createRow()]);
  }, []);

  const handleRemoveRow = useCallback((setter: React.Dispatch<React.SetStateAction<KeyValueRow[]>>, id: string) => {
    setter((prev) => prev.filter((row) => row.id !== id));
  }, []);

  const handleRowChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<KeyValueRow[]>>, id: string, key: 'key' | 'value' | 'description') =>
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
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">API Tester</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Minimal Postman-style request workspace.</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-md border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
            No Environment
          </span>
          <Badge variant="outline" className="text-[10px] uppercase tracking-[0.2em]">
            Client-side
          </Badge>
        </div>
      </header>

      <Card className="border-slate-200 shadow-none dark:border-slate-800">
        <Tabs defaultValue="params" className="space-y-0">
          <CardHeader className="space-y-3">
          <div className="grid gap-3 lg:grid-cols-[120px_1fr_auto] items-center">
            <div className="space-y-1">
              <Label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Method</Label>
              <select
                value={method}
                onChange={(event) => setMethod(event.target.value as (typeof METHODS)[number])}
                className={`h-9 w-full rounded-md border bg-white px-3 text-xs font-semibold uppercase tracking-[0.2em] shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 dark:bg-slate-950 ${methodTone}`}
              >
                {METHODS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="api-url" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Request URL
              </Label>
              <Input
                id="api-url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://api.example.com/v1/users"
                className="h-9 rounded-md border-slate-200 bg-white text-sm text-slate-700 shadow-none focus-visible:ring-1 focus-visible:ring-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <div className="flex flex-wrap h-full items-end gap-2">
              <Button
                type="button"
                onClick={handleSend}
                disabled={isSending}
                className="h-9 rounded-md bg-slate-900 px-5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-none hover:bg-slate-800"
              >
                <SendHorizonal size={14} />
                {isSending ? 'Sending' : 'Send'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={isSending ? handleCancel : handleReset}
                className="h-9 rounded-md border-slate-200 bg-white text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-none hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
              >
                {isSending ? <X size={12} /> : <RefreshCw size={12} />}
                {isSending ? 'Cancel' : 'Reset'}
              </Button>
            </div>
          </div>

          <TabsList className="w-fit">
              {REQUEST_TABS.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLocaleLowerCase()}
                >
                  {tab}
                  {tab === 'Params' && paramsCount ? <span className="ml-2 text-[10px]">{paramsCount}</span> : null}
                  {tab === 'Headers' && headersCount ? <span className="ml-2 text-[10px]">{headersCount}</span> : null}
                </TabsTrigger>
              ))}
          </TabsList>
          
        </CardHeader>

        

        <CardContent className="space-y-4">
          <TabsContent value="params" className="mt-0">
            <div className="space-y-3">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white">Query Params</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Key/value pairs appended to the URL.</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => handleAddRow(setParams)}>
                  Add Param
                </Button>
              </div>

              <div className="overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
                <div className="grid gap-3 bg-slate-50 px-3 py-2 text-[11px] font-medium text-slate-400 dark:bg-slate-900/40 dark:text-slate-500 sm:grid-cols-[24px_1fr_1fr_1fr_90px]">
                  <span />
                  <span>Key</span>
                  <span>Value</span>
                  <span>Description</span>
                  <span className="text-right">Action</span>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {params.map((row) => (
                    <div key={row.id} className="grid gap-3 px-3 py-2 sm:grid-cols-[24px_1fr_1fr_1fr_90px]">
                      <input
                        type="checkbox"
                        checked={row.enabled}
                        onChange={handleToggleRow(setParams, row.id)}
                        className="mt-2 h-4 w-4 rounded border-slate-300 text-slate-900 dark:border-slate-700"
                      />
                      <Input
                        value={row.key}
                        onChange={handleRowChange(setParams, row.id, 'key')}
                        placeholder="key"
                        className="h-8 rounded-md border-slate-200 bg-white text-sm text-slate-700 shadow-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                      <Input
                        value={row.value}
                        onChange={handleRowChange(setParams, row.id, 'value')}
                        placeholder="value"
                        className="h-8 rounded-md border-slate-200 bg-white text-sm text-slate-700 shadow-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                      <Input
                        value={row.description}
                        onChange={handleRowChange(setParams, row.id, 'description')}
                        placeholder="description"
                        className="h-8 rounded-md border-slate-200 bg-white text-sm text-slate-700 shadow-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRow(setParams, row.id)}
                        className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="headers" className="mt-0">
            <div className="space-y-3">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white">Request Headers</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Custom headers sent with the request.</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => handleAddRow(setHeaders)}>
                  Add Header
                </Button>
              </div>

              <div className="overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
                <div className="grid gap-3 bg-slate-50 px-3 py-2 text-[11px] font-medium text-slate-400 dark:bg-slate-900/40 dark:text-slate-500 sm:grid-cols-[24px_1fr_1fr_1fr_90px]">
                  <span />
                  <span>Header</span>
                  <span>Value</span>
                  <span>Description</span>
                  <span className="text-right">Action</span>
                </div>
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {headers.map((row) => (
                    <div key={row.id} className="grid gap-3 px-3 py-2 sm:grid-cols-[24px_1fr_1fr_1fr_90px]">
                      <input
                        type="checkbox"
                        checked={row.enabled}
                        onChange={handleToggleRow(setHeaders, row.id)}
                        className="mt-2 h-4 w-4 rounded border-slate-300 text-slate-900 dark:border-slate-700"
                      />
                      <Input
                        value={row.key}
                        onChange={handleRowChange(setHeaders, row.id, 'key')}
                        placeholder="Header"
                        className="h-8 rounded-md border-slate-200 bg-white text-sm text-slate-700 shadow-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                      <Input
                        value={row.value}
                        onChange={handleRowChange(setHeaders, row.id, 'value')}
                        placeholder="Value"
                        className="h-8 rounded-md border-slate-200 bg-white text-sm text-slate-700 shadow-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                      <Input
                        value={row.description}
                        onChange={handleRowChange(setHeaders, row.id, 'description')}
                        placeholder="description"
                        className="h-8 rounded-md border-slate-200 bg-white text-sm text-slate-700 shadow-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRow(setHeaders, row.id)}
                        className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="body" className="mt-0">
            <div className="space-y-3">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white">Request Body</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Payload for POST, PUT, or PATCH requests.</p>
                </div>
                <div className="inline-flex rounded-md border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-950">
                  {(['none', 'json', 'text'] as BodyType[]).map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setBodyType(type)}
                      className={`rounded-md px-3 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                        bodyType === type
                          ? 'bg-slate-900 text-white hover:bg-slate-900 dark:bg-white dark:text-slate-900'
                          : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              {bodyType === 'none' ? (
                <div className="rounded-md border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
                  This request does not include a body.
                </div>
              ) : (
                <Textarea
                  value={bodyText}
                  onChange={(event) => setBodyText(event.target.value)}
                  placeholder={bodyType === 'json' ? '{"name": "Ada"}' : 'Raw text body'}
                  className="min-h-[220px] rounded-md border-slate-200 bg-white font-mono text-xs text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  spellCheck={false}
                />
              )}
            </div>
          </TabsContent>

          <div className="rounded-md border border-dashed border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
            <div className="flex items-center justify-between gap-3">
              <span>Resolved URL</span>
              <span className="max-w-[60%] truncate font-mono text-slate-700 dark:text-slate-100">{requestUrl || '-'}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span>Body Type</span>
              <span className="font-mono text-slate-700 dark:text-slate-100">{bodyType}</span>
            </div>
          </div>
        </CardContent>
        </Tabs>
      </Card>

      <Card className="border-slate-200 shadow-none dark:border-slate-800">
        <Tabs defaultValue="body" className="space-y-0">
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base text-slate-900 dark:text-white">Response</CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                  Status, headers, and response body preview.
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className={`rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${statusTone}`}>
                  {response.status ? `${response.status}` : 'No status'}
                </span>
                <span>{response.timeMs ? `${response.timeMs} ms` : '-'}</span>
                <span>{response.size ? `${response.size} bytes` : '-'}</span>
              </div>
            </div>

            {response.error ? (
              <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200">
                {response.error}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2 text-xs dark:border-slate-800">
              <TabsList className="w-fit">
                {RESPONSE_TABS.map((tab) => (
                  <TabsTrigger key={tab} value={tab.toLocaleLowerCase()}>
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <Toggle
                variant={"outline"} 
                size={"sm"}
                onClick={() => setPrettyJson((prev) => !prev)}
                className='ml-auto cursor-pointer'>
                  Pretty JSON
              </Toggle>

            </div>
          </CardHeader>

        <CardContent>
          <TabsContent value="body" className="mt-0">
            <div className="rounded-md border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap break-words">
                {responseBodyHighlighted ? (
                    <code dangerouslySetInnerHTML={{ __html: responseBodyHighlighted }} />
                  ) : (
                    responseBodyView || 'Response body will appear here.'
                  )}
                </pre>
            </div>
          </TabsContent>

          <TabsContent value="headers" className="mt-0">
            <div className="rounded-md border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap break-words">
                {stringifyHeaders(response.headers) || 'Response headers will appear here.'}
                </pre>
              </div>
            </TabsContent>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleCopy('response body', response.body)}
            >
              <Copy size={12} />
              Copy Body
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleCopy('response headers', stringifyHeaders(response.headers))}
            >
              <Copy size={12} />
              Copy Headers
            </Button>
          </CardFooter>
        </Tabs>
      </Card>
    </section>
  );
}
