"use client"

import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "secondary" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "block"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
          {
            default:
              "bg-[#2563eb] text-white shadow-[0_1px_2px_rgba(37,99,235,0.35),0_6px_16px_rgba(37,99,235,0.22)] hover:bg-[#1d4ed8] hover:-translate-y-px",
            secondary: "bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200",
            ghost: "bg-[#f1f5f9] text-slate-900 border border-slate-200 hover:bg-slate-200",
            outline:
              "border border-slate-200 bg-transparent text-slate-700 hover:bg-[#2563eb] hover:text-white",
          }[variant],
          {
            default: "px-5 py-2.5",
            sm: "px-3.5 py-2 text-sm",
            lg: "px-7 py-3.5 text-base",
            block: "w-full px-5 py-3",
          }[size],
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button }
