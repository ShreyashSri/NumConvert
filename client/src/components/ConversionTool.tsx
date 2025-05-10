import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, Code, Calculator, Terminal, Hash } from "lucide-react";
import { useToastCopy } from "@/hooks/use-toast-copy";
import { cn } from "@/lib/utils";
import { convertNumber, validateInput } from "@/lib/number-converter";
import { Badge } from "@/components/ui/badge";

type NumberSystem = "binary" | "decimal" | "octal" | "hexadecimal";

export function ConversionTool() {
  const [activeInputType, setActiveInputType] = useState<NumberSystem>("binary");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState({
    binary: "",
    decimal: "",
    octal: "",
    hexadecimal: "",
  });

  const { copyToClipboard } = useToastCopy();

  // Placeholder mapping for input field
  const placeholders: Record<NumberSystem, string> = {
    binary: "e.g. 10101",
    decimal: "e.g. 42",
    octal: "e.g. 52",
    hexadecimal: "e.g. 2A",
  };

  // Error messages for invalid inputs
  const errorMessages: Record<NumberSystem, string> = {
    binary: "Binary numbers can only contain 0 and 1",
    decimal: "Decimal numbers can only contain digits 0-9",
    octal: "Octal numbers can only contain digits 0-7",
    hexadecimal: "Hexadecimal numbers can only contain digits 0-9 and letters A-F",
  };

  // System icons
  const systemIcons: Record<NumberSystem, React.ReactNode> = {
    binary: <Code className="h-4 w-4" />,
    decimal: <Calculator className="h-4 w-4" />,
    octal: <Terminal className="h-4 w-4" />,
    hexadecimal: <Hash className="h-4 w-4" />,
  };

  // Handle input type change
  const handleInputTypeChange = (type: NumberSystem) => {
    setActiveInputType(type);
    setInputValue("");
    setError(null);
    clearResults();
  };

  // Handle input change
  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value === "") {
      setError(null);
      clearResults();
      return;
    }

    if (validateInput(value, activeInputType)) {
      setError(null);
      const convertedResults = convertNumber(value, activeInputType);
      setResults(convertedResults);
    } else {
      setError(errorMessages[activeInputType]);
      clearResults();
    }
  };

  // Clear input and results
  const clearInput = () => {
    setInputValue("");
    setError(null);
    clearResults();
  };

  // Clear results
  const clearResults = () => {
    setResults({
      binary: "",
      decimal: "",
      octal: "",
      hexadecimal: "",
    });
  };

  return (
    <section className="mb-8">
      <Card className="max-w-4xl mx-auto shadow-lg border-gray-200 dark:border-gray-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 pb-4">
          <CardTitle className="text-xl text-center font-bold text-gray-800 dark:text-gray-100">
            Number System Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 sm:p-8">
          {/* Input Selection */}
          <div className="mb-6">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
              Select Number System
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["binary", "decimal", "octal", "hexadecimal"] as const).map((type) => (
                <Button
                  key={type}
                  variant={activeInputType === type ? "default" : "outline"}
                  onClick={() => handleInputTypeChange(type)}
                  className={cn(
                    "font-medium text-sm transition-all duration-200 border border-gray-200 dark:border-gray-800",
                    activeInputType === type 
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md" 
                      : "hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
                  )}
                >
                  <span className="mr-2">{systemIcons[type]}</span>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Field */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="input-number" className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                Enter <Badge variant="secondary" className="ml-1 font-mono">
                  {activeInputType.toUpperCase()}
                </Badge> Value
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearInput}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Clear
              </Button>
            </div>
            <div className="relative">
              <Input
                type="text"
                id="input-number"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={placeholders[activeInputType]}
                className={cn(
                  "w-full py-5 px-4 rounded-lg font-mono text-lg transition-all duration-200 shadow-sm",
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-950/20"
                    : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-950"
                )}
                autoComplete="off"
              />
              {error && (
                <div className="absolute mt-1.5 text-red-500 dark:text-red-400 text-sm flex items-center">
                  <span className="bg-red-100 dark:bg-red-900/30 p-1 rounded-full mr-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Conversion Results */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-4">
              Conversion Results
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(["binary", "decimal", "octal", "hexadecimal"] as const)
                .filter((type) => type !== activeInputType)
                .map((type) => (
                  <div
                    key={type}
                    className={cn(
                      "bg-white dark:bg-gray-950 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-200",
                      results[type] ? "shadow-md" : "opacity-75"
                    )}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-900 mr-2">
                          {systemIcons[type]}
                        </span>
                        <h4 className="text-gray-700 dark:text-gray-300 font-medium">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </h4>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border-gray-200 dark:border-gray-800"
                        onClick={() => copyToClipboard(results[type])}
                        disabled={!results[type]}
                      >
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className={cn(
                      "font-mono text-md sm:text-lg mt-2 p-2 rounded bg-gray-50 dark:bg-gray-900 break-all min-h-[40px] flex items-center",
                      !results[type] && "text-gray-400 dark:text-gray-600"
                    )}>
                      {results[type] || "No result"}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
