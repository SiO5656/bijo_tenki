import React from 'react';
import { MessageSquare } from 'lucide-react';

interface MessageDisplayProps {
  message: string;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => {
  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm bg-white/10 backdrop-blur-sm border-white/20">
      <div className="flex flex-col space-y-1.5 p-4 pb-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-white/70" />
          <h3 className="text-sm font-semibold leading-none tracking-tight text-white/70">
            AIからのメッセージ
          </h3>
        </div>
      </div>
      <div className="p-4 pt-2">
        <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
          {message}
        </p>
      </div>
    </div>
  );
};