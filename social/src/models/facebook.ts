import mongoose from 'mongoose';

export interface FacebookAttrs {
  accessToken: string;
  facebookData: {
    id: string;
    displayName: string;
  };
}

export interface FacebookDoc extends mongoose.Document {
  accessToken: string;
  facebookData: {
    id: string;
    displayName: string;
    username?: string;
  };
}

export interface FacebookModel extends mongoose.Model<FacebookDoc> {
  build(attrs: FacebookAttrs): FacebookDoc;
}

const facebookAccountSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  facebookData: {
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

const Facebook = mongoose.model<FacebookDoc, FacebookModel>(
  'FacebookAccount',
  facebookAccountSchema
);

export { Facebook };
