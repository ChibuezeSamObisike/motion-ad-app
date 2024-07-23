import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export class ResponseError extends Error {
  constructor(message: string, public response: Response) {
    super(message);
  }
}