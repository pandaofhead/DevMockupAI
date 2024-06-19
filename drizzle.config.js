
/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-mockup-db_owner:dOfFJc8r2iGK@ep-young-star-a5wo65e0.us-east-2.aws.neon.tech/ai-mockup-db?sslmode=require',
    }
  };