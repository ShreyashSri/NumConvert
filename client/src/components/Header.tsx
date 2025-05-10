import { Calculator } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 shadow-md py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-2 rounded-lg mr-3 shadow-md">
            <Calculator className="text-white h-6 w-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            NumConvert
          </h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
