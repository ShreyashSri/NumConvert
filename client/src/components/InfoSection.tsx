import { Card, CardContent } from "@/components/ui/card";
import { Code, Calculator, Terminal, Hash } from "lucide-react";
import { motion } from "framer-motion";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  darkColor: string;
  examples?: string[];
  index: number;
}

function InfoCard({ title, icon, description, color, darkColor, examples = [], index }: InfoCardProps) {
  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      }
    }
  };

  const exampleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const exampleItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-800 overflow-hidden group backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
        <div className={`w-full h-2 ${color} ${darkColor}`}></div>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} ${darkColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2 text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
              </h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {examples.length > 0 && (
            <motion.div
              variants={exampleContainer}
              initial="hidden"
              animate="visible"
              className="mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3"
            >
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Examples:</p>
              <div className="flex flex-wrap gap-2">
                {examples.map((example, idx) => (
                  <motion.code
                    variants={exampleItem}
                    key={idx}
                    className="text-sm bg-white dark:bg-gray-800 px-3 py-1.5 rounded-md font-mono shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    {example}
                  </motion.code>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function InfoSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Number System Conversions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Learn how to convert between different number systems with our comprehensive guide.
          Each card explains the conversion process with detailed examples.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        <InfoCard
          index={0}
          title="Binary (Base-2)"
          icon={<Code className="h-6 w-6 text-white" />}
          color="bg-blue-500"
          darkColor="dark:bg-blue-600"
          description="Binary uses only 0s and 1s. Each position represents a power of 2 (2⁰, 2¹, 2², etc.).

Decimal to Binary:
• Repeatedly divide by 2 and collect remainders in reverse
• Example: 25 ÷ 2 = 12 r1, 12 ÷ 2 = 6 r0, 6 ÷ 2 = 3 r0, 3 ÷ 2 = 1 r1, 1 ÷ 2 = 0 r1 → 11001

Binary to Decimal:
• Multiply each digit by its position value (2⁰=1, 2¹=2, 2²=4, etc.)
• Add all results"
          examples={["1010₂ = (1×2³)+(0×2²)+(1×2¹)+(0×2⁰) = 8+0+2+0 = 10₁₀", "25₁₀ → 11001₂", "Binary digits: 0,1"]}
        />
        
        <InfoCard
          index={1}
          title="Decimal (Base-10)"
          icon={<Calculator className="h-6 w-6 text-white" />}
          color="bg-green-500"
          darkColor="dark:bg-green-600"
          description="Decimal is our standard counting system using digits 0-9. Each position represents a power of 10.

From Other Bases to Decimal:
• Binary: Multiply each digit by its power of 2 position and sum
• Octal: Multiply each digit by its power of 8 position and sum
• Hex: Multiply each digit by its power of 16 position and sum

To Decimal is often the first step when converting between other bases."
          examples={["Binary: 1010₂ = (1×8)+(0×4)+(1×2)+(0×1) = 10₁₀", "Octal: 17₈ = (1×8)+(7×1) = 15₁₀", "Hex: 1F₁₆ = (1×16)+(15×1) = 31₁₀"]}
        />
        
        <InfoCard
          index={2}
          title="Octal (Base-8)"
          icon={<Terminal className="h-6 w-6 text-white" />}
          color="bg-amber-500"
          darkColor="dark:bg-amber-600"
          description="Octal uses digits 0-7. Each position represents a power of 8.

Decimal to Octal:
• Repeatedly divide by 8 and collect remainders in reverse

Binary to Octal:
• Group binary digits in sets of 3 from right
• Convert each group to its decimal value (0-7)

Octal to Binary:
• Convert each octal digit to 3 binary digits"
          examples={["64₁₀ ÷ 8 = 8 r0, 8 ÷ 8 = 1 r0, 1 ÷ 8 = 0 r1 → 100₈", "Binary 101010₂ → 101|010 → 52₈", "Octal digits: 0,1,2,3,4,5,6,7"]}
        />
        
        <InfoCard
          index={3}
          title="Hexadecimal (Base-16)"
          icon={<Hash className="h-6 w-6 text-white" />}
          color="bg-purple-500"
          darkColor="dark:bg-purple-600"
          description="Hexadecimal uses 0-9 and A-F (A=10, B=11, C=12, D=13, E=14, F=15). Each position is a power of 16.

Decimal to Hex:
• Repeatedly divide by 16 and collect remainders in reverse
• Convert remainders > 9 to letters (10=A, 11=B, etc.)

Binary to Hex:
• Group binary digits in sets of 4 from right
• Convert each group to its hex value (0-F)

Hex to Binary:
• Convert each hex digit to 4 binary digits"
          examples={["255₁₀ ÷ 16 = 15 r15, 15 ÷ 16 = 0 r15 → FF₁₆", "Binary 1111 1111₂ → FF₁₆", "Hex digits: 0-9,A,B,C,D,E,F"]}
        />
      </div>
    </section>
  );
}