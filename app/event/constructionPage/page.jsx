"use client";
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import EventPageShell from "../components/EventPageShell";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const eventTabs = [
{ 
label: "Speakers", 
path: "/event/speakers", 
icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
)
},
{ 
label: "Performances", 
path: "/event/performances", 
icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
    </svg>
)
},
{ 
label: "Professional Workshops", 
path: "/event/professionalWorkshops", 
icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
)
},
{ 
label: "Experience Workshops", 
path: "/event/experienceWorkshops", 
icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
)
},
{ 
label: "Side Happenings", 
path: "/event/sideHappenings", 
icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
)
},
{
label: "Sponsors",
path: "/sponsors",
icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    </svg>
)
}
];

export default function ProgramPage() {
return (
<EventPageShell 
    title="Program"
    description="The program is under construction and will be available soon. Stay tuned for updates!"
>
    <AnchorScrollHandler />
    
    {/* This wrapper is the key.
    'basis-full' forces a new line in a flex container.
    'w-full' ensures it spans the whole width.
    */}
    <div className=" flex flex-col gap-4 w-64 p-4 basis-full w-full flex justify-center items-center">
    <div className="text-lg font-semibold">Check out more event information here!</div>
    <ConstrEventSidebar visible={true} /> 
    </div>

</EventPageShell>
);
}


export function ConstrEventSidebar({ visible }) {
const pathname = usePathname();
const [mounted, setMounted] = useState(false);

useEffect(() => {
setMounted(true);
}, []);

if (!visible || !mounted) return null;

return (
// Changed to flex-col and fixed width for sidebar feel
<div className="flex flex-col gap-4 w-64 p-4">
    {eventTabs.map((tab) => {
    const isActive = pathname === tab.path;
    return (
        <Link
        key={tab.path}
        href={tab.path}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all ${
            isActive
            ? "bg-emerald-500 border-emerald-400 shadow-lg translate-x-2"
            : "bg-white/5 border-white/10 hover:bg-white/20"
        }`}
        >
        {/* Icon Container */}
        <div className={`w-6 h-6 flex-shrink-0 ${isActive ? "text-slate-900" : "text-white/80"}`}>
            {tab.icon}
        </div>

        {/* Label - showing the name/label from your list item */}
        <span
            className={`font-medium text-sm ${
            isActive ? "text-slate-900" : "text-white/90"
            }`}
        >
            {tab.label}
        </span>
        </Link>
    );
    })}
</div>
);
}