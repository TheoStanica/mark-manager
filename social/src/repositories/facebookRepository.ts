import { BadRequestError } from '@tcosmin/common';
import { ClientSession } from 'mongoose';
import { Service } from 'typedi';
import { Facebook, FacebookModel } from '../models/facebook';
import { AddFacebookAccountDto } from '../utils/dtos/facebook/create';
import { FacebookAccountPageData } from '../utils/interfaces/facebook/accountPagesPayload';

@Service()
export class FacebookRepository {
  private readonly Facebook: FacebookModel;
  constructor() {
    this.Facebook = Facebook;
  }

  async addFacebookAccountCredentials(
    data: AddFacebookAccountDto,
    session?: ClientSession
  ) {
    const account = this.Facebook.build({
      accessToken: data.accessToken,
      data: {
        id: data.data.id,
        displayName: data.data.displayName,
      },
    });
    await account.save({ session });
    return account;
  }

  async updateFacebookAccountCredentials(
    facebokAccountMongoId: string,
    data: AddFacebookAccountDto,
    session?: ClientSession
  ) {
    return this.Facebook.findByIdAndUpdate(
      facebokAccountMongoId,
      {
        $set: {
          accessToken: data.accessToken,
          data: {
            id: data.data.id,
            displayName: data.data.displayName,
          },
        },
      },
      { new: true, session }
    );
  }

  async addPageCredentials(
    facebookAccountMongoID: string,
    page: FacebookAccountPageData
  ) {
    const account = await this.Facebook.findById(facebookAccountMongoID);

    if (!account) {
      throw new BadRequestError('');
    }

    const idx = account.pages.findIndex((pg) => pg.id === page.id);
    if (idx !== -1) {
      account.pages[idx].access_token = page.access_token;
      account.pages[idx].name = page.name;
      account.pages[idx].category = page.category;
    } else {
      account.pages.push(page);
    }

    return await account.save();
  }
}
