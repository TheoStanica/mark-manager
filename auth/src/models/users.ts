import mongoose from 'mongoose';
import { Password } from '../services/password';

export interface UserAttrs {
  email: string;
  password: string;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  twitter: {
    oauthAccessToken: string;
    oauthAccessTokenSecret: string;
  };
  confirmed: boolean;
  confirmationToken: string;
  confirmationExpireDate: Date;
  passwordResetToken: string;
  passwordResetExpireDate: Date;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    confirmationToken: {
      type: String,
    },
    confirmationExpireDate: {
      type: Date,
      default: () => new Date(+new Date() + 10 * 60 * 1000),
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpireDate: {
      type: Date,
    },
    twitter: {
      oauthAccessToken: {
        type: String,
      },
      oauthAccessTokenSecret: {
        type: String,
      },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.confirmed;
        delete ret.confirmationToken;
        delete ret.confirmationExpireDate;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpireDate;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
