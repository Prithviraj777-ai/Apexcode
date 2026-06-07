import * as React from "react";
import { cn } from "../../utils/cn";

const Tabs = ({ children, className, ...props }) => (
  <div className={cn("flex flex-col", className)} {...props}>
    {children}
  </div>
);

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center justify-start rounded-lg bg-[#080c14] p-1 text-slate-400 border border-slate-900/60 overflow-x-auto no-scrollbar",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className, value, activeValue, ...props }, ref) => {
  const isActive = value === activeValue;
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer duration-150 select-none",
        isActive
          ? "bg-slate-800 text-white shadow"
          : "hover:bg-slate-900 hover:text-slate-200 text-slate-400",
        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, value, activeValue, ...props }, ref) => {
  const isActive = value === activeValue;
  if (!isActive) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-in fade-in duration-200",
        className
      )}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
