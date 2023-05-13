export interface ISentimentRequest {
  message: string;
}

export interface ISentimentResponse {
  sentiment: 'Positive' | 'Negative';
}

export interface ISummaryRequest {
  message: string;
}
