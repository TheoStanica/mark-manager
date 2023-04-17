import { FacebookMeDto } from './me';

export interface FacebookAddPageDto {
  access_token: string;
  category: string;
  name: string;
  id: string;

  facebookUserId: string;
}

export interface FacebookPostOnPageDto extends FacebookMeDto {
  pageId: string;
  message: string;
}
