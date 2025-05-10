type NumberSystem = "binary" | "decimal" | "octal" | "hexadecimal";

// Regular expressions for input validation
const validationPatterns = {
  binary: /^[01]*$/,
  decimal: /^[0-9]*$/,
  octal: /^[0-7]*$/,
  hexadecimal: /^[0-9A-Fa-f]*$/,
};

/**
 * Validates if the input string is valid for the specified number system
 * @param value - The input string to validate
 * @param type - The number system type
 * @returns boolean indicating if the input is valid
 */
export function validateInput(value: string, type: NumberSystem): boolean {
  return validationPatterns[type].test(value);
}

/**
 * Converts a number from one system to all other systems
 * @param value - The input string to convert
 * @param fromType - The source number system
 * @returns An object containing conversions to all number systems
 */
export function convertNumber(value: string, fromType: NumberSystem) {
  if (!value) {
    return {
      binary: "",
      decimal: "",
      octal: "",
      hexadecimal: "",
    };
  }

  try {
    let decimalValue: number;

    // Convert to decimal first (our intermediate representation)
    switch (fromType) {
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
      throw new Error("Invalid conversion");
    }

    // Convert from decimal to all target formats
    return {
      binary: decimalValue.toString(2),
      decimal: decimalValue.toString(10),
      octal: decimalValue.toString(8),
      hexadecimal: decimalValue.toString(16).toUpperCase(),
    };
  } catch (error) {
    console.error("Conversion error:", error);
    return {
      binary: "",
      decimal: "",
      octal: "",
      hexadecimal: "",
    };
  }
}
