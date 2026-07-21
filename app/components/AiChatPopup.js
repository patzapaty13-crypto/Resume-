"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, Minimalistic } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function AiChatPopup() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "ai",
      content: t.locale === "th" 
        ? "สวัสดีครับ! พวกเราคือผู้ช่วย AI ของทีม CR7XMESSI AND YAMAL CHAMPION มีอะไรให้พวกเราช่วยเหลือหรืออยากสอบถามเกี่ยวกับทีมและบริการ พิมพ์บอกได้เลยครับ 👋"
        : "Hello! We are the AI Assistant for CR7XMESSI AND YAMAL CHAMPION team. How can we help you today? 👋"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const sessionId = useRef(
    typeof window !== "undefined" 
      ? localStorage.getItem("ai_session_id") || `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
      : ""
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ai_session_id", sessionId.current);
    }
  }, []);

  // Listen for the custom event to open the chat from Navbar
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => window.removeEventListener("open-ai-chat", handleOpenChat);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isOpen]);

  const suggestedQuestions = t.locale === "th" 
    ? [
        "รับทำเว็บไซต์อะไรบ้าง?",
        "เรทราคาเริ่มต้นเท่าไหร่?",
        "Tech Stack ที่ใช้มีอะไรบ้าง?",
        "สนใจจ้างงาน ติดต่อได้ที่ไหน?"
      ]
    : [
        "What kind of websites do you build?",
        "What are your starting rates?",
        "What is your tech stack?",
        "How can I contact you?"
      ];

  const sendMessage = async (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Prepare chat history to send to n8n for context
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId.current,
          message: userMsg.content,
          history: history
        }),
      });

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content: data.reply || data.output || data.message || "Message received, but no reply text found in response."
        }
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content: t.locale === "th" ? "ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ" : "Sorry, there was an error connecting to the system."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4 border border-gray-200 transition-all duration-300 origin-bottom-right ${
          isOpen ? "opacity-100 scale-100 h-[500px] w-[350px] max-md:w-[calc(100vw-32px)] max-md:h-[60vh]" : "opacity-0 scale-75 h-0 w-[350px] pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-md z-10 relative">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Assistant</h3>
              <p className="text-[10px] text-gray-400">Powered by n8n Webhook</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#f8fafc] flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-2 max-w-[85%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
              <div className={`w-7 h-7 rounded-full flex shrink-0 items-center justify-center ${msg.role === "user" ? "bg-gray-200 text-gray-600" : "bg-primary/10 text-primary border border-primary/20"}`}>
                {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>
              <div className={`px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${
                msg.role === "user" 
                  ? "bg-gray-900 text-white rounded-tr-sm" 
                  : "bg-white text-gray-800 border border-gray-200 rounded-tl-sm whitespace-pre-line"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-2 max-w-[85%] self-start">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary border border-primary/20 flex shrink-0 items-center justify-center">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 rounded-tl-sm shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          )}
          
          {!isTyping && messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mt-2 pl-9">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  disabled={isTyping}
                  className="text-[12px] bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-colors text-left shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-200">
          <form onSubmit={handleSend} className="flex items-center gap-2 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.locale === "th" ? "พิมพ์ข้อความ..." : "Type a message..."}
              disabled={isTyping}
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`absolute right-1.5 p-1.5 rounded-full transition-all ${
                !inputValue.trim() || isTyping 
                  ? "text-gray-400 cursor-not-allowed" 
                  : "bg-primary text-white hover:bg-blue-600 shadow-sm"
              }`}
            >
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" strokeWidth={2.5} />}
            </button>
          </form>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gray-900 hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.2)] relative"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-in zoom-in fade-in duration-300" />
        ) : (
          <MessageSquare className="w-6 h-6 animate-in zoom-in fade-in duration-300" />
        )}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>
    </div>
  );
}
