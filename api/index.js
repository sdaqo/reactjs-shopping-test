import Connect from "./redis_connection/connect.js";
import CreateUser from "./redis_connection/createUser.js";
import getLoginData from "./redis_connection/checkLogin.js";
import getData from "./redis_connection/getData.js";
import addItem from "./redis_connection/addItem.js";
import userData from "./redis_connection/userData.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import checkSession from "./redis_connection/checkSession.js";
import fetch from "node-fetch";
import config from "./config.json" 

const app = express();
const redis = await Connect();

app.use(morgan("combined"));
app.use(express.json());
app.use(cors({ origin: true }));
app.listen(config.port, config.host, () =>
  console.log(`API started on port ${config.port} (localhost)`)
);

app.get("/login", async (req, res) => {
  const { pwdHash, email } = req.query;

  if (!(pwdHash && email)) {
    res.status(400).send("400: Wrong Query Params");
  } else {
    const data = await getLoginData(email, pwdHash, redis);
    res.status(200).send(data);
  }
});

app.get("/signin", async (req, res) => {
  const { pwdHash, email } = req.query;

  if (!(pwdHash && email)) {
    res.status(400).send("400: Wrong Query Params");
  } else {
    const status = await CreateUser(email, pwdHash, redis);

    res.status(200).send({ status: `${status}` });
  }
});

app.get("/data", async (req, res) => {
  const { type, id } = req.query;

  if (!(type && id)) {
    res.status(400).send("400: Wrong Query Params");
  } else {
    const data = await getData(type, id, redis);

    res.status(200).send(data);
  }
});

app.post("/session", async (req, res) => {
  const status = await checkSession(req.body, redis);

  res.status(200).send(status);
});

app.post("/add_item_user", async (req, res) => {
  const status = await userData(req.body, redis);

  res.status(200).send(status);
});

app.post("/add_item", async (req, res) => {
  const status = await addItem(req.body, redis).catch((reason) => {
    res.send({ status: "fail", reason: reason });
  });
  res.send(status);
});
