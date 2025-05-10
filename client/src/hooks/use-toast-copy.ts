import { useToast } from "@/hooks/use-toast";

export function useToastCopy() {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        duration: 2000,
      });
    } catch (error) {
      console.error("Failed to copy text: ", error);
      toast({
        title: "Failed to copy!",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return { copyToClipboard };
}
