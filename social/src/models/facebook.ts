import mongoose from 'mongoose';

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
});

facebookAccountSchema.statics.build = (attrs: FacebookAttrs) => {
  return new Facebook(attrs);
};

const Facebook = mongoose.model<FacebookDoc & mongoose.Document, FacebookModel>(
  'FacebookAccount',
  facebookAccountSchema
);

export { Facebook };
