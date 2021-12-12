import cacheManager from "cache-manager";

import ICacheProvider from "../models/ICacheProvider";

export default class MemoryCacheProvider implements ICacheProvider {
  private client: cacheManager.Cache;

  constructor() {
    this.client = cacheManager.caching({
      store: "memory",
      max: 5000,
      ttl: process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 28800, // if not specified use 8 hours
    });
  }

  public async save(key: string, value: string): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data as string);
  }

  public async invalidate(key: string): Promise<void> {
    delete this.client[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.client).filter(key => key.startsWith(prefix));

    keys.forEach(key => {
      delete this.client[key];
    });
  }
}
