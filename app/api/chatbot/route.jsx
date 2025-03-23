import { StreamingTextResponse } from "ai";
import { chatSession } from "@/utils/GeminiAIModal";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Extract the messages from the request
    const { messages } = await req.json();
    
    // Process the last message only, as we can't send the entire history in one go
    const lastMessage = messages.at(-1);
    
    if (!lastMessage) {
      return Response.json({ error: "No message provided" }, { status: 400 });
    }
    
    console.log("Sending message to Gemini:", lastMessage.content);
    
    // Send the message to Gemini with proper formatting
    const result = await chatSession.sendMessage({
      role: "user",
      parts: [{ text: lastMessage.content }]
    });
    
    if (!result || !result.response) {
      console.error("No response received from Gemini");
      return Response.json({ error: "No response from AI" }, { status: 500 });
    }
    
    const text = result.response.text();
    console.log("Received response from Gemini:", text);
    
    // Create a ReadableStream from the response text
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(text));
        controller.close();
      },
    });
    
    // Return the streaming response
    return new StreamingTextResponse(stream);
  } catch (e) {
    console.error("Gemini API Error:", e);
    console.error(e.stack);
    return Response.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
