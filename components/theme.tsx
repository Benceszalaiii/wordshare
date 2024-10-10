"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
// const ThemeSwitch = ({className}: {className?: string}) => {
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();

//   // useEffect only runs on the client, so now we can safely show the UI
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <select className={`bg-orange-200 rounded-2xl dark:bg-black ${className}`} value={theme} onChange={(e) => setTheme(e.target.value)}>
//       <option className="text-black dark:text-white" value="system">System</option>
//       <option className="text-black dark:text-white" value="dark">Dark</option>
//       <option className="" value="light">Light</option>
//     </select>
//   );
// };


const ThemeSwitch = ({className}: {className?: string}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }
  if (theme === "light") {
    return (<>
    <button name="dark-theme" aria-label="Switch to dark mode" onClick={()=> {setTheme("dark")}}>
      <SunIcon className={`w-6 h-6 text-gray-800 dark:text-white ${className}`} />
    </button>
    </>)
  }
  if (theme === "dark"){
    return (
      <>
      <button name="light-theme" aria-label="Switch to light mode" onClick={()=> {setTheme("light")}}>
<MoonIcon className={`w-6 h-6 text-gray-800 dark:text-white ${className}`} />
      </button>
      </>
    )
  }
  else{
    setTheme("light")
    return null;
  }
}
export default ThemeSwitch;