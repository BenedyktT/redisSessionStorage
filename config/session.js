const { IN_PROD } = require("./app");
const HALF_HOUR = 1000 * 60 * 60 * 0.5;
const {
  SESSION_SECRET = "catwalksfaaofpwqkjfiqja",
  SESSION_NAME = "redisSession",
  SESSION_IDLE_TIMEOUT = HALF_HOUR,
} = process.env;

exports.SESSION_OPTIONS = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  resave: false,
  secure: IN_PROD,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: SESSION_IDLE_TIMEOUT },
};
