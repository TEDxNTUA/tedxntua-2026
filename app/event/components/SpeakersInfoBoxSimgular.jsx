"use client";
import { useState } from 'react';

const separtorLine = "sm:border-r sm:border-emerald-200/20";

export default function InfoBox({ time, name, title, itemColor, description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardBackground = itemColor || 'linear-gradient(135deg, rgba(6, 78, 59, 0.96), rgba(8, 47, 73, 0.96))';

  return (
    <button
      type="button"
      aria-expanded={isExpanded}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`group relative mb-4 flex w-full max-w-[720px] overflow-hidden rounded-[28px] border border-emerald-200/20 text-left shadow-[0_18px_55px_rgba(4,120,87,0.20)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-200/40 hover:shadow-[0_24px_65px_rgba(4,120,87,0.30)] active:translate-y-0 active:scale-[0.99] ${isExpanded ? 'ring-1 ring-emerald-300/30' : ''}`}
      style={{ background: cardBackground }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(167,243,208,0.20),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_28%)]" />

      <div className="relative flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:p-5 lg:p-6">
        <div className={`flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-white/10 px-4 py-3 text-white/90 backdrop-blur-sm sm:min-w-[132px] sm:flex-col sm:justify-center sm:px-5 sm:py-4 ${separtorLine}`}>
          <span className="text-[11px] uppercase tracking-[0.28em] text-emerald-100/80">Time</span>
          <span className="text-base font-semibold sm:text-lg">{time}</span>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-4 text-white">
          <div className="space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-100/75">Speaker</p>
                <h3 className="mt-1 text-xl font-semibold leading-tight sm:text-2xl">{name}</h3>
              </div>

              <span className={`rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-emerald-50 transition-colors duration-300 ${isExpanded ? 'bg-emerald-300/20 text-white' : 'text-emerald-50/80'}`}>
                {isExpanded ? 'Hide details' : 'Tap for details'}
              </span>
            </div>

            <p className="max-w-3xl text-sm leading-6 text-emerald-50/88 sm:text-[15px]">
              {isExpanded ? `"${title}"` : title}
            </p>

            <div className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="min-h-0">
                <p className="pt-1 text-sm leading-6 text-white/80 sm:text-[15px]">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end text-xs uppercase tracking-[0.28em] text-emerald-100/70">
            <span className="rounded-full border border-white/10 bg-black/10 px-3 py-2 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/10">
              {isExpanded ? 'Tap to collapse' : 'Tap to expand'}
            </span>
          </div>
        </div>
      </div>
    </button>);

}
