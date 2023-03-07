// import { Service } from 'typedi';
// import { IScheduleTweetContract, scheduler } from '../agenda';

// @Service()
// export class AgendaService {
//   public scheduleTweet(data: IScheduleTweetContract) {
//     scheduler.agenda.schedule<IScheduleTweetContract>(
//       'in 2 seconds',
//       'scheduleTweet',
//       data
//     );
//   }

//   public async getScheduledPosts() {
//     const jobs = await scheduler.agenda.jobs({ name: 'scheduleTweet' });
//     return jobs;
//   }
// }
