import React, { useState } from 'react';
import { CloudSun } from 'lucide-react';
import { SearchInput } from './components/SearchInput';
import { ImageDisplay } from './components/ImageDisplay';
import { ErrorAlert } from './components/ErrorAlert';
import { generateImage, ApiError } from './lib/api';
import { WeatherState } from './types';

// メインのアプリケーションコンポーネント
function App() {
  // 場所の入力値を管理するstate
  const [place, setPlace] = useState('');
  
  // アプリケーションの状態を管理するstate
  // imageUrl: 生成された画像のURL
  // message: 画像に付随するメッセージ
  // error: エラーメッセージ
  // isLoading: 読み込み中かどうか
  const [state, setState] = useState<WeatherState>({
    imageUrl: null,
    message: null,
    error: null,
    isLoading: false,
  });

  // 画像生成を実行する関数
  const handleGenerate = async () => {
    // 入力値が空の場合はエラーを表示
    if (!place.trim()) {
      setState(prev => ({ ...prev, error: '場所を入力してください' }));
      return;
    }

    // ローディング状態を開始
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // API経由で画像を生成
      const result = await generateImage(place);
      // 成功した場合、画像URLとメッセージを更新
      setState(prev => ({
        ...prev,
        imageUrl: result.imageUrl,
        message: result.message,
        error: null,
      }));
    } catch (error) {
      // エラーが発生した場合、エラーメッセージを表示
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : '画像の生成に失敗しました';
      setState(prev => ({ ...prev, error: errorMessage }));
    } finally {
      // 処理完了後、ローディング状態を解除
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // UIのレンダリング
  return (
    // グラデーション背景のメインコンテナ
    <div className="min-h-screen bg-gradient-to-br from-sky-500 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-6 min-h-screen flex flex-col items-center max-w-2xl">
        {/* ヘッダー部分 */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3">
            <CloudSun className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white tracking-tight">AI美人天気</h1>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="w-full space-y-4">
          {/* 検索入力フォーム */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
            <SearchInput
              value={place}
              onChange={setPlace}
              onSubmit={handleGenerate}
              isLoading={state.isLoading}
            />
          </div>
          
          {/* エラーメッセージ表示 */}
          {state.error && <ErrorAlert message={state.error} />}
          
          {/* 生成された画像とメッセージの表示 */}
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
