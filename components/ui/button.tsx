import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow hover:bg-primary-600 focus-visible:ring-primary",
        destructive: "bg-red-500 text-white shadow hover:bg-red-600 focus-visible:ring-red-500",
        outline: "border border-neutral-200 bg-transparent text-neutral-900 hover:bg-neutral-100 focus-visible:ring-neutral-500 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800",
        secondary: "bg-neutral-100 text-neutral-900 shadow hover:bg-neutral-200 focus-visible:ring-neutral-500 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
        ghost: "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
        glass: "backdrop-blur-md bg-white/10 text-neutral-900 border border-white/20 hover:bg-white/20 focus-visible:ring-primary dark:text-neutral-100",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8",
        xl: "h-14 rounded-2xl px-10 text-lg",
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