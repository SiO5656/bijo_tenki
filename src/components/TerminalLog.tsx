import React from 'react';
import { Terminal } from 'lucide-react';
import { LogEntry } from '../types';

interface TerminalLogProps {
  logs: LogEntry[];
}

export const TerminalLog: React.FC<TerminalLogProps> = ({ logs }) => {
  return (
    <div className="w-full bg-gray-900/90 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
      <div className="px-4 py-2 bg-gray-800/50 border-b border-white/10 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-white/70" />
        <span className="text-sm font-mono text-white/70">System Log</span>
      </div>
      <div className="p-4 max-h-48 overflow-y-auto font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-white/30">No logs yet...</p>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2">
                <span className="text-white/50 shrink-0">
                  {log.timestamp.toLocaleTimeString()}
                </span>
                <span className={`
                  ${log.type === 'error' ? 'text-red-400' : ''}
                  ${log.type === 'success' ? 'text-green-400' : ''}
                  ${log.type === 'info' ? 'text-white/70' : ''}
                `}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};