import { useMutation } from "@tanstack/react-query";
import { chatWithChapter } from "../../api/course/chatWithChapter";


export const useChatWithChapter = () => {
  return useMutation({
    mutationFn: chatWithChapter,
    onError: (error) => {
      console.error("Gagal mengirim pesan ke AI:", error);
    },
  });
};