import { useEffect, useRef, useState } from "react";

export function useTypingSequence(lines: string[], characterDelay = 55, pause = 380) {
  const [visible, setVisible] = useState(() => lines.map(() => ""));
  const [activeLine, setActiveLine] = useState(0);
  const linesKey = lines.join("\u0000");
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const sequence = linesRef.current;
    setVisible(sequence.map(() => ""));
    setActiveLine(0);

    const later = (callback: () => void, delay: number) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (!cancelled) callback();
      }, delay);
      timers.add(timer);
    };

    const typeLine = (lineIndex: number, characterIndex: number) => {
      if (cancelled) return;

      setActiveLine(lineIndex);
      setVisible((current) => {
        const next = [...current];
        next[lineIndex] = sequence[lineIndex].slice(0, characterIndex + 1);
        return next;
      });

      if (characterIndex + 1 < sequence[lineIndex].length) {
        later(() => typeLine(lineIndex, characterIndex + 1), characterDelay);
      } else if (lineIndex + 1 < sequence.length) {
        later(() => typeLine(lineIndex + 1, 0), pause);
      } else {
        later(() => setActiveLine(-1), pause);
      }
    };

    later(() => typeLine(0, 0), 180);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [characterDelay, linesKey, pause]);

  return { visible, activeLine };
}
