import type { ReactNode } from "react";

export default function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[10px] font-medium uppercase leading-4 tracking-[0.015em] text-[#64696f]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4285f4]" />
      {children}
    </p>
  );
}
