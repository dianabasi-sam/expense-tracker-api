console.log("app.js is running...");
import express from "express";
import cors from "cors";
import expensesRouter from "./routes/expenses.js";

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());


app.use("/expenses", expensesRouter);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

