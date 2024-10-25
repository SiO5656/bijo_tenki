import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  message: string;
  imageUrl: string;
  location: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ message, imageUrl }) => {
  const handleShare = () => {
    const tweetText = encodeURIComponent(`${message}\n\n画像: ${imageUrl}\n\n#AI美人天気`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sky-500/90 hover:bg-sky-500 text-white font-medium transition-colors"
    >
      <Share2 className="w-4 h-4" />
      <span>ツイートする</span>
    </button>
  );
};
