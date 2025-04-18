
import { toast } from "@/hooks/use-toast";

// Gemini API key
const GEMINI_API_KEY = "AIzaSyBbi_BE5IRxogShso03CEn7REYpqroTD_U";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent";

export interface GeminiMessage {
  role: "user" | "model";
  content: string;
}

export const generateGeminiResponse = async (
  messages: GeminiMessage[],
  systemPrompt: string = "You are an AI assistant for farmers. Provide helpful, educational, and actionable advice about farming, soil health, plant diseases, weather implications, and sustainable agricultural practices."
): Promise<string> => {
  try {
    // Create a simplified request with just the latest user message for basic usage
    const latestUserMessage = messages.filter(msg => msg.role === "user").pop()?.content || "";
    
    // Basic prompt combining system instruction and user query
    const prompt = `${systemPrompt}\n\nUser query: ${latestUserMessage}`;
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(errorData.error?.message || "Failed to get response from Gemini API");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    toast({
      title: "AI Assistant Error",
      description: error instanceof Error ? error.message : "Failed to connect to AI assistant",
      variant: "destructive",
    });
    return "Sorry, I encountered an error. Please try again later.";
  }
};
