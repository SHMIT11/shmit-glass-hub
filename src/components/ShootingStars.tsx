const trails = [
  { top: "6%", left: "-12%", delay: "0s", duration: "2.6s", scale: 1 },
  { top: "18%", left: "-18%", delay: "7.5s", duration: "3.2s", scale: 0.8 },
  { top: "32%", left: "-10%", delay: "13s", duration: "2.2s", scale: 1.15 },
  { top: "48%", left: "-16%", delay: "20s", duration: "3s", scale: 0.9 },
];

export function ShootingStars() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {trails.map((t, i) => (
        <span
          key={i}
          className="star-trail"
          style={{
            top: t.top,
            left: t.left,
            animationDelay: t.delay,
            animationDuration: t.duration,
            ["--trail-scale" as string]: String(t.scale),
          }}
        />
      ))}
    </div>
  );
}
