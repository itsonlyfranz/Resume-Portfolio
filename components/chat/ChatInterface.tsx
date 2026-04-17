"use client"

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function ChatInterface() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const [input, setInput] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status === 'ready') {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg">
      {/* Messages */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-12">
            <p className="mb-4 text-lg">👋 Hello!</p>
            <p className="mb-2">I&apos;m an AI assistant here to answer questions about Roberto.</p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="font-medium">Try asking:</p>
              <ul className="space-y-1">
                <li>• What experience do you have with AI?</li>
                <li>• Tell me about your backend skills</li>
                <li>• What projects have you worked on?</li>
                <li>• Are you available for work?</li>
              </ul>
            </div>
          </div>
        )}
        {messages.map(m => (
          <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              m.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              {m.parts.map((part, i) => 
                part.type === 'text' ? (
                  <span key={i} className="text-sm whitespace-pre-wrap">{part.text}</span>
                ) : null
              )}
            </div>
          </div>
        ))}
        {status === 'streaming' && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2 bg-card">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about Roberto's background..."
          disabled={status !== 'ready'}
          className="flex-1"
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={status !== 'ready' || !input.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
