'use client';

import { useCallback, useMemo, useState } from 'react';
import { Copy, FileDown, RefreshCw, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const SAMPLE_MARKDOWN = `# Markdown Preview

Type in the editor to see a live preview.

## Quick example

- Bold: **strong text**
- Italic: *emphasis*
- Inline code: \\"npm run dev\\"
- Link: [Visit Toolbox](https://codingwithasim.site)

### Task list

- [x] Write markdown
- [x] Preview instantly
- [ ] Ship it

### Code block

\`\`\`ts
const greet = (name: string) => \`Hello, \${name}\`;
console.log(greet('Asim'));
\`\`\`

### Table

| Feature | Status |
| --- | --- |
| Live preview | Ready |
| Client-side only | Ready |
| Copy / download | Ready |

> Markdown previews update as you type.`;

const markdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{children}</p>
  ),
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-sky-600 underline-offset-4 hover:underline dark:text-sky-300"
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-3 border-slate-200 pl-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300">
      {children}
    </blockquote>
  ),
  code: ({ children, className, inline }: { children: React.ReactNode; className?: string; inline?: boolean }) => {
    if (inline) {
      return (
        <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.8rem] text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {children}
        </code>
      );
    }

    return (
      <code className={`block font-mono text-[0.8rem] text-slate-800 dark:text-slate-200 ${className ?? ''}`}>
        {children}
      </code>
    );
  },
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="overflow-auto rounded-md bg-slate-100 p-4 text-xs text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-slate-200 dark:border-slate-700" />,
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-auto">
      <table className="w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-300">{children}</table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border-b border-slate-200 px-3 py-2 font-semibold dark:border-slate-700">{children}</th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border-b border-slate-100 px-3 py-2 dark:border-slate-800">{children}</td>
  ),
  input: ({ checked, type }: { checked?: boolean; type?: string }) => (
    <input
      type={type}
      defaultChecked={checked}
      className="mr-2 h-3.5 w-3.5 rounded border-slate-300 text-sky-600 dark:border-slate-700"
    />
  ),
};

export default function MarkdownPreviewTool() {
  const [markdown, setMarkdown] = useState('');

  const stats = useMemo(() => {
    const text = markdown.trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    return {
      words,
      characters: markdown.length,
      lines: markdown ? markdown.split('\n').length : 0,
    };
  }, [markdown]);

  const handleCopy = useCallback(() => {
    if (!markdown.trim()) {
      toast.info('Nothing to copy yet.');
      return;
    }

    navigator.clipboard.writeText(markdown).then(
      () => toast.success('Copied markdown.'),
      () => toast.error('Unable to copy. Please copy manually.')
    );
  }, [markdown]);

  const handleClear = useCallback(() => {
    setMarkdown('');
    toast.info('Cleared editor.');
  }, []);

  const handleSample = useCallback(() => {
    setMarkdown(SAMPLE_MARKDOWN);
    toast.info('Loaded sample markdown.');
  }, []);

  const handleDownload = useCallback(() => {
    if (!markdown.trim()) {
      toast.info('Nothing to download yet.');
      return;
    }

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'markdown-preview.md';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast.success('Downloaded markdown file.');
  }, [markdown]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            <Sparkles size={12} />
            Markdown Tool
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Markdown Preview</h1>
          <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Write markdown on the left and preview the rendered output instantly on the right. Everything runs locally in your browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Client-side
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Live preview
          </Badge>
          <Badge variant="outline" className="border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Offline ready
          </Badge>
        </div>
      </div>

      <Card className="rounded-xl border border-slate-200/70 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/70">
        <CardContent className="space-y-6 p-5">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              onClick={handleCopy}
              variant="outline"
              className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <Copy size={12} />
              Copy Markdown
            </Button>
            <Button
              type="button"
              onClick={handleDownload}
              variant="outline"
              className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <FileDown size={12} />
              Download
            </Button>
            <Button
              type="button"
              onClick={handleSample}
              variant="outline"
              className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              Sample
            </Button>
            <Button
              type="button"
              onClick={handleClear}
              variant="outline"
              className="h-9 rounded-md border-slate-200 bg-white text-xs text-slate-600 hover:scale-100 active:scale-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <RefreshCw size={12} />
              Clear
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="markdown-input" className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Markdown Input
              </Label>
              <Textarea
                id="markdown-input"
                value={markdown}
                onChange={(event) => setMarkdown(event.target.value)}
                placeholder="Type markdown here..."
                className="h-[450px] resize-none overflow-auto bg-white/70 font-mono text-sm text-slate-800 shadow-none focus-visible:ring-1 focus-visible:ring-sky-200 dark:bg-slate-950/40 dark:text-slate-100"
                spellCheck={false}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Preview
              </Label>
              <div className="h-[450px] overflow-auto rounded-md border border-slate-200 bg-white/70 p-4 shadow-none dark:border-slate-800 dark:bg-slate-950/40 [&_img]:max-w-full [&_img]:h-auto">
                {markdown.trim() ? (
                  <div className="space-y-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {markdown}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-sm text-slate-400">Preview will appear here.</div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white/70 p-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">Summary</div>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              <div className="flex items-center justify-between">
                <span>Words</span>
                <span className="font-semibold text-slate-700 dark:text-slate-100">{stats.words}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Characters</span>
                <span className="font-semibold text-slate-700 dark:text-slate-100">{stats.characters}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Lines</span>
                <span className="font-semibold text-slate-700 dark:text-slate-100">{stats.lines}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">What is Markdown?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Markdown is a lightweight formatting syntax that lets you write rich text using plain characters. It converts to HTML for
              websites, documentation, and notes.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">How to use this preview</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Type your markdown in the editor, and the preview updates instantly. Use the sample button to see supported syntax like
              tables, lists, and code blocks.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Common Markdown examples</h2>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><span className="font-mono"># Heading</span> - page title</li>
              <li><span className="font-mono">**bold**</span> - emphasized text</li>
              <li><span className="font-mono">`inline code`</span> - code snippet</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-slate-200 bg-white/90 shadow-none dark:border-slate-800 dark:bg-slate-900/60">
          <CardContent className="space-y-2 p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Why preview Markdown online</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A live preview helps you validate formatting before publishing documentation, blog posts, or README files. This tool runs
              locally, so your content stays private.
            </p>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
