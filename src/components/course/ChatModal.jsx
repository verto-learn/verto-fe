import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Loader2 } from "lucide-react";
import MarkdownContent from "./MarkdownContent";
import { useChatWithChapter } from "../../hooks/course/useChatWithChapter";
// Pastikan component ini sudah ada

export const ChatModal = ({ isOpen, onClose, chapterId, chapterTitle }) => {
  const [input, setInput] = useState("");
  // State pesan awal
  const [messages, setMessages] = useState([
    { role: "ai", content: `Halo! Saya siap bantu jelaskan materi tentang **"${chapterTitle}"**. Ada yang mau ditanyakan?` }
  ]);
  
  const messagesEndRef = useRef(null);
  
  // Panggil hook mutasi
  const { mutate, isPending } = useChatWithChapter();

  // Auto scroll ke bawah saat ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim() || isPending) return;

    const userQuestion = input;
    
    // 1. Tambahkan pesan user ke UI
    setMessages((prev) => [...prev, { role: "user", content: userQuestion }]);
    setInput("");

    // 2. Kirim ke API
    mutate(
      { chapterId, question: userQuestion },
      {
        onSuccess: (data) => {
          // Backend return: { status: "success", data: { answer: "..." } }
          const aiAnswer = data?.data?.answer || "Maaf, saya tidak menemukan jawaban.";
          setMessages((prev) => [...prev, { role: "ai", content: aiAnswer }]);
        },
        onError: () => {
          setMessages((prev) => [...prev, { role: "ai", content: "Maaf, terjadi kesalahan saat menghubungi AI." }]);
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 w-full max-w-2xl h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">AI Tutor</h3>
              <p className="text-xs text-gray-400 truncate max-w-[200px]">{chapterTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/90">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} />
                </div>
              )}

              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user" 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700"
              }`}>
                {msg.role === "ai" ? (
                   <MarkdownContent content={msg.content} />
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}
          
          {/* Loading Indicator */}
          {isPending && (
            <div className="flex gap-3 justify-start">
               <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mt-1">
                  <Bot size={16} />
                </div>
                <div className="bg-gray-800 border border-gray-700 px-4 py-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-700 bg-gray-800/30">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya sesuatu tentang materi ini..."
              className="w-full bg-gray-900 text-white border border-gray-600 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500"
              disabled={isPending}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isPending}
              className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};