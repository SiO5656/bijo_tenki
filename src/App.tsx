import React, { useState } from 'react';
import { CloudSun } from 'lucide-react';
import { SearchInput } from './components/SearchInput';
import { ImageDisplay } from './components/ImageDisplay';
import { ErrorAlert } from './components/ErrorAlert';
import { generateImage, ApiError } from './lib/api';
import { WeatherState } from './types';

function App() {
  const [place, setPlace] = useState('');
  const [state, setState] = useState<WeatherState>({
    imageUrl: null,
    message: null,
    error: null,
    isLoading: false,
  });

  const handleGenerate = async () => {
    if (!place.trim()) {
      setState(prev => ({ ...prev, error: '場所を入力してください' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await generateImage(place);
      setState(prev => ({
        ...prev,
        imageUrl: result.imageUrl,
        message: result.message,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : '画像の生成に失敗しました';
      setState(prev => ({ ...prev, error: errorMessage }));
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-6 min-h-screen flex flex-col items-center max-w-2xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3">
            <CloudSun className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white tracking-tight">美人天気24</h1>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
            <SearchInput
              value={place}
              onChange={setPlace}
              onSubmit={handleGenerate}
              isLoading={state.isLoading}
            />
          </div>
          
          {state.error && <ErrorAlert message={state.error} />}
          
          <ImageDisplay
            imageUrl={state.imageUrl}
            message={state.message}
            isLoading={state.isLoading}
            location={place}
          />
        </div>
      </div>
    </div>
  );
}

export default App;