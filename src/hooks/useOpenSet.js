import { useState } from "react";

// A set of open keys (accordions where several items may be open at once).
export function useOpenSet(initial = []) {
  const [open, setOpen] = useState(() => new Set(initial));
  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  return [open, toggle];
}
