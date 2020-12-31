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
    id: string;
    token: string;
  };
  confirmed: boolean;
  confirmationToken: string;
  confirmationExpireDate: Date;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
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
      default: new Date(+new Date() + 10 * 60 * 1000),
    },
    twitter: {
      id: {
        type: String,
      },
      token: {
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
