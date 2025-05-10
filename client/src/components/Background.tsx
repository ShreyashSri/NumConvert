import { useEffect, useState } from "react";

export function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 transition-colors duration-500"></div>
      
      {/* Binary Pattern */}
      <BinaryPattern />
      
      {/* Floating Shapes */}
      <FloatingShapes />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/20 bg-[length:30px_30px] opacity-20 dark:opacity-10"></div>
    </div>
  );
}

function BinaryPattern() {
  const [binaryData, setBinaryData] = useState<string[]>([]);
  
  useEffect(() => {
    // Generate binary pattern on component mount
    const data = Array.from({ length: 80 }, () => 
      Array.from({ length: 120 }, () => Math.random() > 0.5 ? '1' : '0').join('')
    );
    setBinaryData(data);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10">
      <div className="absolute -rotate-12 text-gray-800 dark:text-gray-200 font-mono text-[10px] tracking-tight leading-none whitespace-pre select-none">
        {binaryData.map((line, i) => (
          <div key={i} className="mb-2">{line}</div>
        ))}
      </div>
    </div>
  );
}

function FloatingShapes() {
  // Light mode shapes (softer, pastel colors)
  const lightShapes = [
    { size: "8rem", posX: "5%", posY: "20%", animation: "floatSlow", opacity: "0.05", rotate: "15deg", shape: "rounded-full bg-blue-300" },
    { size: "6rem", posX: "85%", posY: "50%", animation: "floatMedium", opacity: "0.07", rotate: "-10deg", shape: "rounded-lg bg-indigo-300" },
    { size: "12rem", posX: "60%", posY: "15%", animation: "floatFast", opacity: "0.03", rotate: "30deg", shape: "rounded-full bg-green-300" },
    { size: "10rem", posX: "30%", posY: "80%", animation: "floatSlow", opacity: "0.04", rotate: "-5deg", shape: "rounded-lg bg-purple-300" },
    { size: "16rem", posX: "85%", posY: "85%", animation: "floatMedium", opacity: "0.06", rotate: "45deg", shape: "rounded-full bg-violet-300" },
  ];
  
  // Dark mode shapes (deeper, richer colors)
  const darkShapes = [
    { size: "8rem", posX: "5%", posY: "20%", animation: "floatSlow", opacity: "0.07", rotate: "15deg", shape: "rounded-full bg-blue-600" },
    { size: "6rem", posX: "85%", posY: "50%", animation: "floatMedium", opacity: "0.1", rotate: "-10deg", shape: "rounded-lg bg-indigo-600" },
    { size: "12rem", posX: "60%", posY: "15%", animation: "floatFast", opacity: "0.05", rotate: "30deg", shape: "rounded-full bg-green-600" },
    { size: "10rem", posX: "30%", posY: "80%", animation: "floatSlow", opacity: "0.06", rotate: "-5deg", shape: "rounded-lg bg-purple-600" },
    { size: "16rem", posX: "85%", posY: "85%", animation: "floatMedium", opacity: "0.08", rotate: "45deg", shape: "rounded-full bg-violet-600" },
  ];
  
  return (
    <>
      {/* Light mode shapes */}
      <div className="absolute inset-0 overflow-hidden dark:opacity-0 transition-opacity duration-500">
        {lightShapes.map((shape, index) => (
          <div
            key={index}
            className={`absolute ${shape.shape} animate-${shape.animation} blur-3xl`}
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.posX,
              top: shape.posY,
              opacity: shape.opacity,
              transform: `rotate(${shape.rotate})`,
            }}
          />
        ))}
      </div>
      
      {/* Dark mode shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-0 dark:opacity-100 transition-opacity duration-500">
        {darkShapes.map((shape, index) => (
          <div
            key={index}
            className={`absolute ${shape.shape} animate-${shape.animation} blur-4xl`}
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.posX,
              top: shape.posY,
              opacity: shape.opacity,
              transform: `rotate(${shape.rotate})`,
            }}
          />
        ))}
      </div>
    </>
  );
}