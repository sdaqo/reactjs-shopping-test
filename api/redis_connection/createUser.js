async function CreateUser(email, pwd_hash, client) {
  const res = await client.keys(`userKey:${email}`);

  if (res.length !== 0) {
    console.log("User exists already");
    return "fail";
  }

  await client.HSET(`userKey:${email}`, "pwdHash", pwd_hash);
  await client.HSET(`userKey:${email}`, "email", email);
  await client.HSET(`userKey:${email}`, "data", "[]");

  console.log(`Created User with email ${email}`);
  return "success";
}

export default CreateUser;
