import Redis, { Redis as RedisClient, RedisOptions } from "ioredis";
import ICacheProvider from "../models/ICacheProvider";

const redisConfig = {
  driver: "redis",
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS,
    },
  },
} as RedisOptions;

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(redisConfig);
  }

  public async save(key: string, value: string): Promise<void> {
    console.log(`Saving cache: ${key} with value ${value}`);
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      console.log(`Data retrieved from redis ${data}`);
      return null;
    }

    return JSON.parse(data);
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);
    const pipeline = await this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });
  }
}
