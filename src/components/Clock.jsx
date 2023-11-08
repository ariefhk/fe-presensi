"use client";

import useClock from "@/hooks/useClock";
import clsx from "clsx";

export default function Clock({ className }) {
    const { hours, minutes, day, monthName, year } = useClock();

    return (
        <section
            className={clsx("bg-white rounded-[12px] flex items-center h-[60px] justify-center gap-[22px] font-bold", className)}
        >
            <h1 className="text-[24px] leading-[20px] text-base-1 flex items-center gap-[4px]">
                <span>{hours}</span>
                <span>:</span>
                <span>{minutes}</span>
            </h1>
            <h1 className="text-base-1">
                <span>{day}</span> <span>{monthName}</span> <span>{year}</span>
            </h1>
        </section>
    );
}
