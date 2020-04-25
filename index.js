const express = require("express");
const session = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis")(session);
const redisClient = redis.createClient();
const bodyParser = require("body-parser");
const passport = require("passport");
const { SESSION_OPTIONS, REDIS_OPTIONS, APP_PORT } = require("./config");
const requireLogin = require("./requireLogin");
require("./passport");
redisClient.on("error", (error) => console.error(error.message));

const app = express();
app.use(bodyParser.json());
app.use(
  session({
    ...SESSION_OPTIONS,
    store: new redisStore({
      ...REDIS_OPTIONS,
      client: redisClient,
      ttl: 86400,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", requireLogin, (req, res) => {
  res.send("Hello world");
});

app.use("/login", require("./login"));
app.use("/logout", (req, res) => {
  req.logOut();
  req.session.destroy();
  res.clearCookie("redisSession");
  res.json("user logged out");
});

app.listen(APP_PORT);
