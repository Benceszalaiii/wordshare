import localFont from "next/font/local";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const inter = localFont({
  src: "./Inter.ttf",
  variable: "--font-inter"
});

export const caveat = localFont({
  src: "../Caveat.ttf",
  variable: "--font-caveat",
  weight: "700"
});
