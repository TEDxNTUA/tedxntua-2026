"use client";

import React, { useState } from 'react';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { scheduleData } from '../../lib/calendarData';
import { createGoogleCalendarEvent, checkIfEventExists } from '../../lib/googleCalendarService';

export default function FullCalendarImportButton() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return (
      <div className="mb-12 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-yellow-300 text-xs font-bold uppercase tracking-widest">
        Configuration Missing: Google Client ID not found.
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <CalendarImportAction />
    </GoogleOAuthProvider>
  );
}

function CalendarImportAction() {
  const [status, setStatus] = useState('idle'); // idle | authenticating | importing | success | error
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await startImport(tokenResponse.access_token);
      } catch (err) {
        setStatus('error');
        setErrorMsg(err.message);
      }
    },
    onError: (error) => {
      setStatus('error');
      setErrorMsg('Login Failed: ' + error.error_description);
    },
    scope: 'https://www.googleapis.com/auth/calendar.events',
  });

  const startImport = async (accessToken) => {
    setStatus('importing');
    setProgress(0);

    const total = scheduleData.length;
    let createdCount = 0;

    for (let i = 0; i < total; i++) {
      const item = scheduleData[i];
      try {
        // Prevent duplicates
        const exists = await checkIfEventExists(accessToken, item);
        if (!exists) {
          await createGoogleCalendarEvent(accessToken, item);
        }
        createdCount++;
        setProgress(Math.round((createdCount / total) * 100));
        
        // Minor delay to avoid hitting rate limits too hard
        await new Promise(r => setTimeout(r, 150)); 
      } catch (err) {
        console.error(`Failed to create ${item.title}:`, err);
        // Continue with others even if one fails
      }
    }

    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000); // Reset after 5s
  };

  return (
    <div className="flex flex-col items-center md:items-start mb-12 gap-4">
      <button 
        onClick={() => status === 'idle' && login()}
        disabled={status === 'authenticating' || status === 'importing'}
        className={`
          group relative flex items-center gap-3 overflow-hidden rounded-xl border px-8 py-4 text-sm font-black uppercase tracking-[0.2em] transition-all active:scale-95
          ${status === 'success' 
            ? 'border-emerald-500 bg-emerald-500 text-white' 
            : status === 'error'
            ? 'border-red-500 bg-red-500/10 text-red-400'
            : 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-400/10 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]'
          }
          ${(status === 'importing' || status === 'authenticating') ? 'cursor-not-allowed opacity-70' : ''}
        `}
      >
        <span className="relative z-10 flex items-center gap-3">
          {(status === 'importing' || status === 'authenticating') ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : status === 'success' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          )}
          {status === 'authenticating' ? 'Authenticating...' : 
           status === 'importing' ? `Importing (${progress}%)` : 
           status === 'success' ? 'All Events Added!' :
           status === 'error' ? 'Failed - Try Again' :
           'Add Full Schedule to Google Calendar'}
        </span>
        
        {/* Progress Bar Background */}
        {status === 'importing' && (
          <div 
            className="absolute bottom-0 left-0 h-1 bg-emerald-400 transition-all duration-300" 
            style={{ width: `${progress}%` }} 
          />
        )}

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-emerald-400/50" />
        <div className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-emerald-400/50" />
        <div className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-emerald-400/50" />
        <div className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-emerald-400/50" />
      </button>

      {status === 'error' && (
        <p className="text-xs font-bold text-red-500 uppercase tracking-widest animate-pulse">
          {errorMsg}
        </p>
      )}

      {status === 'success' && (
        <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
          Check your Google Calendar for notifications!
        </p>
      )}

      <p className="max-w-xs text-[10px] text-white/30 uppercase tracking-[0.15em] font-medium text-center md:text-left leading-relaxed">
        Requires Google Login. Adds 20 separate events with 30m and 5m mobile reminders.
      </p>
    </div>
  );
}
