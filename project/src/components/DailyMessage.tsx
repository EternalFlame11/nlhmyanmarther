import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import type { ChatMessage } from '../types';
import { ChatMessage as ChatMessageComponent } from './chat/ChatMessage';
import { ChatInput } from './chat/ChatInput';

const CURRENT_USER = {
  id: 'user1',
  name: 'You'
};

const OTHER_USER = {
  id: 'user2',
  name: 'Friend'
};

const defaultMessages: ChatMessage[] = [
  {
    id: '1',
    content: "Hey! How's your day going?",
    timestamp: new Date(Date.now() - 86400000),
    userId: OTHER_USER.id,
    userName: OTHER_USER.name
  },
  {
    id: '2',
    content: "Pretty good! Working on some interesting projects.",
    timestamp: new Date(Date.now() - 3600000),
    userId: CURRENT_USER.id,
    userName: CURRENT_USER.name
  }
];

export function DailyMessage() {
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);

  const handleSendMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      userId: CURRENT_USER.id,
      userName: CURRENT_USER.name
    };

    setMessages([...messages, message]);

    // Simulate friend's response after a short delay
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "That's great to hear! Keep up the good work!",
        timestamp: new Date(),
        userId: OTHER_USER.id,
        userName: OTHER_USER.name
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 flex flex-col h-[400px]">
      <div className="flex items-center gap-2 p-4 border-b dark:border-gray-700">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessageComponent
            key={message.id}
            message={message}
            currentUserId={CURRENT_USER.id}
          />
        ))}
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}