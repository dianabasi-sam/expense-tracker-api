console.log("app.js is running...");
import express from "express";
import expensesRouter from "./routes/expenses.js";

const app = express();
const port = 3000;

app.use(express.json());


app.use("/expenses", expensesRouter);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

