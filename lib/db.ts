import mysql from "mysql2/promise"

// Re-use connection pool across hot-reloads in dev
const globalForDb = global as typeof global & { db?: mysql.Pool }

export const db =
  globalForDb.db ??
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT ?? 3306),
    waitForConnections: true,
    connectionLimit: 5,
    // No SSL — Lolafire internal host, plain TCP on private network
  })

if (process.env.NODE_ENV !== "production") globalForDb.db = db
