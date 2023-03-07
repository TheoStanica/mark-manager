// import Agenda, { Job, JobAttributesData } from 'agenda';

// export interface IScheduleTweetContract extends JobAttributesData {
//   date: Date;
//   twitterUserId: string;
// }

// class AgendaWrapper {
//   private _agenda?: Agenda;

//   init() {
//     this._agenda = new Agenda({
//       db: { address: process.env.MONGO_URI! },
//     });
//     this._agenda.define(
//       'scheduleTweet',
//       async (job: Job<IScheduleTweetContract>) => {
//         console.log('im sending a tweet with this data', job.attrs.data);
//       }
//     );
//   }

//   get agenda() {
//     if (!this._agenda) {
//       throw new Error('Cannont access Agenda before connecting');
//     }
//     return this._agenda;
//   }
// }

// export const scheduler = new AgendaWrapper();
