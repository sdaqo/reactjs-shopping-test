import { createClient, SchemaFieldTypes } from "redis";
import config from "../config.json";

async function Connect() {
  const client = createClient({
    host: config.redis.host,
    port: config.redis.port,
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  // Search Schema
  /*
  await client.ft.create(
    "idx:item",
    {
      "$.itemTitle": {
        type: SchemaFieldTypes.TEXT,
        SORTABLE: "UNF",
      },
      "$.itemPrice": {
        type: SchemaFieldTypes.NUMERIC,
        AS: "price",
      },
      "$.itemId": {
        type: SchemaFieldTypes.NUMERIC,
        AS: "id",
      },
      "$.itemDesc": {
        type: SchemaFieldTypes.TEXT,
        AS: "age",
      },
      "$.imageUrl": {
        type: SchemaFieldTypes.TEXT,
        NOINDEX: true,
        AS: "image",
      },
    },
    {
      ON: "JSON",
      PREFIX: "item:",
    }
  ); */

  return client;
}

export default Connect;
