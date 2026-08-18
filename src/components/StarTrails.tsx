import { useEffect, useState, type CSSProperties } from "react";

type Trail = { id: number; top: number; duration: number; length: number };

export function StarTrails() {
  const [trails, setTrails] = useState<Trail[]>([]);

  useEffect(() => {
    let nextId = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const removals = new Set<ReturnType<typeof setTimeout>>();

    const schedule = () => {
      timeout = setTimeout(
        () => {
          const id = nextId++;
          const duration = 1.7 + Math.random() * 0.8;
          setTrails((current) =>
            current.length >= 2
              ? current
              : [
                  ...current,
                  {
                    id,
                    top: 4 + Math.random() * 24,
                    duration,
                    length: 110 + Math.random() * 65,
                  },
                ],
          );

          const removal = setTimeout(
            () => {
              setTrails((current) => current.filter((trail) => trail.id !== id));
              removals.delete(removal);
            },
            duration * 1000 + 100,
          );
          removals.add(removal);
          schedule();
        },
        2400 + Math.random() * 3600,
      );
    };

    schedule();
    return () => {
      clearTimeout(timeout);
      removals.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="star-trails" aria-hidden="true">
      {trails.map((trail) => (
        <span
          key={trail.id}
          className="star-trail"
          style={
            {
              top: `${trail.top}%`,
              width: `${trail.length}px`,
              animationDuration: `${trail.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
