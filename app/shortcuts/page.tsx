"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { commands, Command } from "@/components/layout/commandprovider";
export default function Page() {
  return (
    <div className="pl-32">
      <h1 className="text-2xl font-semibold ">Shortcuts</h1>
      {commands.map((command: Command) => (
        <Alert key={command.key} className="flex flex-row gap-4 items-center">
             <div className="text-gray-800 dark:text-gray-400">⌘{command.key.toUpperCase()}</div>
            <AlertTitle>Navigate to {command.title}</AlertTitle>
        </Alert>
      ))}
    </div>
  );
}
