import { cn } from "@/lib/utils";

export function PhoneFrame({ src, alt, className, rotate = 0 }) {
  return (
    <div
      className={cn(
        "w-[180px] rounded-[2rem] border-4 border-neutral-800 bg-[#0D0F14] shadow-2xl overflow-hidden shrink-0",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <img src={src} alt={alt} className="w-full h-auto block" />
    </div>
  );
}
