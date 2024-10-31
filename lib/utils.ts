import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ms from "ms";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export function countWords(str: string) {
  const inp = str.trim();
  return inp.split(/\s+/).length;
}

export interface Essay {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
}
export function removeClassFromName(name: string){
  const pattern = new RegExp("^\\d{1,2}(\\/\\d{1,2})?[A-Z]?_");
  return name.replace(pattern, "").replaceAll("_", " ").trim();
}
export function getInitials(name: string | undefined | null) {
  if (!name) return "";
  const compressed = removeClassFromName(name);
  return compressed
    .split(" ")
    .map((n) => n[0]).slice(0, 2)
    .join("");
}
  /**
   * Returns the elevation of the user based on the role
   * @param role: string | null | undefined   Role of user
   * @returns number       Elevation level of user
   * Admin = 3
   * Teacher = 2
   * Student = 1
   * No role/unknown role = 0
  */
export function getUserElevation(role: string|null|undefined): number{

  switch(role){
    case "admin":
      return 3
    case "teacher":
      return 2
    case "student":
      return 1
    default:
      return 0
  }
}

export function langParse(str: string){
  const codetolanguage = [
    { code: "en", language: "English" },
    { code: "hu", language: "Hungarian" },
    { code: "de", language: "German" },
  ];
  const lang = codetolanguage.find((x) => x.code === str);
  return lang?.language || str;
}

export function decodeSectionTitle(section: string){
  if (section === "rc"){
    return "Revise & Check";
  }
  let sectionWithoutNumber = section.slice(0, 2);
  const cases = [{case: "ce", decoded: "Colloquial English"}, {case: "pe", decoded: "Practical English"}];
  return `${cases.find(x => x.case === sectionWithoutNumber)?.decoded} ${section.at(2)}` || `File ${section}`;
}


export function dateToLocalTime(date: Date){
  return new Date(date.getTime() + date.getTimezoneOffset())
}