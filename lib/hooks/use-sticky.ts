"use client";

import { useEffect, useRef, useState } from "react";

export default function useSticky(topValue: string) {
    const value = parseInt(topValue.split("-")[1]);
    const ref = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const observer = new IntersectionObserver(
            ([event]) => ref.current && setIsSticky(ref.current.clientTop < value * 4),
            { threshold: [1] },
        );
        observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return { ref, isSticky };
}
