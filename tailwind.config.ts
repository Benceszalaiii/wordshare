import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";
// gotta edit this to make it dynamic, ugh \\\\\\\\\\/

interface EventScheme {
    palette: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    border?: string;
}

const halloweenScheme: EventScheme = {
    palette: {
        50: "#fff8ec",
        100: "#ffefd3",
        200: "#ffdca5",
        300: "#ffc26d",
        400: "#ff9c32",
        500: "#ff7e0a",
        600: "#ff6500",
        700: "#cc4802",
        800: "#a1380b",
        900: "#82300c",
        950: "#461604",
    },
};

const xmasScheme: EventScheme = {
    palette: {
        50: "#fef2f2",
        100: "#fde8e6",
        200: "#fbd0d0",
        300: "#f8a9aa",
        400: "#f3797d",
        500: "#ea4952",
        600: "#d6283a",
        700: "#b01b2e",
        800: "#971a2e",
        900: "#811a2e",
        950: "#480914",
    },
};

const mainScheme: EventScheme = {
    palette: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
        950: "#2e1065",
    },
};

const currentScheme = () => {
    switch (process.env.EVENT) {
        case "HALLOWEEN":
            return halloweenScheme;
        case "XMAS":
            return xmasScheme;
        default:
            return mainScheme;
    }
};
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                main: {
                    ...currentScheme().palette,
                },
                beige: {
                    50: "#fefefc",
                    100: "#fcfcf7",
                    200: "#faf9f1",
                    300: "#f7f6e9",
                    400: "#f4f2e3",
                    500: "#ede8d0",
                    600: "#dccc9f",
                    700: "#c7a86e",
                    800: "#b69058",
                    900: "#a27b4f",
                    950: "#5d4327",
                },
                dark: "#090909",
                light: "#e4e8d5",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: currentScheme().border || "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
            backgroundImage: {
                "main-light": "url('/bg_light.webp')",
                "main-dark": "url('/bg_dark.webp')",
            },
            textShadow: {
                sm: "0 1px 2px var(--tw-shadow-color)",
                DEFAULT: "0 2px 4px var(--tw-shadow-color)",
                lg: "0 8px 16px var(--tw-shadow-color)",
                xl: "0 16px 32px var(--tw-shadow-color)",
            },
            fontFamily: {
                display: ["var(--font-sf)", "system-ui", "sans-serif"],
                default: ["var(--font-inter)", "system-ui", "sans-serif"],
                caveat: ["var(--font-caveat)", "system-ui", "cursive"],
            },
            animation: {
"shine": "shine 8s ease-in-out infinite",
                "fade-up": "fade-up 0.5s",
                "fade-down": "fade-down 0.5s",
                "slide-up-fade":
                    "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-down-fade":
                    "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            },
            keyframes: {
"shine": {
            from: { backgroundPosition: '200% 0' },
            to: { backgroundPosition: '-200% 0' },
          },
                "fade-up": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(10px)",
                    },
                    "80%": {
                        opacity: "0.6",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0px)",
                    },
                },
                "fade-down": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    "80%": {
                        opacity: "0.6",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0px)",
                    },
                },
                "slide-up-fade": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(6px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "slide-down-fade": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-6px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [
        plugin(function ({
            matchUtilities,
            theme,
        }: {
            matchUtilities: any;
            theme: any;
        }) {
            matchUtilities(
                {
                    "text-shadow": (value: any) => ({
                        textShadow: value,
                    }),
                },
                { values: theme("textShadow") },
            );
        }),
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        plugin(({ addVariant }: { addVariant: any }) => {
            addVariant("radix-side-top", '&[data-side="top"]');
            addVariant("radix-side-bottom", '&[data-side="bottom"]');
        }),
        require("tailwindcss-animate"),
    ],
} satisfies Config;
