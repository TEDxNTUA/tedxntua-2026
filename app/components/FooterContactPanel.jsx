'use client';

import { useState } from "react";

const EMAILS = [
  "tedxntua.developers@gmail.com",
  "tedxntua@gmail.com"
];

export default function FooterContactPanel() {
  const [copyState, setCopyState] = useState("");

  const mailtoHref = `mailto:${EMAILS[0]}?subject=${encodeURIComponent("TEDxNTUA Website Message")}`;

  async function handleCopyEmail(email) {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState(email);
      window.setTimeout(() => setCopyState(""), 1800);
    } catch {
      setCopyState("");
    }
  }

  return (
    <section className="flex flex-col items-start gap-4">
      <div className="text-lg font-medium tracking-wide text-white/90">
        Contact us:
      </div>

      <div className="flex w-full flex-col gap-2">
        {EMAILS.map((email) => (
          <div
            key={email}
            className="flex w-full h-10 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="min-w-0 text-sm text-white/70 break-all">
              {email}
            </div>
            <button
              type="button"
              onClick={() => handleCopyEmail(email)}
              className="shrink-0 rounded-full border border-white/20 px-3 py-2 text-xs font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white"
            >
              {copyState === email ? "Copied" : "Copy email"}
            </button>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-wrap items-center gap-3">
        <a
          href={mailtoHref}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-red-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-500"
        >
          Open email app
        </a>
      </div>
    </section>
  );
}
