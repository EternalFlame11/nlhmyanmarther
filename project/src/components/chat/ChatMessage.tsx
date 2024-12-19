import React from 'react';
import type { ChatMessage } from '../../types';
import { formatDateTime } from '../../utils/dateUtils';

interface ChatMessageProps {
  message: ChatMessage;
  currentUserId: string;
}

export function ChatMessage({ message, currentUserId }: ChatMessageProps) {
  const isCurrentUser = message.userId === currentUserId;

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-[80%] space-y-1
          ${isCurrentUser 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          } 
          rounded-lg p-3
        `}
      >
        <p className="text-sm">{message.userName}</p>
        <p>{message.content}</p>
        <time className="text-xs opacity-75 block">
          {formatDateTime(message.timestamp)}
        </time>
      </div>
    </div>
  );
}