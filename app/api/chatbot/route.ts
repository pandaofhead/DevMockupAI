import { StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Add system message if not present
    const finalMessages = messages[0]?.role === "system" 
      ? messages 
      : [
          { 
            role: "system", 
            content: "You are an interview coach for dev workers. You give suggestions to users about tech interview and resume preps." 
          }, 
          ...messages
        ];
    
    // Call OpenAI directly with streaming
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: finalMessages,
      temperature: 0.8,
      stream: true,
    });

    // Create a properly formatted stream for Vercel AI SDK
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        // Process each chunk from the OpenAI response
        for await (const chunk of response) {
          // Extract the content text
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            // Send as properly formatted text
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    // Return the properly formatted stream
    return new StreamingTextResponse(stream);
  } catch (e) {
    console.error("Chat error:", e);
    return Response.json({ error: e.message || "An error occurred" }, { status: 500 });
  }
}