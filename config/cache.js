const { REDIS_PORT = 6379, REDIS_HOST = "localhost" } = process.env;

exports.REDIS_OPTIONS = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};
