"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypeWriterProps = {
  text: string;
  /** Millisecondes entre chaque lettre. */
  speed?: number;
  startDelay?: number;
  showCaret?: boolean;
  className?: string;
};

/** Effet machine à écrire / terminal, lettre par lettre. */
export function TypeWriter({
  text,
  speed = 45,
  startDelay = 400,
  showCaret = true,
  className = "",
}: TypeWriterProps) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (reduceMotion) {
      setCount(text.length);
      return;
    }
    let index = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setCount(index);
        if (index >= text.length && interval) {
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [text, speed, startDelay, reduceMotion]);

  return (
    <span className={className}>
      {/* Texte complet réel pour lecteurs d'écran / agents — pas d'aria-label
          sur un span générique (interdit par la spec ARIA). */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {showCaret && (
        <span aria-hidden="true" className="animate-caret-blink">
          ▌
        </span>
      )}
    </span>
  );
}
