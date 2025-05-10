import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConversionTool } from "@/components/ConversionTool";
import { InfoSection } from "@/components/InfoSection";
import { Background } from "@/components/Background";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background with animations and patterns */}
      <Background />
      
      {/* Main content */}
      <Header />
      
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 z-10">
        {/* Hero Section */}
        <section className="mb-8 text-center py-8">
          <div className="inline-block mb-3 bg-white/80 dark:bg-gray-800/80 p-2 px-4 rounded-full backdrop-blur-sm">
            <span className="text-xs font-semibold tracking-wider bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent uppercase">
              Fast • Accurate • Simple
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Number System Converter
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
            Convert between Binary, Decimal, Octal, and Hexadecimal number systems instantly.
            Simply enter a value and get conversions to all other formats.
          </p>
        </section>

        <ConversionTool />
        <InfoSection />
      </main>
      
      <Footer />
    </div>
  );
}
