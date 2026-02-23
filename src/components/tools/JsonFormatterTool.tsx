'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { AlertCircle, ArrowUpRight, Check, CheckCircle2, Copy, FileDown, FileUp, Info, RotateCcw, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const exampleJson = `{
  "user": {
    "id": 1024,
    "name": "Aisha Khan",
    "email": "aisha.khan@example.com",
    "roles": ["admin", "editor"],
    "active": true
  },
  "project": {
    "name": "Toolbox",
    "version": "1.0.0",
    "tags": ["utilities", "web", "fast"],
    "settings": {
      "theme": "light",
      "notifications": {
        "email": true,
        "sms": false
      }
    }
  },
  "stats": [
    { "label": "users", "value": 1842 },
    { "label": "sessions", "value": 9843 }
  ]
}`;

type StatusType = 'idle' | 'success' | 'error' | 'info';

type StatusState = {
  type: StatusType;
  message: string;
};

type FormatResult = {
  output: string;
  isValid: boolean;
  error: string | null;
};

const tokenColors = {
  key: 'text-rose-600 dark:text-rose-300',
  string: 'text-emerald-600 dark:text-emerald-300',
  number: 'text-sky-600 dark:text-sky-300',
  boolean: 'text-violet-600 dark:text-violet-300',
  null: 'text-zinc-500 dark:text-zinc-400',
};

const escapeHtml = (input: string) =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const syntaxHighlight = (json: string) => {
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

const parseJson = (input: string): { value: unknown; error?: string; position?: number; line?: number; column?: number } => {
  try {
    const value = JSON.parse(input);
    return { value };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid JSON.';

    const lineColMatch = message.match(/line\s(\d+)\scolumn\s(\d+)/i);
    if (lineColMatch) {
      return {
        value: null,
        error: message,
        line: Number(lineColMatch[1]),
        column: Number(lineColMatch[2]),
      };
    }

    const positionMatch = message.match(/position\s(\d+)/i);
    if (positionMatch) {
      return {
        value: null,
        error: message,
        position: Number(positionMatch[1]),
      };
    }

    return { value: null, error: message };
  }
};

const indexToLineColumn = (text: string, index: number) => {
  let line = 1;
  let column = 1;
  for (let i = 0; i < Math.min(index, text.length); i += 1) {
    if (text[i] === '\n') {
      line += 1;
      column = 1;
    } else {
      column += 1;
    }
  }
  return { line, column };
};

const buildErrorMessage = (input: string, error: ReturnType<typeof parseJson>) => {
  if (!error.error) {
    return 'Invalid JSON.';
  }

  if (typeof error.line === 'number' && typeof error.column === 'number') {
    return `Invalid JSON at line ${error.line}, column ${error.column}. ${error.error}`;
  }

  if (typeof error.position === 'number') {
    const { line, column } = indexToLineColumn(input, error.position);
    return `Invalid JSON at line ${line}, column ${column}. ${error.error}`;
  }

  return `Invalid JSON. ${error.error}`;
};

const getErrorHint = (input: string, message: string | null) => {
  if (!message) {
    return null;
  }

  const hasSingleQuotes = /'[^']*'\s*:|:\s*'[^']*'/.test(input);
  if (hasSingleQuotes) {
    return 'JSON requires double quotes for keys and string values.';
  }

  const hasUnquotedKey = /[{,]\s*[A-Za-z_][A-Za-z0-9_]*\s*:/.test(input);
  if (hasUnquotedKey) {
    return 'JSON keys must be wrapped in double quotes (e.g., {"name": "asim"}).';
  }

  if (message.toLowerCase().includes('unexpected token')) {
    return 'Check for trailing commas or missing quotes around keys and values.';
  }

  return null;
};

const formatJson = (input: string, indent: string): FormatResult => {
  if (!input.trim()) {
    return { output: '', isValid: false, error: 'Input is empty.' };
  }

  const parsed = parseJson(input);
  if (parsed.error) {
    return { output: '', isValid: false, error: buildErrorMessage(input, parsed) };
  }

  const formatted = JSON.stringify(parsed.value, null, indent);
  return { output: formatted, isValid: true, error: null };
};

const minifyJson = (input: string): FormatResult => {
  if (!input.trim()) {
    return { output: '', isValid: false, error: 'Input is empty.' };
  }

  const parsed = parseJson(input);
  if (parsed.error) {
    return { output: '', isValid: false, error: buildErrorMessage(input, parsed) };
  }

  const minified = JSON.stringify(parsed.value);
  return { output: minified, isValid: true, error: null };
};

export default function JsonFormatterTool() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [status, setStatus] = useState<StatusState>({ type: 'idle', message: '' });
  const [indentSize, setIndentSize] = useState<'2' | '4' | 'tab'>('2');
  const [autoFormatOnPaste, setAutoFormatOnPaste] = useState(false);
  const [pendingPaste, setPendingPaste] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const indentValue = useMemo(() => (indentSize === 'tab' ? '\t' : Number(indentSize)), [indentSize]);

  const updateStatus = useCallback((type: StatusType, message: string) => {
    setStatus({ type, message });
  }, []);

  const handleFormat = useCallback(() => {
    const result = formatJson(inputValue, indentValue === '\t' ? '\t' : ' '.repeat(indentValue));
    setOutputValue(result.output);
    setError(result.error);
    setIsValid(result.isValid);
    if (result.isValid) {
      updateStatus('success', 'Formatted successfully.');
    } else {
      updateStatus('error', result.error ?? 'Unable to format JSON.');
    }
  }, [indentValue, inputValue, updateStatus]);

  const handleMinify = useCallback(() => {
    const result = minifyJson(inputValue);
    setOutputValue(result.output);
    setError(result.error);
    setIsValid(result.isValid);
    if (result.isValid) {
      updateStatus('success', 'Minified successfully.');
    } else {
      updateStatus('error', result.error ?? 'Unable to minify JSON.');
    }
  }, [inputValue, updateStatus]);

  const handleValidate = useCallback(() => {
    if (!inputValue.trim()) {
      setError('Input is empty.');
      setIsValid(false);
      updateStatus('error', 'Input is empty.');
      return;
    }

    const parsed = parseJson(inputValue);
    if (parsed.error) {
      const message = buildErrorMessage(inputValue, parsed);
      setError(message);
      setIsValid(false);
      updateStatus('error', message);
      return;
    }

    setError(null);
    setIsValid(true);
    updateStatus('success', 'JSON is valid.');
  }, [inputValue, updateStatus]);

  const handleCopy = useCallback(async () => {
    const valueToCopy = outputValue || inputValue;
    if (!valueToCopy.trim()) {
      updateStatus('info', 'Nothing to copy yet.');
      return;
    }

    try {
      await navigator.clipboard.writeText(valueToCopy);
      updateStatus('success', 'Copied to clipboard.');
    } catch {
      updateStatus('error', 'Unable to copy. Please copy manually.');
    }
  }, [inputValue, outputValue, updateStatus]);

  const handleClear = useCallback(() => {
    setInputValue('');
    setOutputValue('');
    setError(null);
    setIsValid(false);
    updateStatus('info', 'Cleared input and output.');
  }, [updateStatus]);

  const handleExample = useCallback(() => {
    setInputValue(exampleJson);
    setOutputValue('');
    setError(null);
    setIsValid(false);
    updateStatus('info', 'Example JSON loaded.');
  }, [updateStatus]);

  const handleDownload = useCallback(() => {
    const valueToDownload = outputValue || inputValue;
    if (!valueToDownload.trim()) {
      updateStatus('info', 'Nothing to download yet.');
      return;
    }

    const blob = new Blob([valueToDownload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'toolbox.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    updateStatus('success', 'Downloaded JSON file.');
  }, [inputValue, outputValue, updateStatus]);

  const handleUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const text = typeof reader.result === 'string' ? reader.result : '';
        setInputValue(text);
        setOutputValue('');
        setError(null);
        setIsValid(false);
        updateStatus('info', `Loaded ${file.name}.`);
      };
      reader.onerror = () => {
        updateStatus('error', 'Unable to read file.');
      };
      reader.readAsText(file);
      event.target.value = '';
    },
    [updateStatus]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(event.target.value);
      if (error) {
        setError(null);
      }
      setIsValid(false);
      setStatus({ type: 'idle', message: '' });
    },
    [error]
  );

  const handlePaste = useCallback(() => {
    if (autoFormatOnPaste) {
      setPendingPaste(true);
    }
  }, [autoFormatOnPaste]);

  useEffect(() => {
    if (pendingPaste) {
      setPendingPaste(false);
      handleFormat();
    }
  }, [handleFormat, pendingPaste]);

  const statusTone = useMemo(() => {
    if (status.type === 'success') return 'success';
    if (status.type === 'error') return 'error';
    if (status.type === 'info') return 'info';
    return 'idle';
  }, [status.type]);

  const statusIcon = useMemo(() => {
    if (statusTone === 'success') return CheckCircle2;
    if (statusTone === 'error') return AlertCircle;
    if (statusTone === 'info') return Info;
    return Sparkles;
  }, [statusTone]);

  const statusMessage = status.message || 'Ready to format JSON.';  
  const errorHint = useMemo(() => getErrorHint(inputValue, error), [error, inputValue]);
  const highlightedOutput = useMemo(() => (outputValue ? syntaxHighlight(outputValue) : ''), [outputValue]);

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-600 dark:text-sky-300">
            <Sparkles size={12} />
            JSON Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">JSON Formatter</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Format, validate, and minify JSON without sending your data anywhere. Everything runs locally in your browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Client-side
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No tracking
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Fast
          </Badge>
        </div>
      </div>

      <Card className="rounded-lg border border-slate-200/70 bg-white/90 shadow-none dark:border-slate-700 dark:bg-slate-900/70">
        <CardContent className="grid gap-0 divide-y divide-slate-200/70 p-0 dark:divide-slate-700 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="json-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Input JSON
              </Label>
              <span className="text-xs text-slate-400">{inputValue.length.toLocaleString()} chars</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-2">
                <span>Indent</span>
                <select
                  className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[0.65rem] text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  value={indentSize}
                  onChange={(event) => setIndentSize(event.target.value as '2' | '4' | 'tab')}
                >
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                  <option value="tab">Tab</option>
                </select>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-700"
                  checked={autoFormatOnPaste}
                  onChange={(event) => setAutoFormatOnPaste(event.target.checked)}
                />
                <span>Auto format on paste</span>
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleUpload}
                className="h-8 rounded-md border-slate-200 bg-white text-[0.65rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                <FileUp size={12} />
                Upload
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <Textarea
              id="json-input"
              value={inputValue}
              onChange={handleInputChange}
              onPaste={handlePaste}
              className="min-h-[340px] bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
              placeholder="Paste JSON here..."
              aria-label="JSON input"
              spellCheck={false}
            />

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={handleFormat}
                size="sm"
                className="h-9 rounded-md bg-sky-600 text-xs font-semibold uppercase tracking-[0.25em] text-white hover:scale-100 active:scale-100 hover:bg-sky-500"
              >
                Format
                <ArrowUpRight size={12} />
              </Button>
              <Button
                type="button"
                onClick={handleMinify}
                variant="outline"
                size="sm"
                className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                Minify
              </Button>
              <Button
                type="button"
                onClick={handleValidate}
                variant="outline"
                size="sm"
                className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                Validate
                {isValid ? <Check size={12} className="text-emerald-500" /> : null}
              </Button>
              <Button
                type="button"
                onClick={handleExample}
                variant="outline"
                size="sm"
                className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                Example
              </Button>
              <Button
                type="button"
                onClick={handleClear}
                variant="outline"
                size="sm"
                className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                <RotateCcw size={12} />
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="json-output" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Output
              </Label>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{outputValue.length.toLocaleString()} chars</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 rounded-md border-slate-200 bg-white text-[0.65rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <Copy size={12} />
                  Copy
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="h-8 rounded-md border-slate-200 bg-white text-[0.65rem] text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <FileDown size={12} />
                  Download
                </Button>
              </div>
            </div>

            <div
              className={`flex flex-wrap items-center justify-between gap-4 rounded-md border px-3 py-2 text-xs ${
                statusTone === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200'
                  : statusTone === 'error'
                  ? 'border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200'
                  : statusTone === 'info'
                  ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200'
                  : 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = statusIcon;
                  return <Icon size={14} />;
                })()}
                <span className="font-medium">{statusMessage}</span>
              </div>
              <div className="flex items-center gap-2 font-semibold uppercase tracking-[0.25em]">
                <span>Validity</span>
                <span
                  className={`rounded-md px-2 py-1 ${
                    isValid
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {isValid ? 'Valid' : 'Unknown'}
                </span>
              </div>
            </div>

            <div
              id="json-output"
              className="min-h-[340px] rounded-md bg-white/70 p-4 font-mono text-sm text-slate-700 shadow-none dark:bg-slate-950/40 dark:text-slate-100"
              aria-label="JSON output"
              role="textbox"
              aria-readonly="true"
            >
              {outputValue ? (
                <pre
                  className="max-h-[340px] whitespace-pre-wrap break-words"
                  dangerouslySetInnerHTML={{ __html: highlightedOutput }}
                />
              ) : (
                <span className="text-slate-400">Your formatted output will appear here.</span>
              )}
            </div>

            {error ? (
              <Card className="rounded-md border-rose-200 bg-rose-50 text-rose-600 shadow-none dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
                <CardContent className="flex items-start gap-2 p-3">
                  <AlertCircle size={16} className="mt-0.5" />
                  <div className="space-y-2 text-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]">Validation error</p>
                    <p>{error}</p>
                    {errorHint ? (
                      <div className="rounded-md border border-rose-200/60 bg-white/70 px-3 py-2 text-xs text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
                        {errorHint}
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
        <CardContent className="flex items-center gap-2 p-4 text-xs text-slate-500 dark:text-slate-400">
          <Info size={14} />
          All processing happens in your browser. Your data is never sent to a server.
        </CardContent>
      </Card>
    </section>
  );
}
