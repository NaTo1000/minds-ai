import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Send, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

export default function ChatWithTrina() {
  const { user, isAuthenticated } = useAuth();
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const createConversation = trpc.chat.create.useMutation();
  const sendMessage = trpc.chat.sendMessage.useMutation();

  // Initialize conversation
  useEffect(() => {
    if (!conversationId) {
      createConversation.mutate(
        { isAnonymous: !isAuthenticated },
        {
          onSuccess: (data) => {
            setConversationId(data.conversationId);
            // Add welcome message
            setMessages([
              {
                role: "assistant",
                content: `Hello! I'm Trina, your nurturing support companion. 🐢\n\nI'm here to listen and support you through whatever you're experiencing. Whether you're dealing with anxiety, depression, PTSD, panic attacks, or insomnia, this is a safe space for you.\n\nYou can talk to me about anything on your mind. I'm here to help with:\n- Coping strategies and grounding techniques\n- Breathing exercises and calming activities\n- Finding local support services\n- Just listening when you need to talk\n\nHow are you feeling today?`,
              },
            ]);
          },
          onError: () => {
            toast.error("Failed to start conversation. Please try again.");
          },
        }
      );
    }
  }, [conversationId, isAuthenticated]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !conversationId) return;

    const userMessage = message.trim();
    setMessage("");

    // Add user message to UI
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Send to backend
    sendMessage.mutate(
      { conversationId, message: userMessage },
      {
        onSuccess: (data) => {
          setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
        },
        onError: () => {
          toast.error("Failed to send message. Please try again.");
          // Remove the user message if sending failed
          setMessages((prev) => prev.slice(0, -1));
        },
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <img src="/trina-avatar.png" alt="Trina" className="w-10 h-10 rounded-full" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Chat with Trina</h1>
                <p className="text-xs text-muted-foreground">
                  {isAuthenticated ? "Conversation saved" : "Anonymous chat"}
                </p>
              </div>
            </div>
            <Link href="/crisis">
              <Button variant="destructive" size="sm">Crisis Help</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="container py-6 max-w-4xl">
        <Card className="flex flex-col h-[calc(100vh-12rem)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Streamdown>{msg.content}</Streamdown>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {sendMessage.isPending && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Trina is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send)"
                className="flex-1"
                disabled={sendMessage.isPending || !conversationId}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || sendMessage.isPending || !conversationId}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Trina provides support and guidance, but is not a replacement for professional medical care.
            </p>
          </div>
        </Card>
      </div>

      {/* Infinite branding */}
      <div className="infinite-branding">infinite♾2025</div>
    </div>
  );
}
