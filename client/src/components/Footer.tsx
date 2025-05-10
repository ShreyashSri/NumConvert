import { Calculator, Github, Code, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-2 rounded-lg mr-3 shadow-md">
              <Calculator className="text-white h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              NumConvert
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a 
              href="#" 
              className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <Github className="h-4 w-4 mr-1" />
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm flex justify-center items-center">
            Built with 
            <Heart className="h-3 w-3 mx-1 text-red-500 fill-red-500" /> 
            A simple tool for number system conversion
          </p>
        </div>
      </div>
    </footer>
  );
}
