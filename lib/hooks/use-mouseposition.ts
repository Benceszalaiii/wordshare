import { useEffect, useState } from "react";

export const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const setFromEvent = (e: MouseEvent) =>{
            setPosition({ x: e.clientX - 56, y: e.clientY - 56});
        }
        window.addEventListener("mousemove", setFromEvent);
        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    }, []);

    return position;
};
