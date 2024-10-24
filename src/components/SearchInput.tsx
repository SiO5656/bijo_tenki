import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="場所を入力してください"
          className="w-full px-4 py-3 pl-12 rounded-xl bg-black/30 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-300/50 focus:border-transparent transition-all text-lg"
          disabled={isLoading}
        />
        <Search className="w-5 h-5 text-white/60 absolute left-4 top-1/2 -translate-y-1/2" />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-white/90 hover:bg-white text-sky-600 font-medium transition-colors disabled:opacity-50 disabled:hover:bg-white/90"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            '生成する'
          )}
        </button>
      </div>
    </form>
  );
};