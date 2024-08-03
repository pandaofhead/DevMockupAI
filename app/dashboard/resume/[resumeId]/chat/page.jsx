"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
export default function Chat({ params }) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Resume", href: "/dashboard/resume" },
    { label: "Chat" },
  ];
  
  // call the useChat hook
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/resumebot",
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
    <div className="p-8 w-full">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col justify-start w-full h-screen max-h-dvh">
        <header className="py-2 w-full max-w-3xl mx-auto">
          <h1 className="text-xl font-bold">Resume Chat:</h1>
        </header>
        <section className="pb-4">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-3xl mx-auto items-center"
          >
            {/* <Input id="resume" type="file" /> */}
            <Input
              className="flex-1 min-h-[40px]"
              placeholder="Type your question here..."
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
                    <div className="rounded-xl p-4 text-white bg-blue-400 shadow-md flex">
                      <p className="text-primary">{m.content}</p>
                    </div>
                  </li>
                ) : (
                  <li key={m.id} className="flex flex-row">
                    <div className="rounded-xl p-4  shadow-md flex  w-3/4">
                      <p className="text-primary">{m.content}</p>
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
