import { createClient, SchemaFieldTypes } from "redis";
import config from "../config.json";

async function Connect() {
  const client = createClient({
    host: config.redis.host,
    port: config.redis.port,
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  return client;
}

export default Connect;
