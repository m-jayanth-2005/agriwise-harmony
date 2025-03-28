
import { toast } from "@/hooks/use-toast";

// Gemini API key
const GEMINI_API_KEY = "AIzaSyBbi_BE5IRxogShso03CEn7REYpqroTD_U";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export interface GeminiMessage {
  role: "user" | "model";
  content: string;
}

export const generateGeminiResponse = async (
  messages: GeminiMessage[],
  systemPrompt: string = "You are an AI assistant for farmers. Provide helpful, educational, and actionable advice about farming, soil health, plant diseases, weather implications, and sustainable agricultural practices."
): Promise<string> => {
  try {
    // Format messages for Gemini API
    const formattedMessages = messages.map(message => ({
      role: message.role,
      parts: [{ text: message.content }]
    }));

    // Add system prompt as the first message if provided
    if (systemPrompt) {
      formattedMessages.unshift({
        role: "user",
        parts: [{ text: `System: ${systemPrompt}` }]
      });
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: formattedMessages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
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
