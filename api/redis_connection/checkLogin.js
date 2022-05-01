import crypto from "crypto";

async function getLoginData(email, pwd_hash, client) {
  const pwdHashFromDB = await client.HGET(`userKey:${email}`, "pwdHash");

  if (!pwdHashFromDB) {
    return { status: "fail", fail_reason: "email" };
  }

  if (pwdHashFromDB != pwd_hash) {
    return { status: "fail", fail_reason: "password" };
  }

  const userData = await client.HGET(`userKey:${email}`, "data");

  const sessionId = crypto.randomBytes(16).toString("base64");

  await client.HSET(`userKey:${email}`, "session", sessionId);

  return {
    status: "success",
    data: userData,
    session: sessionId,
  };
}

export default getLoginData;
