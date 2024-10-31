"use server";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { getCommands, Command } from "@/components/layout/commandprovider";
import { DeleteIcon, SpaceIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export default async function Page() {
  const commands = await getCommands();
  return (
    <div className="pl-32 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold ">Shortcuts</h1>
      <Separator />
      <Label>Navigation</Label>
      <Alert className="flex flex-row gap-4 items-center">
             <div className="text-gray-800 dark:text-gray-400 flex flex-row items-center gap-1">⌘ <SpaceIcon className="w-4 h-4 border " /></div>
            <AlertTitle>Open Navigation Window</AlertTitle>
        </Alert>
        <Alert className="flex flex-row gap-4 items-center">
             <div className="text-gray-800 dark:text-gray-400 flex flex-row items-center gap-1">⌘B</div>
            <AlertTitle>Toggle Sidebar (if sidebar is present on page)</AlertTitle>
        </Alert>
        <Separator />
        <Label>Quickly navigate to pages</Label>
      {commands.map((command: Command) => (
        <Alert key={command.key} className="flex flex-row gap-4 items-center">
             <div className="text-gray-800 dark:text-gray-400">⌘{command.key.toUpperCase()}</div>
            <AlertTitle>Navigate to {command.title}</AlertTitle>
        </Alert>
      ))}
    </div>
  );
}
