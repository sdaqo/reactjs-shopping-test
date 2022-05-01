async function checkSession(data, client) {
  const { email, session } = data;

  const sessionIdFromDB = await client.HGET(`userKey:${email}`, "session");
  if (sessionIdFromDB !== session) {
    return { status: "fail", reason: "session missmatch" };
  }

  const userData = await client.HGET(`userKey:${email}`, "data");
  return { status: "success", data: userData };
}

export default checkSession;
