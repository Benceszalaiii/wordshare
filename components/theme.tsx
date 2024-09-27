"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
    <button onClick={()=> {setTheme("dark")}}>
    <svg className={`w-6 h-6 text-gray-800 dark:text-white ${className}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
</svg>

    </button>
    </>)
  }
  if (theme === "dark"){
    return (
      <>
      <button onClick={()=> {setTheme("light")}}>
      <svg className={`w-6 h-6 text-gray-800 dark:text-white ${className}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"/>
</svg>
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