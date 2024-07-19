import express from "express";
import { pino } from "pino";
import { pool } from "./db.js";
import { PORT } from "./config.js";

const logger = pino();
const app = express();

app.listen(PORT);

app.get("/", async (req, res) => {
  const [rows] = await pool.query(`SELECT * FROM users`);
  res.json(rows);
});
app.get("/ping", async (req, res) => {
  const [result] = await pool.query(`SELECT "hello world" as RESULT `);
  res.json(result[0]);
});

app.get("/create", async (req, res) => {
  const result = await pool.query(`INSERT INTO users(name) VALUES("EMI") `);
  res.json(result);
});

console.log("Server on port ", PORT);
//logger.info("Server on port ", PORT);
