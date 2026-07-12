"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, User, Bot } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user", content: string }[]>([
    { role: "bot", content: "Hi! I'm Thrilok's AI assistant. How can I help you today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedOptions = [
    { label: "Who is Thrilok?", response: "Thrilok is an MSc Data Science student at Christ University and Head of the Quantum Club. He specializes in Machine Learning, Generative AI, and Quantum Computing." },
    { label: "View Portfolio", response: "You can explore the projects and experience sections above to see his research and code." },
    { label: "Contact Thrilok", response: "Great! You can reach him directly at thrilokmanjunath@gmail.com", action: "mailto" }
  ];

  const handleOptionClick = (option: typeof predefinedOptions[0]) => {
    setMessages(prev => [...prev, { role: "user", content: option.label }]);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", content: option.response }]);
      if (option.action === "mailto") {
        window.location.href = "mailto:thrilokmanjunath@gmail.com?subject=Inquiry from Portfolio";
      }
    }, 600);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-card border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col"
            style={{ height: "450px", maxHeight: "80vh" }}
          >
            <div className="bg-brand-purple p-4 flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span className="font-heading font-semibold">Assistant</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 rounded-full" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-start space-x-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "bot" ? "bg-secondary text-brand-purple" : "bg-brand-purple text-white"}`}>
                      {msg.role === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-brand-purple text-white rounded-tr-none" : "bg-secondary text-foreground rounded-tl-none"}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-secondary/50 border-t border-border/40">
              <div className="flex flex-wrap gap-2 justify-center">
                {predefinedOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    className="text-xs px-3 py-1.5 rounded-full bg-background border border-border hover:border-brand-purple hover:text-brand-purple transition-colors"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-brand-purple text-white shadow-lg flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
