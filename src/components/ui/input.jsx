import * as React from "react"

import { cn } from "@/lib/utils"

// Pill-shaped like the buttons next to it; 16 px text so iOS Safari does
// not zoom in on focus; placeholder at 55% white (AA on the input fill).
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-full border border-hairline-strong bg-white/[0.04] px-5 text-base text-white transition-[border-color,background-color] duration-ui ease-out placeholder:text-white/55 hover:border-white/25 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-destructive",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
