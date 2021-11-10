export interface TrendsPayload {
  data: {
    trends: Trend[];
    as_of: Date;
    created_at: Date;
  }[];
}

export interface Trend {
  name: string;
  url: string;
  query: string;
  tweet_volume: number;
}
