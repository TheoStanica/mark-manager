import redis, { RedisClient } from 'redis';
import { PrimaryExpression } from 'typescript';
import { promisify } from 'util';

interface WhiteListParams {
  userId: string | undefined;
  refreshToken: string;
  accessToken: string;
}

export class RedisService {
  constructor(private client: RedisClient) {
    this.client = client;
  }

  private SETEXAsync = promisify(this.client.SETEX).bind(this.client);
  private KEYSAsync = promisify(this.client.KEYS).bind(this.client);
  private DELAsync = promisify(this.client.DEL).bind(this.client);
  private GETAsync = promisify(this.client.GET).bind(this.client);
  private EXISTSAsync = promisify(this.client.EXISTS).bind(this.client);

  async SetKeyWithExpiration(
    key: string,
    seconds: number,
    value: string
  ): Promise<string> {
    return await this.SETEXAsync(key, seconds, value);
  }

  async findKeysWith(key: string): Promise<string[]> {
    return await this.KEYSAsync(`*${key}*`);
  }

  async deleteKey(key: string) {
    // @ts-ignore
    return await this.DELAsync(key);
  }

  async getKeyValue(key: string): Promise<string | null> {
    return await this.GETAsync(key);
  }

  async exists(key: string) {
    // @ts-ignore
    return await this.EXISTSAsync(key);
  }

  async deleteAllKeysWith(key: string): Promise<void> {
    const results = await this.findKeysWith(key);

    results.forEach(async (result) => {
      await this.deleteKey(result);
    });
  }

  async whitelistRefreshTokens(data: WhiteListParams) {
    await this.SetKeyWithExpiration(
      `${data.userId}_${data.refreshToken}`,
      parseInt(process.env.REFRESH_TOKEN_TTL!),
      data.accessToken
    );
    await this.SetKeyWithExpiration(
      data.accessToken,
      parseInt(process.env.REFRESH_TOKEN_TTL!),
      data.refreshToken
    );
  }

  async isRevoked(accessToken: string) {
    return await this.exists(`revoked_${accessToken}`);
  }

  async addRevoked(accessToken: string) {
    return await this.SetKeyWithExpiration(
      `revoked_${accessToken}`,
      parseInt(process.env.ACCESS_TOKEN_TTL!),
      '0'
    );
  }

  async logoutUser(accessToken: string) {
    const RT = await this.getKeyValue(accessToken);
    await this.deleteAllKeysWith(RT!);
    await this.deleteKey(accessToken);
    await this.addRevoked(accessToken);
  }

  async blacklistRefreshToken(refreshToken: string, userID: string) {
    const AT = await this.getKeyValue(`${userID}_${refreshToken}`);
    await this.deleteKey(AT!);
    await this.deleteKey(`${userID}_${refreshToken}`);
  }

  async blacklistUser(userID: string): Promise<string[]> {
    const results = await this.findKeysWith(userID);
    const toban: string[] = [];
    for (let i = 0; i < results.length; i++) {
      const AT = await this.getKeyValue(results[i]);
      if (AT) {
        toban.push(AT);
        await this.deleteKey(AT!);
        await this.deleteKey(results[i]);
      }
    }
    return toban;
  }
}
