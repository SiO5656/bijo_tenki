export interface WeatherState {
  imageUrl: string | null;
  message: string | null;
  error: string | null;
  isLoading: boolean;
}

export interface DifyResponse {
  data?: {
    outputs?: {
      result?: string;
      message?: string;
      mesage?: string; // Handle API typo
      text?: string;
    };
  };
  result?: string;
  message?: string;
  mesage?: string; // Handle API typo
}