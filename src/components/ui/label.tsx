"use client"

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "mb-1.5 block text-sm font-medium text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  ),
)
Label.displayName = "Label"

export { Label }
