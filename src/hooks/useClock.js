import { useEffect, useMemo, useState } from "react";

export default function useClock() {
    const now = new Date();

    const daysOfWeek = useMemo(() => {
        return ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    }, []);

    const months = useMemo(() => {
        return [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
    }, []);

    const [time, setTime] = useState({
        dayOfWeek: daysOfWeek[now.getDay()],
        day: String(now.getDate()).padStart(2, "0"),
        monthName: months[now.getMonth()],
        year: now.getFullYear(),
        hours: String(now.getHours()).padStart(2, "0"),
        minutes: String(now.getMinutes()).padStart(2, "0"),
        seconds: String(now.getSeconds()).padStart(2, "0"),
    });

    useEffect(() => {
        const clockIntervalId = setInterval(() => {
            const dateNow = new Date();
            setTime({
                dayOfWeek: daysOfWeek[dateNow.getDay()],
                day: String(dateNow.getDate()).padStart(2, "0"),
                monthName: months[dateNow.getMonth()],
                year: dateNow.getFullYear(),
                hours: String(dateNow.getHours()).padStart(2, "0"),
                minutes: String(dateNow.getMinutes()).padStart(2, "0"),
                seconds: String(dateNow.getSeconds()).padStart(2, "0"),
            });
        }, 1000);

        return () => clearInterval(clockIntervalId);
    }, [daysOfWeek, months]);

    return {
        daysOfWeek: time.dayOfWeek,
        day: time.day,
        monthName: time.monthName,
        year: time.year,
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds,
    };
}
