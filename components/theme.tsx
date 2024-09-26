"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = ({className}: {className?: string}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <select className={`bg-orange-200 rounded-2xl dark:bg-black ${className}`} value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option className="text-black dark:text-white" value="system">System</option>
      <option className="text-black dark:text-white" value="dark">Dark</option>
      <option className="" value="light">Light</option>
    </select>
  );
};

export default ThemeSwitch;

