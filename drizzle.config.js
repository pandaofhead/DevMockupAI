/** @type { import("drizzle-kit").Config } */
require('dotenv').config({ path: '.env.local' });

module.exports = {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
};
