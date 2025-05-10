import { Card, CardContent } from "@/components/ui/card";
import { Code, Calculator, Terminal, Hash } from "lucide-react";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  darkColor: string;
  examples?: string[];
}

function InfoCard({ title, icon, description, color, darkColor, examples = [] }: InfoCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-800 overflow-hidden group">
      <div className={`w-full h-1.5 ${color} ${darkColor}`}></div>
      <CardContent className="p-5">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color} ${darkColor} mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2 text-lg">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          {description}
        </p>
        {examples.length > 0 && (
          <div className="mt-2 bg-gray-50 dark:bg-gray-900 rounded-md p-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Examples:</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, index) => (
                <code key={index} className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded font-mono">
                  {example}
                </code>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function InfoSection() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        Understanding Number Systems
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <InfoCard
          title="Binary"
          icon={<Code className="h-5 w-5 text-white" />}
          color="bg-blue-500"
          darkColor="dark:bg-blue-600"
          description="Base-2 number system using only 0 and 1. Used in computing as it represents the on/off states of electronic circuits."
          examples={["1010 = 10", "1111 = 15", "10000 = 16"]}
        />
        
        <InfoCard
          title="Decimal"
          icon={<Calculator className="h-5 w-5 text-white" />}
          color="bg-green-500"
          darkColor="dark:bg-green-600"
          description="Base-10 number system (0-9) used in everyday mathematics. The standard number system for human calculation."
          examples={["42", "255", "1000"]}
        />
        
        <InfoCard
          title="Octal"
          icon={<Terminal className="h-5 w-5 text-white" />}
          color="bg-amber-500"
          darkColor="dark:bg-amber-600"
          description="Base-8 number system using digits 0-7. Historically used in computing for file permissions and some machine code."
          examples={["644 = 420", "777 = 511", "10 = 8"]}
        />
        
        <InfoCard
          title="Hexadecimal"
          icon={<Hash className="h-5 w-5 text-white" />}
          color="bg-purple-500"
          darkColor="dark:bg-purple-600"
          description="Base-16 number system using digits 0-9 and letters A-F. Used for colors in web development and memory addressing."
          examples={["FF = 255", "A9 = 169", "2A = 42"]}
        />
      </div>
    </section>
  );
}
