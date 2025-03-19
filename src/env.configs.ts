export const environment = {
  env: process.env.NODE_ENV ?? "local",
  port: process.env.PORT ?? "3000",
  jwt: {
    secret: process.env.JWT_SECRET ?? "secret",
    expiry: process.env.JWT_EXPIRY ?? "3600",
  },
};
