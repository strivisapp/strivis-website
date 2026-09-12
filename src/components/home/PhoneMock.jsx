import { cn } from "@/lib/utils";

export function PhoneMock({ variant = "dashboard", className, rotate = 0 }) {
  return (
    <div
      className={cn(
        "w-[180px] aspect-[9/19] rounded-[2rem] border-4 border-neutral-800 bg-[#0D0F14] shadow-2xl overflow-hidden shrink-0",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="h-5 flex items-center justify-center">
        <div className="w-16 h-3 rounded-full bg-black" />
      </div>

      {variant === "dashboard" && (
        <div className="px-3 pt-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-2 w-14 rounded-full bg-white/20" />
            <div className="h-5 w-5 rounded-full bg-[#FF4400]" />
          </div>
          <div className="flex justify-center py-2">
            <div className="relative w-20 h-20 rounded-full border-[6px] border-[#FF4400]/25">
              <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-[#FF4400] border-r-[#FF4400] rotate-45" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 rounded-lg bg-white/[0.06] border border-white/10" />
            <div className="h-12 rounded-lg bg-white/[0.06] border border-white/10" />
          </div>
          <div className="h-14 rounded-lg bg-white/[0.06] border border-white/10" />
          <div className="h-14 rounded-lg bg-white/[0.06] border border-white/10" />
        </div>
      )}

      {variant === "workout" && (
        <div className="px-3 pt-2 space-y-2.5">
          <div className="h-2 w-20 rounded-full bg-white/20 mb-3" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg bg-white/[0.06] border border-white/10 p-2 flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="h-1.5 w-16 rounded-full bg-white/25" />
                <div className="h-1.5 w-10 rounded-full bg-white/15" />
              </div>
              <div className="h-5 w-5 rounded-full bg-[#FF4400]/25 border border-[#FF4400]" />
            </div>
          ))}
          <div className="h-9 rounded-lg bg-[#FF4400] mt-3" />
        </div>
      )}
    </div>
  );
}
