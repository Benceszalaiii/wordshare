"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface ComboSearchProps {
    onValueChange?: React.Dispatch<
        React.SetStateAction<{ value: number; label: string } | null | string>
    >;
    options: { value: number; label: string }[];
    onCreate?: React.Dispatch<React.SetStateAction<string | null>>;
}
export function ComboSearch({
    onValueChange,
    options,
    onCreate,
}: ComboSearchProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [query, setQuery] = React.useState("");
    const handleSelect = (currentValue: string, create: boolean = false) => {
        const newValue = currentValue === value ? "" : currentValue;
        if (create) {
            if (onCreate) {
                onCreate(newValue || null);
            }
        }
        else if (onValueChange) {
            onValueChange((newValue ? { label: newValue, value: options.find((item)=> item.label === newValue)?.value || 0 }: null));
        }
        setValue(newValue);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full max-w-md"
                >
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    <span className="truncate text-center">
                        {value
                            ? value
                            : "Select school..."}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="pointer-events-auto z-50 w-fit max-w-96 text-wrap p-0">
                <Command>
                    <CommandInput
                        placeholder="Search school..."
                        value={query}
                        onValueChange={(value: string) => setQuery(value)}
                    />
                    <CommandList>
                        <CommandEmpty asChild>
                            <Button
                                className="w-full text-neutral-600 dark:text-neutral-400"
                                variant={"ghost"}
                                onClick={() => {
                                    if (onCreate) {
                                        handleSelect(query, true);
                                    }
                                }}
                            >
                                {query}
                            </Button>
                        </CommandEmpty>
                        <CommandGroup>
                            {options.map((school) => (
                                <CommandItem
                                    key={school.value}
                                    value={school.label}
                                    onSelect={handleSelect}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === school.label
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {school.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
