import express from "express";
const expensesRouter = express.Router();

import { pool } from "../db.js";



expensesRouter.get("/:id", async (req, res) => {

  const result = await pool.query("SELECT * FROM expenses WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id]);
  const expense = result.rows[0];
  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }
    res.json(expense);
});

expensesRouter.get("/", async (req, res) => {
    const {category, amount, date} = req.query;

    if (!category && !amount && !date) {
        const result = await pool.query("SELECT * FROM expenses WHERE user_id = $1", [req.user.id]);
      return res.json(result.rows);
    } else {
        let sql="SELECT * FROM expenses WHERE user_id = $1";
        let values = [req.user.id];
        let conditions = [];

        if (category) {
            conditions.push(`category ILIKE  $${conditions.length + 2}`);
            values.push (category);
        }

        if (amount) {
            conditions.push(`amount = $${conditions.length + 2}`);
            values.push(amount);
        }

        if (date) {
            conditions.push(`date = $${conditions.length + 2}`);
            values.push(date);
        }

        if (conditions.length > 0) {
            sql += " AND " + conditions.join(" AND ");
        }

        const result = await pool.query(sql, values);
        return res.json(result.rows);
    }
});


expensesRouter.post("/", async (req, res)=>{
    const {category, description, amount, date} = req.body || {};

    if (!category || !description || !amount || !date){
      return res.status(400).json({ error: "Missing required fields" });
    } else {
        const newExpense = {
            category: category,
            description: description,
            amount: amount,
            date: date
        };
        await pool.query("INSERT INTO expenses (category, description, amount, date, user_id) VALUES ($1, $2, $3, $4, $5)", [newExpense.category, newExpense.description, newExpense.amount, newExpense.date, req.user.id]);
        res.status(201).json(newExpense);
    };
});

expensesRouter.patch("/:id", async (req, res)=>{
    console.log("PATCH REQUEST BODY:", req.body);
    const {category, description, amount, date} = req.body || {};
    const result = await pool.query("SELECT * FROM expenses WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id]);
    const expense = result.rows[0];
    if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
    } else {
        if (category) expense.category = category;
        if (description) expense.description = description;
        if (amount) expense.amount = amount;
        if (date) expense.date = date;
        await pool.query("UPDATE expenses SET category = $1, description = $2, amount = $3, date = $4 WHERE id = $5 AND user_id = $6", [expense.category, expense.description, expense.amount, expense.date, req.params.id, req.user.id]);
        res.json(expense);
    };
});

expensesRouter.delete("/:id", async (req, res) => {
    const result = await pool.query("SELECT * FROM expenses WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id]);
    const expense = result.rows[0];
    if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
    }
    await pool.query("DELETE FROM expenses WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id]);
    res.status(200).json({ message: "Expense deleted successfully" });
});

export default expensesRouter;