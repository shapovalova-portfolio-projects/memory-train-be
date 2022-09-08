export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT, 10) || 5432,
      name: process.env.PG_DATABASE,
      username: process.env.PG_USERNAME,
      password: process.env.PG_DATABASE,
    }
  });