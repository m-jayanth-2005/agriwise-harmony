
import React, { useState, useRef, useEffect } from "react";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, X } from "lucide-react";
import { generateGeminiResponse, GeminiMessage } from "@/services/geminiService";
import ChatBubble from "./ChatBubble";
import { useToast } from "@/hooks/use-toast";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<GeminiMessage[]>([
    { role: "model", content: "Hello! I'm your AgriWise AI Assistant. How can I help with your farming questions today?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage: GeminiMessage = { role: "user", content: inputMessage.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      // Get only the last few messages to prevent context length issues
      const recentMessages = [...messages.slice(-3), userMessage];
      
      // Send messages to Gemini API
      const aiResponse = await generateGeminiResponse(recentMessages);
      
      // Add AI response to chat
      setMessages(prev => [...prev, { role: "model", content: aiResponse }]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI assistant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating button when drawer is closed */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-plant-dark hover:bg-plant-darker shadow-lg z-50"
          aria-label="Open chat assistant"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chatbot drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[85vh] max-h-[85vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-plant-dark" />
              AgriWise AI Assistant
            </DrawerTitle>
            <DrawerClose className="absolute right-4 top-4">
              <X className="h-4 w-4" />
            </DrawerClose>
          </DrawerHeader>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[60vh]">
            {messages.map((message, index) => (
              <ChatBubble 
                key={index} 
                message={message.content} 
                isUser={message.role === "user"} 
              />
            ))}
            <div ref={messagesEndRef} />
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-pulse text-sm text-muted-foreground">AI is thinking...</div>
              </div>
            )}
          </div>
          
          {/* Input area */}
          <DrawerFooter className="border-t">
            <div className="flex items-end gap-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about farming, soil health, plant diseases, etc..."
                className="flex-1 min-h-[80px] resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="h-10 w-10 p-0 bg-plant-dark hover:bg-plant-darker"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ChatBot;
