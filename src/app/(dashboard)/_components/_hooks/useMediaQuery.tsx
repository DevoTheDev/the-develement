"use client"
import { useEffect, useState } from "react";

const useMediaQuery = (query: string = "(min-width: 768px)"): boolean => {
    // Initialize state with the current media query match status
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false; // Default to false on server-side rendering
    });

    useEffect(() => {
        // Ensure window.matchMedia is available (client-side only)
        if (typeof window === "undefined") return;

        const mediaQueryList = window.matchMedia(query);

        // Update state when the media query status changes
        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Set initial state
        setMatches(mediaQueryList.matches);

        // Add event listener for media query changes
        mediaQueryList.addEventListener("change", handleChange);

        // Cleanup: remove event listener on unmount
        return () => {
            mediaQueryList.removeEventListener("change", handleChange);
        };
    }, [query]); // Re-run effect if the query changes

    return matches;
};

export default useMediaQuery;