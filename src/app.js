import express from "express";
import cors from "cors";
import expensesRouter from "./routes/expenses.js";
import { pool } from "./db.js";
import authRouter from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("login.html", { root: "src/public" });
});

app.use(express.static("src/public"))

app.use("/expenses", authMiddleware, expensesRouter);

app.use("/auth", authRouter);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

