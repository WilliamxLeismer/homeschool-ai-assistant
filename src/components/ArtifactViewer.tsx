"use client";

import ReactMarkdown from "react-markdown";
import { markdownFilename } from "@/lib/artifacts/downloadMarkdown";
import type { GeneratedArtifact } from "@/workflows/types";

export function ArtifactViewer({ artifact }: { artifact: GeneratedArtifact }) {
  async function copyMarkdown() {
    await navigator.clipboard.writeText(artifact.markdown);
  }

  function downloadMarkdown() {
    const blob = new Blob([artifact.markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = markdownFilename(artifact.title);
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <article className="artifact">
      <div className="artifact-actions no-print">
        <button className="button secondary" type="button" onClick={copyMarkdown}>Copy Markdown</button>
        <button className="button secondary" type="button" onClick={downloadMarkdown}>Download Markdown</button>
        <button className="button secondary" type="button" onClick={() => window.print()}>Print</button>
      </div>
      <div className="markdown-body">
        <ReactMarkdown>{artifact.markdown}</ReactMarkdown>
      </div>
    </article>
  );
}
