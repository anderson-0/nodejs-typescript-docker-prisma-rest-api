import { container } from "tsyringe";
import MemoryCacheProvider from "./implementations/MemoryCacheProvider";
import RedisCacheProvider from "./implementations/RedisCacheProvider";
import ICacheProvider from "./models/ICacheProvider";

const providers = {
  redis: RedisCacheProvider,
  memory: MemoryCacheProvider,
};

container.registerSingleton<ICacheProvider>("CacheProvider", providers.redis);
