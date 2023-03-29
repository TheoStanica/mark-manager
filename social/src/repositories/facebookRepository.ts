// import { ClientSession } from 'mongoose';
// import { Service } from 'typedi';
// import { Facebook } from '../models/facebook';
// import { AddFacebookAccountDto } from '../utils/dtos/facebook/create';

// @Service()
// export class FacebookRepository {
//   private readonly Facebook;
//   constructor() {
//     this.Facebook = Facebook;
//   }

//   async addFacebookAccountCredentials(
//     data: AddFacebookAccountDto,
//     session?: ClientSession
//   ) {
//     const account = this.Facebook.build({
//       accessToken: data.accessToken,
//       data: {
//         id: data.data.id,
//         displayName: data.data.displayName,
//       },
//     });
//     await account.save({ session });
//     return account;
//   }

//   async updateFacebookAccountCredentials(
//     facebokAccountMongoId: string,
//     data: AddFacebookAccountDto,
//     session?: ClientSession
//   ) {
//     return this.Facebook.findByIdAndUpdate(
//       facebokAccountMongoId,
//       {
//         $set: {
//           accessToken: data.accessToken,
//           data: {
//             id: data.data.id,
//             displayName: data.data.displayName,
//           },
//         },
//       },
//       { new: true, session }
//     );
//   }
// }
