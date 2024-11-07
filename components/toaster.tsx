"use client";

import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme } = useTheme();
    const mobileview = useIsMobile();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            richColors={true}
            style={mobileview ? { marginBottom: "24px" } : {}}
            containerAriaLabel="Toaster"
            {...props}
        />
    );
};

export { Toaster };
