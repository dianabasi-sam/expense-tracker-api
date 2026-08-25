import express from "express";
const expensesRouter = express.Router();

import expenses from "../data/expenses.js";


expensesRouter.get("/:id", (req, res) => {
  const expense = expenses.find((e) => e.id === parseInt(req.params.id));
  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }
    res.json(expense);
});

expensesRouter.get("/", (req, res) => {
    const {category, amount, date} = req.query;

    if (!category && !amount && !date) {
      return res.json(expenses);
    } else {

    const filteredExpenses = expenses.filter((expense) => {
     return (!category || expense.category === category) &&
     (!amount || expense.amount === amount) &&
     (!date || expense.date === date);
    });
    res.json(filteredExpenses)};
    
});


expensesRouter.post("/", (req, res)=>{
    const {category, description, amount, date} = req.body || {};

    if (!category || !description || !amount || !date){
      return res.status(400).json({ error: "Missing required fields" });
    } else {
        const newExpense = {
            id: expenses.length + 1,
            category: category,
            description: description,
            amount: amount,
            date: date
        };
        expenses.push(newExpense);
        res.status(201).json(newExpense);
    };
});

expensesRouter.patch("/:id", (req, res)=>{
    console.log("PATCH REQUEST BODY:", req.body);
    const {category, description, amount, date} = req.body || {};
    const expense = expenses.find((e) => e.id === parseInt(req.params.id));
    if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
    } else {
        if (category) expense.category = category;
        if (description) expense.description = description;
        if (amount) expense.amount = amount;
        if (date) expense.date = date;
        res.json(expense);
    };
});

expensesRouter.delete("/:id", (req, res) => {
    const expenseIndex = expenses.findIndex((e) => e.id === parseInt(req.params.id));
    if (expenseIndex === -1) {
        return res.status(404).json({ error: "Expense not found" });
    }
    expenses.splice(expenseIndex, 1);
    res.status(200).json({ message: "Expense deleted successfully" });
});

export default expensesRouter;