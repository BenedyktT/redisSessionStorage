const express = require("express");
const session = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

redisClient.on("error", (error) => console.error(error.message));
const app = express();

app.use(
  session({
    secret: "catwalksfaaofpwqkjfiqja",
    name: "sessionKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: redisClient,
      ttl: 86400,
    }),
  })
);

const auth = (req, res, next) => {
  let isSession;
  if (req.sessionID) {
    isSession = redisClient.get(JSON.stringify(`sess:${req.sessionID}`));
  }

  if (!isSession) {
    return res.send("user not remembered");
  }
  next();
};

app.get("/", auth, (req, res) => {
  res.send("Hello world");
});

app.listen(3000);
