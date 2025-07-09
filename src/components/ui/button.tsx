
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Convert Tailwind classes to inline styles for consistency
    const getInlineStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        whiteSpace: 'nowrap',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        textDecoration: 'none'
      }

      const sizeStyles: React.CSSProperties = {
        ...(size === 'sm' && { height: '36px', padding: '0 12px' }),
        ...(size === 'lg' && { height: '44px', padding: '0 32px' }),
        ...(size === 'icon' && { height: '40px', width: '40px', padding: '0' }),
        ...(!size || size === 'default') && { height: '40px', padding: '8px 16px' }
      }

      const variantStyles: React.CSSProperties = {
        ...(variant === 'outline' && {
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          color: 'hsl(var(--foreground))'
        }),
        ...(variant === 'ghost' && {
          backgroundColor: 'transparent',
          color: 'hsl(var(--foreground))'
        }),
        ...(variant === 'secondary' && {
          backgroundColor: 'hsl(var(--secondary))',
          color: 'hsl(var(--secondary-foreground))'
        }),
        ...(!variant || variant === 'default') && {
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))'
        }
      }

      return {
        ...baseStyles,
        ...sizeStyles,
        ...variantStyles,
        ...style
      }
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === 'outline') {
        e.currentTarget.style.backgroundColor = 'hsl(var(--accent))'
      } else if (variant === 'ghost') {
        e.currentTarget.style.backgroundColor = 'hsl(var(--accent))'
      } else if (variant === 'secondary') {
        e.currentTarget.style.opacity = '0.8'
      } else {
        e.currentTarget.style.opacity = '0.9'
      }
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === 'outline') {
        e.currentTarget.style.backgroundColor = 'hsl(var(--background))'
      } else if (variant === 'ghost') {
        e.currentTarget.style.backgroundColor = 'transparent'
      } else {
        e.currentTarget.style.opacity = '1'
      }
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={getInlineStyles()}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
