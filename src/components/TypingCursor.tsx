export function TypingCursor({ visible }: { visible: boolean }) {
  return visible ? (
    <span className="typing-cursor" aria-hidden="true">
      |
    </span>
  ) : null;
}
