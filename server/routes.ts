import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

const numberSystemSchema = z.object({
  value: z.string(),
  from: z.enum(["binary", "decimal", "octal", "hexadecimal"]),
  to: z.enum(["binary", "decimal", "octal", "hexadecimal"]),
});

// Regular expressions for input validation
const validationPatterns = {
  binary: /^[01]+$/,
  decimal: /^[0-9]+$/,
  octal: /^[0-7]+$/,
  hexadecimal: /^[0-9A-Fa-f]+$/,
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Number conversion endpoint
  app.post("/api/convert", (req, res) => {
    try {
      const parseResult = numberSystemSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({
          error: "Invalid input",
          details: parseResult.error.format(),
        });
      }
      
      const { value, from, to } = parseResult.data;
      
      // Validate the input based on the source number system
      if (!validationPatterns[from].test(value)) {
        return res.status(400).json({
          error: `Invalid ${from} number`,
        });
      }
      
      let decimalValue: number;
      
      // Convert to decimal first
      switch (from) {
        case "binary":
          decimalValue = parseInt(value, 2);
          break;
        case "decimal":
          decimalValue = parseInt(value, 10);
          break;
        case "octal":
          decimalValue = parseInt(value, 8);
          break;
        case "hexadecimal":
          decimalValue = parseInt(value, 16);
          break;
      }
      
      if (isNaN(decimalValue)) {
        return res.status(400).json({
          error: "Conversion resulted in an invalid number",
        });
      }
      
      // Convert from decimal to target format
      let result: string;
      switch (to) {
        case "binary":
          result = decimalValue.toString(2);
          break;
        case "decimal":
          result = decimalValue.toString(10);
          break;
        case "octal":
          result = decimalValue.toString(8);
          break;
        case "hexadecimal":
          result = decimalValue.toString(16).toUpperCase();
          break;
      }
      
      return res.status(200).json({ 
        result,
        original: {
          value,
          from,
        },
        to,
      });
    } catch (error) {
      console.error("Conversion error:", error);
      return res.status(500).json({
        error: "An error occurred during conversion",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
