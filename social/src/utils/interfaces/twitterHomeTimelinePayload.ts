import { Tweet } from './tweet';

export interface TwitterHomeTimelinePayload {
  data: Tweet[];
}
