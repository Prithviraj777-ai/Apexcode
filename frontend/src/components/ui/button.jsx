import * as React from "react";
import { cn } from "../../utils/cn";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-98 duration-100 cursor-pointer";

    const variants = {
      default: "bg-indigo-600 text-white shadow hover:bg-indigo-500",
      destructive: "bg-red-600 text-white shadow-sm hover:bg-red-500",
      outline:
        "border border-slate-800 bg-[#0b0f19]/30 text-slate-200 shadow-sm hover:bg-slate-800 hover:text-white",
      secondary:
        "bg-slate-800 text-slate-100 shadow-sm hover:bg-slate-700",
      ghost: "hover:bg-slate-800/80 hover:text-white text-slate-400",
      link: "text-indigo-400 underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-lg px-8",
      icon: "h-9 w-9",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
