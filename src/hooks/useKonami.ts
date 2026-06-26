"use client";

import { useEffect, useRef } from "react";

const KONAMI_SEQUENCE = [
  "l",
  "u",
  "c",
  "a",
];

/** Déclenche `onUnlock` quand le code Konami est saisi (luca). */
export function useKonami(onUnlock: () => void): void {
  const progress = useRef(0);
  const callback = useRef(onUnlock);
  callback.current = onUnlock;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === KONAMI_SEQUENCE[progress.current]) {
        progress.current += 1;
        if (progress.current === KONAMI_SEQUENCE.length) {
          progress.current = 0;
          callback.current();
        }
      } else {
        progress.current = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
