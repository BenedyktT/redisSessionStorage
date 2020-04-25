const users = [
  { username: "a", password: "123", id: 12345 },
  { username: "b", password: "dupa", id: 44444 },
];

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((e) => e.username === username);
    if (!user) {
      return done(null, false);
    }
    if (user.password !== password) {
      return done(null, false);
    }
    return done(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  console.log("this comes from seralie user cb", id);
  const user = users.find((e) => e.id === id);
  if (!user) {
    return cb("User not found");
  }
  return cb(null, { username: user.username, id: user.id });
});
