import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// CREATE
app.post("/resource", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO resources (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// LIST
app.get("/resource", async (req: Request, res: Response) => {
  const { name } = req.query;

  let query = "SELECT * FROM resources";
  const params: any[] = [];

  if (name) {
    query += " WHERE name ILIKE $1";
    params.push(`%${name}%`);
  }

  const result = await pool.query(query, params);
  res.json(result.rows);
});

// DETAIL
app.get("/resource/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await pool.query("SELECT * FROM resources WHERE id=$1", [id]);

  if (result.rows.length === 0)
    return res.status(404).json({ message: "Not found" });

  res.json(result.rows[0]);
});

// UPDATE
app.put("/resource/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;

  const result = await pool.query(
    "UPDATE resources SET name=$1 WHERE id=$2 RETURNING *",
    [name, id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ message: "Not found" });

  res.json(result.rows[0]);
});

// DELETE
app.delete("/resource/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await pool.query(
    "DELETE FROM resources WHERE id=$1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ message: "Not found" });

  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
