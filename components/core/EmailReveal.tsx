"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const email = process.env.NEXT_PUBLIC_EMAIL || "";

export default function EmailReveal({ className }: { className: string }) {
    const [revealed, setRevealed] = useState(false);

    const onClick = () => {
        if (!revealed)
            setRevealed(true);
        if (typeof navigator !== "undefined" && navigator.clipboard)
            navigator.clipboard.writeText(email);
    }

    if (revealed) {
        return (
            <div className={cn(className, "text-center text-xl px-16 py-4 border bg-neutral-50 text-neutral-700")}>
                {email}
            </div>
        )
    }

    return (
        <button onClick={onClick} type="button" className={cn(className, "text-xl px-16 py-4 border bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition-colors")}>
            Click to Reveal Email
        </button>
    )
}