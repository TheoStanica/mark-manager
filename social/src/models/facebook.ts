import mongoose from 'mongoose';
import { FacebookAccountPageData } from '../utils/interfaces/facebook/accountPagesPayload';

export interface FacebookAttrs {
  accessToken: string;
  data: {
    id: string;
    displayName: string;
  };
}

export interface FacebookDoc {
  id: string;
  accessToken: string;
  data: {
    id: string;
    displayName: string;
    username?: string;
  };
  pages: Array<FacebookAccountPageData>;
}

export interface FacebookModel
  extends mongoose.Model<FacebookDoc & mongoose.Document> {
  build(attrs: FacebookAttrs): FacebookDoc & mongoose.Document;
}

const facebookAccountSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  data: {
    id: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
    },
  },
  pages: [
    {
      access_token: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      _id: false,
    },
  ],
});

facebookAccountSchema.statics.build = (attrs: FacebookAttrs) => {
  return new Facebook(attrs);
};

const Facebook = mongoose.model<FacebookDoc & mongoose.Document, FacebookModel>(
  'FacebookAccount',
  facebookAccountSchema
);

export { Facebook };
