import * as React from "react";
import { cn } from "../../utils/cn";

function Badge({ className, variant = "default", ...props }) {
  const baseStyles =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none";

  const variants = {
    default:
      "border-transparent bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    secondary:
      "border-transparent bg-slate-800 text-slate-300",
    outline: "text-slate-200 border-slate-700",
    success:
      "border-transparent bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning:
      "border-transparent bg-amber-500/10 text-amber-400 border-amber-500/20",
    error:
      "border-transparent bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export { Badge };
export default Badge;
