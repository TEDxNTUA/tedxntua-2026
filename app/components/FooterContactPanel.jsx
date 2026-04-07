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
    <section className="flex flex-col items-start gap-3 sm:gap-4">
      <div className="text-base font-medium tracking-wide text-white/90 sm:text-lg">
        Contact us:
      </div>

      <div className="flex w-full flex-col gap-2">
        {EMAILS.map((email) => (
          <div
            key={email}
            className="flex w-full min-h-9 items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3"
          >
            <div className="min-w-0 text-xs text-white/70 break-all sm:text-sm">
              {email}
            </div>
            <button
              type="button"
              onClick={() => handleCopyEmail(email)}
              className="shrink-0 rounded-full border border-white/20 px-2 py-1 text-[10px] font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white sm:px-3 sm:py-2 sm:text-xs"
            >
              {copyState === email ? "Copied" : "Copy email"}
            </button>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3">
        <a
          href={mailtoHref}
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-red-600 px-4 text-xs font-semibold text-white transition-colors hover:bg-red-500 sm:min-h-11 sm:px-5 sm:text-sm"
        >
          Open email app
        </a>
      </div>
    </section>
  );
}
