import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
        <p className="text-red-200 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};