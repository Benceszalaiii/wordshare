"use server";
import { Command, getCommands } from "@/components/layout/commandprovider";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SpaceIcon } from "lucide-react";

export default async function Page() {
    const commands = await getCommands();
    return (
        <div className="flex flex-col gap-4 pl-32">
            <h1 className="text-2xl font-semibold ">Shortcuts</h1>
            <Separator />
            <Label>Navigation</Label>
            <Alert className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-1 text-gray-800 dark:text-gray-400">
                    ⌘ <SpaceIcon className="h-4 w-4 border " />
                </div>
                <AlertTitle>Open Navigation Window</AlertTitle>
            </Alert>
            <Alert className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-1 text-gray-800 dark:text-gray-400">
                    ⌘B
                </div>
                <AlertTitle>
                    Toggle Sidebar (if sidebar is present on page)
                </AlertTitle>
            </Alert>
            <Separator />
            <Label>Quickly navigate to pages</Label>
            {commands.map((command: Command) => (
                <Alert
                    key={command.key}
                    className="flex flex-row items-center gap-4"
                >
                    <div className="text-gray-800 dark:text-gray-400">
                        ⌘{command.key.toUpperCase()}
                    </div>
                    <AlertTitle>Navigate to {command.title}</AlertTitle>
                </Alert>
            ))}
        </div>
    );
}
