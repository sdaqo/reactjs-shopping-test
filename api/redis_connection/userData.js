async function userData(data, client) {
  const { email, session } = data;

  const sessionIdFromDB = await client.HGET(`userKey:${email}`, "session");

  if (sessionIdFromDB !== session) {
    return { status: "fail", reason: "session missmatch" };
  }

  await client.HSET(`userKey:${email}`, "data", JSON.stringify(data.data));
  return { status: "success" };
}

export default userData;
