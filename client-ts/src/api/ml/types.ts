export interface ISentimentRequest {
  message: string;
}

export interface ISentimentResponse {
  sentiment: 'Positive' | 'Negative' | 'Neutral';
}

export interface ISummaryRequest {
  message: string;
}
