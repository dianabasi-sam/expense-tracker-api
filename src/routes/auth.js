import express from "express";

const authRouter = express.Router();

import { pool } from "../db.js";    

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
        [name, email, hashedPassword, "user"]
    );
    res.status(201).json(newUser.rows[0]);
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email, role: user.rows[0].role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", user: {id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email, role: user.rows[0].role}, token });
});

export default authRouter;