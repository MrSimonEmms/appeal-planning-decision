const oneGigabyte = 1024 * 1024 * 1024;

module.exports = {
  appeals: {
    timeout: Number(process.env.APPEALS_SERVICE_API_TIMEOUT || 10000),
    url: process.env.APPEALS_SERVICE_API_URL,
  },
  fileUpload: {
    debug: process.env.FILE_UPLOAD_DEBUG === 'true',
    pins: {
      appealStatementMaxFileSize: Number(
        process.env.FILE_UPLOAD_MAX_FILE_SIZE_BYTES || oneGigabyte
      ),
      uploadApplicationMaxFileSize: Number(
        process.env.FILE_UPLOAD_MAX_FILE_SIZE_BYTES || oneGigabyte
      ),
      uploadDecisionMaxFileSize: Number(process.env.FILE_UPLOAD_MAX_FILE_SIZE_BYTES || oneGigabyte),
    },
    tempFileDir: process.env.FILE_UPLOAD_TMP_PATH,
    useTempFiles: process.env.FILE_UPLOAD_USE_TEMP_FILES === 'true',
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
    redact: ['opts.body', 'config.server.sessionSecret'],
  },
  redis: () => {
    const redisConfig = {
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASS,
      port: Number(process.env.REDIS_PORT || 6379),
    };

    if (process.env.REDIS_USE_TLS === 'true') {
      redisConfig.tls = {
        servername: process.env.REDIS_HOST,
      };
    }

    return redisConfig;
  },
  server: {
    port: Number(process.env.PORT || 3000),
    sessionSecret: process.env.SESSION_KEY,
    useSecureSessionCookie: process.env.USE_SECURE_SESSION_COOKIES === 'true',
  },
};