import { FacebookMeDto } from './me';

export interface FacebookFeedDto extends FacebookMeDto {
  pageId: string;
  before?: string;
  after?: string;
}
