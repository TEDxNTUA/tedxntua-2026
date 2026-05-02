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
    <section className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-red-600">Get in touch</h4>
        <p className="text-xs font-medium text-white/60">Questions? We're here to help.</p>
      </div>

      <div className="flex flex-col gap-2">
        {EMAILS.map((email) => (
          <div
            key={email}
            className="group/item flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3 transition-all hover:border-white/10 hover:bg-white/[0.06]"
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[8px] font-bold uppercase tracking-wider text-white/50">Email</span>
              <span className="truncate text-xs font-bold text-white/80">{email}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopyEmail(email)}
              className="flex h-7 items-center justify-center rounded-lg border border-white/10 px-3 text-[9px] font-black uppercase tracking-widest text-white/50 transition-all hover:bg-white hover:text-black active:scale-95"
            >
              {copyState === email ? "Done" : "Copy"}
            </button>
          </div>
        ))}
      </div>

      <a
        href={mailtoHref}
        className="group relative flex h-10 w-full items-center justify-center overflow-hidden rounded-xl bg-red-600 font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] active:scale-[0.98]"
      >
        <span className="relative z-10 text-[10px]">Launch Mailer</span>
      </a>
    </section>
  );
}
