import React from 'react';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface ImageDisplayProps {
  imageUrl: string | null;
  message: string | null;
  isLoading: boolean;
  location?: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, message, isLoading }) => {
  return (
    <div className="space-y-3">
      <div className="w-full relative pb-[133.33%] rounded-2xl overflow-hidden bg-black/20 backdrop-blur-md border border-white/20 transition-all">
        <div className="absolute inset-0">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Generated weather visualization"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/70">
              <ImageIcon className="w-8 h-8" />
              <p>画像が生成されていません</p>
            </div>
          )}
        </div>
      </div>
      
      {message && (
        <div className="space-y-3">
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <p className="text-white/90 text-base leading-relaxed whitespace-pre-wrap">{message}</p>
          </div>
          
          {imageUrl && (
            <div className="flex justify-center">
              <ShareButton message={message} imageUrl={imageUrl} location="" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};