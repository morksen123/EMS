import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const buildFormDataFromFile = (file: File) => {
  let formData = new FormData();
  formData.append("files", file);

  return formData;
};

export const buildMediaStoragePath = (userId: string, fileName: string) => {
  const storagePath = userId + "/" + fileName;
  return storagePath;
};
