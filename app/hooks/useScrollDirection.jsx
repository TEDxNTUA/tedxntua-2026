import { useState, useEffect, useRef } from "react";

export function useScrollDirection({ threshold = 0 } = {}) {
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
    const handleScroll = () => {
        const currentY = window.scrollY;
        const isScrollingDown = currentY > lastScrollY.current;
        const passedThreshold = currentY > threshold;

        setIsHidden(isScrollingDown && passedThreshold);
        lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

return isHidden;
}