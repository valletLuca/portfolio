"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type ScrollReveal<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  isVisible: boolean;
};

/**
 * Observe un élément et passe `isVisible` à true quand il entre dans le
 * viewport (une seule fois — le parchemin ne se ré-enroule pas).
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.2): ScrollReveal<T> {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
