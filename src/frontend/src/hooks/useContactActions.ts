import { toast } from "sonner";

export function useContactActions(gpuName?: string) {
  const buyOnWhatsApp = () => {
    const msg = gpuName
      ? `Hi, I'm interested in buying ${gpuName} from TechDen Store`
      : "Hi, I'd like to browse your GPU inventory at TechDen Store";
    window.open(
      `https://wa.me/918638316552?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText("piush.6552@waaxis");
      toast.success("UPI ID copied!", {
        description: "piush.6552@waaxis copied to clipboard",
      });
    } catch {
      toast.error("Failed to copy. UPI: piush.6552@waaxis");
    }
  };

  const sendEmailInquiry = () => {
    const subject = gpuName ? `GPU Inquiry: ${gpuName}` : "GPU Inquiry";
    const body = gpuName
      ? `Hi, I'm interested in the ${gpuName} listed on TechDen Store. Please let me know more details.`
      : "Hi, I'm interested in purchasing a GPU from TechDen Store.";
    window.location.href = `mailto:vanquetty.exe@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return { buyOnWhatsApp, copyUpiId, sendEmailInquiry };
}
