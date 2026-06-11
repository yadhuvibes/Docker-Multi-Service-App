const express = require("express");
const { Client } = require("pg");

const app = express();

app.get("/", async (req, res) => {

  const client = new Client({
    host: "db",
    user: "postgres",
    password: "password",
    database: "mydb",
    port: 5432,
  });

  try {
    await client.connect();

    const result = await client.query("SELECT NOW()");

    await client.end();

    res.json(result.rows);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

app.listen(5000, "0.0.0.0", () => {
  console.log("Backend server is running on port 5000");
});
