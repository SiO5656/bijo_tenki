import { DifyResponse } from '../types';

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

interface GenerateImageResult {
  imageUrl: string;
  message: string;
}

export async function generateImage(place: string): Promise<GenerateImageResult> {
  const apiUrl = import.meta.env.VITE_DIFY_API_URL;
  const apiKey = import.meta.env.VITE_DIFY_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new ApiError('API設定が見つかりません。環境変数を確認してください。');
  }

  try {
    const response = await fetch(`${apiUrl}/workflows/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: {
          place: place,
        },
        response_mode: 'blocking',
        user: `user-${crypto.randomUUID()}`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(
        errorData?.message || `APIエラー: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    
    // Handle the case where outputs might be nested in data
    const outputs = data.data?.outputs || data;
    
    // Check for both correct and incorrect spelling of message
    const imageUrl = outputs.result;
    const message = outputs.message || outputs.mesage; // Handle typo in API response

    if (!imageUrl || typeof imageUrl !== 'string') {
      console.error('API Response:', data);
      throw new ApiError('画像URLが見つかりませんでした');
    }

    if (!message || typeof message !== 'string') {
      console.error('API Response:', data);
      throw new ApiError('メッセージが見つかりませんでした');
    }

    return {
      imageUrl,
      message: message.trim()
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : '予期せぬエラーが発生しました'
    );
  }
}