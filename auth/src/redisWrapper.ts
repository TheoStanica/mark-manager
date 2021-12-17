import redis, { RedisClient } from 'redis';
import { promisify } from 'util';

class RedisWrapper {
  private _client?: RedisClient;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access Redis client before connecting');
    }
    return this._client;
  }

  connect(redisHost: string) {
    this._client = redis.createClient({
      host: redisHost,
    });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to Redis');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }

  async SETEXAsync(
    client: RedisClient,
    key: string,
    time: number,
    value: string
  ) {
    const async = promisify(client.SETEX).bind(client);
    return async(key, time, value);
  }

  async GETAsync(client: RedisClient, key: string) {
    const async = promisify(client.GET).bind(client);
    return async(key);
  }

  async DELAsync(client: RedisClient, key: string) {
    const async = promisify(client.DEL).bind(client);
    // @ts-ignore
    return async(key);
  }
  async KEYSsync(client: RedisClient, key: string) {
    const async = promisify(client.KEYS).bind(client);
    return async(key);
  }
}

export const redisWrapper = new RedisWrapper();
