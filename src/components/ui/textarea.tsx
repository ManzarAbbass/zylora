"use client"

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

const Textarea = forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[88px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-[#2563eb] transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
