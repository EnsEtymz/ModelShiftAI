"use client";
import { useEffect, useRef, useState } from "react";
import "./globals.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Paperclip,
  ArrowUp,
  Plus,
  Globe,
  Lightbulb,
  Image,
  PenLine,
  Code,
  ListTodo,
  FileText,
  MoreHorizontal,
  Mic,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const features = [
    { icon: Image, label: "Görsel oluştur", color: "text-green-500" },
    { icon: PenLine, label: "Yazmama yardım et", color: "text-purple-500" },
    { icon: Code, label: "Kod", color: "text-blue-500" },
    { icon: ListTodo, label: "Plan yap", color: "text-yellow-500" },
    { icon: FileText, label: "Metni özetle", color: "text-orange-500" },
    { icon: MoreHorizontal, label: "Daha fazla", color: "text-gray-500" },
  ];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      text: input,
      isUser: true,
    };
    setMessages([...messages, newMessage]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Size nasıl yardımcı olabilirim?",
          isUser: false,
        },
      ]);
    }, 2000);
  };
  return (
    <div className="flex h-[calc(100vh-180px)] flex-col  w-full">
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <h1 className="mb-8 text-2xl font-semibold dark:text-white">
            Nasıl yardımcı olabilirim?
          </h1>
          <div className="w-full max-w-2xl space-y-4">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Herhangi bir şey sor"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className=" pl-12 pr-12 dark:text-white dark:placeholder:text-zinc-400 h-12 "
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 text-zinc-400"
              >
                <Plus className="h-5 w-5" />
              </Button>
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-zinc-400"
                >
                  <Globe className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-zinc-400"
                >
                  <Lightbulb className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-zinc-400"
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {features.map((feature) => (
                <Button
                  key={feature.label}
                  variant="ghost"
                  className="h-9 gap-2 rounded-full bg-slate-50   dark:bg-zinc-900 px-4 dark:hover:bg-zinc-800"
                >
                  <feature.icon className={cn("h-4 w-4", feature.color)} />
                  <span className="text-sm dark:text-zinc-300 ">
                    {feature.label}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="mx-auto max-w-2xl space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.isUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div className="flex items-start gap-2.5 max-w-[80%]">
                    {!message.isUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-purple-600 text-white">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm",
                        message.isUser
                          ? "bg-purple-600 text-white"
                          : "bg-zinc-800 text-zinc-100"
                      )}
                    >
                      {message.text}
                    </div>
                    {message.isUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-zinc-700 text-white">
                          U
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-purple-600 text-white">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex space-x-1 bg-zinc-800 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4">
            <div className="mx-auto max-w-2xl">
              <div className="relative flex items-center gap-2 rounded-lg dark:bg-zinc-900   shadow-xl px-3 py-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-zinc-400 hover:text-zinc-300"
                >
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a follow up..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 border-0 bg-transparent   focus:outline-none "
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 text-zinc-400 hover:text-zinc-300"
                >
                  <ArrowUp className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
