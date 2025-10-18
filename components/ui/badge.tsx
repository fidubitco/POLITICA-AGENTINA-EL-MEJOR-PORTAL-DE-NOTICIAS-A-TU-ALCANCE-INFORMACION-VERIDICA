import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 focus:ring-blue-500",
        secondary:
          "border-transparent bg-gradient-to-r from-zinc-100 to-zinc-200 text-zinc-900 shadow-sm hover:shadow-md focus:ring-zinc-500 dark:from-zinc-800 dark:to-zinc-700 dark:text-zinc-100",
        destructive:
          "border-transparent bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 focus:ring-red-500",
        outline:
          "border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-50 focus:ring-zinc-500 dark:border-zinc-700 dark:text-zinc-300 dark:bg-zinc-900 dark:hover:bg-zinc-800",
        success:
          "border-transparent bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30 focus:ring-green-500",
        warning:
          "border-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md shadow-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/30 focus:ring-yellow-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
