import { z } from "zod";

// Define schemas for number conversion
export const numberConversionSchema = z.object({
  value: z.string(),
  from: z.enum(["binary", "decimal", "octal", "hexadecimal"]),
  to: z.enum(["binary", "decimal", "octal", "hexadecimal"]),
});

export type NumberConversion = z.infer<typeof numberConversionSchema>;

// Number system type
export type NumberSystem = "binary" | "decimal" | "octal" | "hexadecimal";
