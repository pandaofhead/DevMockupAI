"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function ChatBot({ params }) {
  const { user } = useUser();
  const imageScr = user?.imageUrl;
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chatbot",
    onError: (error) => {
      console.error("Chat error:", error);
    },
    onFinish: (message) => {
      console.log("Chat finished:", message);
    },
    body: {
      // Additional configuration for the chat
      config: {
        temperature: 0.8,
      }
    }
  });

  const chatParent = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatParent.current) {
      const scrollContainer = chatParent.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="p-6 w-full">
      <div className="flex flex-col justify-start w-full h-96 max-h-dvh">
        <header className="py-2 w-full max-w-3xl mx-auto">
          <h1 className="text-xl font-bold">
            Chat with your AI interview coach
          </h1>
        </header>
        <section className="pb-4">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-3xl mx-auto items-center"
          >
            <Input
              className="flex-1 min-h-[40px]"
              placeholder="How can I improve my resume?"
              type="text"
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <Button className="ml-2" type="submit" disabled={isLoading || !input}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </form>
        </section>
        <section className="container px-0 flex flex-col flex-grow gap-4 mx-auto max-w-3xl border-2 rounded-md">
          <ul
            ref={chatParent}
            className="h-[400px] p-4 flex-grow rounded-lg overflow-y-auto flex flex-col gap-4"
          >
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Start a conversation with your AI interview coach
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="animate-fade-in">
                  {message.role === "user" ? (
                    <li className="flex flex-row-reverse">
                      {imageScr && (
                        <img 
                          src={imageScr} 
                          alt="User" 
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div className="rounded-xl p-4 bg-blue-400 shadow-md flex ml-2">
                        <p className="text-white">{message.content}</p>
                      </div>
                    </li>
                  ) : (
                    <li className="flex flex-row">
                      <Bot className="w-8 h-8" />
                      <div className="rounded-xl p-4 shadow-md flex w-3/4 ml-2 bg-gray-100">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </li>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center justify-center">
                <div className="animate-pulse">Thinking...</div>
              </div>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
