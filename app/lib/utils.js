// utils.js
import mysql from 'mysql2/promise';

let connection;

export const connectToDB = async () => {
  if (connection) {
    return connection;
  }

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("Connected to MySQL database");
    return connection;
  } catch (error) {
    console.error("MySQL connection error:", error);
    throw new Error("Failed to connect to the database");
  }
};
