import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:from-blue-700 hover:to-blue-800 focus-visible:ring-blue-500 dark:from-blue-600 dark:to-blue-700 dark:shadow-blue-500/20",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:from-red-700 hover:to-red-800 focus-visible:ring-red-500 dark:from-red-600 dark:to-red-700 dark:shadow-red-500/20",
        outline:
          "border-2 border-zinc-200 bg-white text-zinc-900 shadow-sm hover:bg-zinc-50 hover:border-zinc-300 focus-visible:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:border-zinc-600",
        secondary:
          "bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-900 shadow-md hover:from-zinc-200 hover:to-zinc-300 focus-visible:ring-zinc-500 dark:from-zinc-800 dark:to-zinc-700 dark:text-zinc-100 dark:hover:from-zinc-700 dark:hover:to-zinc-600",
        ghost:
          "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-zinc-500 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
        link:
          "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:text-blue-300",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded-md px-3.5 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
