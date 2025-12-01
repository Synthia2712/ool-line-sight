import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Paperclip, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const messages = [
    {
      id: 1,
      sender: "designer",
      name: "Sarah Chen",
      role: "Lead Designer",
      text: "Hi! I wanted to update you on the kitchen installation progress. Everything is going smoothly and we're on schedule.",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "client",
      text: "That's great to hear! When can I expect the marble countertops to be installed?",
      time: "10:35 AM",
    },
    {
      id: 3,
      sender: "designer",
      name: "Sarah Chen",
      role: "Lead Designer",
      text: "The marble countertops are scheduled for installation next Tuesday. I'll make sure to send you photos once they're in place.",
      time: "10:42 AM",
    },
    {
      id: 4,
      sender: "client",
      text: "Perfect! Also, I've been thinking about the lighting in the dining area. Could we schedule a call to discuss some alternative options?",
      time: "11:05 AM",
    },
    {
      id: 5,
      sender: "designer",
      name: "Sarah Chen",
      role: "Lead Designer",
      text: "Absolutely! I'm available tomorrow at 2 PM or Thursday at 10 AM. Which works better for you?",
      time: "11:15 AM",
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle message send
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-display font-semibold">Sarah Chen</h1>
            <p className="text-sm text-muted-foreground">Lead Designer</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"} animate-fade-in-up`}
            >
              <div className={`max-w-[70%] ${msg.sender === "client" ? "order-2" : "order-1"}`}>
                {msg.sender === "designer" && (
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-foreground">{msg.name}</p>
                    <p className="text-xs text-muted-foreground">{msg.role}</p>
                  </div>
                )}
                <Card
                  className={`p-4 shadow-soft ${
                    msg.sender === "client"
                      ? "bg-primary text-primary-foreground border-primary/20"
                      : "bg-card border-border/50"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </Card>
                <p className="text-xs text-muted-foreground mt-1 px-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-end gap-3">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="shrink-0">
                <ImageIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="w-full border-border/50 focus:border-primary/50"
              />
            </div>
            <Button 
              onClick={handleSend}
              size="icon"
              className="shrink-0 bg-primary hover:bg-primary/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
