"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext(null);

const Tabs = ({ defaultValue, value, onValueChange, className, children, ...props }) => {
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue);
  
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleValueChange = React.useCallback((newValue) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
  }, [onValueChange]);

  return (
    <TabsContext.Provider value={{ selectedValue, onValueChange: handleValueChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
};

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-12 w-full items-center justify-center rounded-md p-1 text-muted-foreground border-2 border-gray-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const { selectedValue, onValueChange } = useTabsContext();
  
  return (
    <button
      ref={ref}
      className={cn(
        "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2.5 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        selectedValue === value && "bg-muted text-white shadow-sm",
        className
      )}
      onClick={() => onValueChange(value)}
      type="button"
      data-state={selectedValue === value ? "active" : "inactive"}
      {...props}
    >
      {children}
    </button>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const { selectedValue } = useTabsContext();
  
  if (selectedValue !== value) return null;
  
  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent } 