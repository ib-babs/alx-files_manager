/**
 * Redis module
 */
import { createClient } from "redis";
import { promisify } from "node:util";
const redisCli = createClient();
/**
 * @class RedisClient utility
 */
class RedisClient {
  constructor() {
    redisCli.on("error", (err) => console.log(err));
  }
  /**
   * @function Check redis connection
   * @returns true, if connection is alive and false if otherwise
   */
  isAlive() {
    let isConnected = false;
    redisCli.connected && (isConnected = true);
    return isConnected;
  }
  /**
   * @function Get data from redis database
   * @param {String} key key
   * @returns Value got from the database
   */
  async get(key) {
    const getAsync = promisify(redisCli.get).bind(redisCli);
    const value = getAsync(key);
    // console.log(value);
    return value;
  }
  /**
   * @function Store data into database
   * @param {string} key Key
   * @param {any} value Value to store
   * @param {Number} duration Time (seconds) for a data stored to expire
   * @returns Nothing
   */
  async set(key, value, duration) {
    await redisCli.set(key, value, "EX", duration);
    // setValue(key, value, duration)
  }

  /**
   * @function Del a data from redis
   * @param {string} key Key
   * @returns Nothing
   */
  async del(key) {
    await redisCli.del(key);
  }
}

export const redisClient = new RedisClient();
