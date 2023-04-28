export interface IBuildPlannerMessageRequest {
  topic: string;
  number_of_posts: number;
  start_date: string;
  end_date: string;
  timezone: string;
}

export interface ISuggestedPostsResponse {
  suggested_posts: Array<SuggestedPost>;
}

export interface SuggestedPost {
  message: string;
  date: Date;
}
