const { NODE_ENV = "development", APP_PORT = 3000 } = process.env;
module.exports = {
  IN_PROD: NODE_ENV === "production",
  APP_PORT,
};
