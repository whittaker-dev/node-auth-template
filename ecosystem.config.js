// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: "trysomethign-blog",
      script: "./dist/index.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        SERVER_PORT: "3001",

        JWT_SECRET_KEY: "xDi44BZm9EN2ProductTion",

        POSTGRES_HOST: "db",
        POSTGRES_PORT: "5432",
        POSTGRES_USERNAME: "postgres",
        POSTGRES_PASSWORD: "RaNdOMSt0nGP@assW0rd",
        POSTGRES_DB: "trysomethign_blog_local",

        AWS_REGION: "ap-southeast-1",
        AWS_ACCESS_KEY: "AKIAYVUNOSXXVCVP7I6O",
        AWS_SECRET_KEY: "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",
        AWS_BUCKET_NAME: "trysomethign-blog-production",
      },
    },
  ],
};
