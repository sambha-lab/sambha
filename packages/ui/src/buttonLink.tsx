import Link, { LinkProps } from "next/link";
import { cn } from "../../../apps/web/utils/cn";

interface ButtonLinkProps extends LinkProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ButtonLink({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  ...props
}: ButtonLinkProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-white-base disabled:text-gray-base rounded-full py-3.5 px-5 whitespace-nowrap";

  const variants = {
    primary:
      "bg-[#F3F4F6] text-[#724ae5] border border-[#c46dfd] hover:text-primary-light hover:bg-gradient-to-b hover:from-[#c46dfd] hover:to-[#6745e1] focus-visible:ring-primary-dark",
    secondary:
      "bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] focus-visible:ring-[#F3F4F6]",
    outline:
      "border border-[#E5E7EB] bg-white text-[#374151] hover:bg-[#F9FAFB] focus-visible:ring-[#E5E7EB]",
    ghost: "text-[#374151] hover:bg-[#F9FAFB] focus-visible:ring-transparent",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-[3.125rem] text-base",
    lg: "h-[3.75rem] text-lg",
  };

  return (
    <Link
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Link>
  );
}