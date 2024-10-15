"use client";

import { useEffect, useState, useCallback } from "react";
import * as React from "react";

import { LayoutDashboard, EditIcon, List, HouseIcon, SquareSlashIcon, BlendIcon } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface Command{
  key: string;
  path: string;
  icon: React.ReactNode;
  title: string;
}
const iconstyles = "mr-2 h-4 w-4";
export const commands: Command[] = [
  {
    key: "o",
    path: "/overview",
    icon: <LayoutDashboard className={iconstyles} />,
    title: "Overview",
  },
  {
    key: "e",
    path: "/essay",
    icon: <EditIcon className={iconstyles} />,
    title: "Essays",
  },
  {
    key: "p",
    path: "/wordplay",
    icon: <BlendIcon className={iconstyles} />,
    title: "WordPlay",
  },
  {
    key: "/",
    path: "shortcuts",
    icon: <SquareSlashIcon className={iconstyles} />,
    title: "Shortcuts",
  },
  {
    key: "m",
    path: "/",
    icon: <HouseIcon className={iconstyles} />,
    title: "Landing page",
  }
]
export function CommandProvider() {
  const router = useRouter();
  const redirect = useCallback((path: string) => {
    router.push(path);
    setOpen(false);
  }, [router])
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case " ":
            e.preventDefault();
            setOpen((open) => !open);
            break;
          case "Backspace":
            e.preventDefault();
            router.back();
            break;
          default:
            const command = commands.find((c)=> c.key === e.key);
            if (command){
              e.preventDefault();
              redirect(command.path);
              toast(`Navigated to ${command.title} using shortcut`, {action: {label: "Undo", onClick: ()=>{router.back();}}, duration: 2500, richColors: true, position: "bottom-center"});
            }
            break;
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [redirect, router]);
  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {commands.map((command)=> {
              return (
                <CommandItem className="hover:cursor-pointer" asChild key={command.key}>
                  <div
                    onClick={() => {
                      redirect(command.path);
                    }}
                  >
                    {command.icon}
                    <span>{command.title}</span>
                    <CommandShortcut>⌘{command.key.toUpperCase()}</CommandShortcut>
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
