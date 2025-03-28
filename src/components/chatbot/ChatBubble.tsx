
import React from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, User } from "lucide-react";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

const ChatBubble = ({ message, isUser }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex items-start gap-2",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <div className={cn(
        "rounded-full p-2 flex-shrink-0",
        isUser ? "bg-soil-light" : "bg-plant-light"
      )}>
        {isUser ? (
          <User className="h-5 w-5 text-soil-dark" />
        ) : (
          <MessageSquare className="h-5 w-5 text-plant-dark" />
        )}
      </div>
      <div
        className={cn(
          "px-4 py-2 rounded-lg max-w-[80%]",
          isUser 
            ? "bg-soil-light text-soil-darker rounded-tr-none"
            : "bg-plant-light text-plant-darker rounded-tl-none"
        )}
      >
        {message.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < message.split("\n").length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatBubble;
