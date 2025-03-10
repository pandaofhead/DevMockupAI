"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import { useUser } from "@clerk/nextjs";
export default function ChatBot({ params }) {
  const { user } = useUser();
  const imageScr = user.imageUrl;
  // call the useChat hook
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chatbot",
    onError: (e) => {
      console.log(e);
    },
  });
  const chatParent = useRef(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

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
            {/* <Input id="resume" type="file" /> */}
            <Input
              className="flex-1 min-h-[40px]"
              placeholder="How can I improve my resume?"
              type="text"
              value={input}
              onChange={handleInputChange}
            />
            <Button className="ml-2" type="submit">
              Send
            </Button>
          </form>
        </section>
        <section className="container px-0 flex flex-col flex-grow gap-4 mx-auto max-w-3xl border-2 rounded-md">
          <ul
            ref={chatParent}
            className="h-1 p-4 flex-grow rounded-lg overflow-y-auto flex flex-col gap-4"
          >
            {messages.map((m, index) => (
              <div key={index}>
                {m.role === "user" ? (
                  <li key={m.id} className="flex flex-row-reverse">
                    <image src={imageScr} />
                    <div className="rounded-xl p-4  bg-blue-400 shadow-md flex">
                      <p className="text-white">{m.content}</p>
                    </div>
                  </li>
                ) : (
                  <li key={m.id} className="flex flex-row">
                    <Bot />
                    <div className="rounded-xl p-4  shadow-md flex  w-3/4">
                      <p className="">{m.content}</p>
                    </div>
                  </li>
                )}
              </div>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
