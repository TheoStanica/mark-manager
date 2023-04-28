import { Configuration, OpenAIApi } from 'openai';
import { Service } from 'typedi';
import { buildAssistantPostPlannerMessage } from '../utils/strings';
import { BuildPlannerMessageDto } from '../utils/dtos/assistant/plan';
import { DatabaseConnectionError } from '@tcosmin/common';

@Service()
export class AssistantService {
  private _chatGPT: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY!,
    });
    this._chatGPT = new OpenAIApi(configuration);
  }

  async ask(message: string) {
    const result = await this._chatGPT.createChatCompletion({
      model: 'gpt-3.5-turbo-0301',
      messages: [{ role: 'user', content: message }],
    });
    return {
      message: result.data.choices[0].message?.content,
    };
  }

  async suggestPosts(data: BuildPlannerMessageDto) {
    const message = buildAssistantPostPlannerMessage(data);
    const result = await this.ask(message);

    try {
      return JSON.parse(result.message!);
    } catch (error) {
      throw new DatabaseConnectionError();
    }
  }
}
