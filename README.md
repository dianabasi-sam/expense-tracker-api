# Expense Tracker API

A simple REST API for managing expenses, built with Node.js and Express.

## Features
- Users can add expenses with a category, amount, and date.
- Users can retrieve their expenses.
- Users can filter expenses by category, amount, or date.
- Users can update existing expenses.
- Users can delete existing expenses.

## Technologies Used
- Javascript
- Node.js
- Express.js
- Postman (for API testing)

## API Endpoints
| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    | `/expenses` | Get all expenses or filter by category, amount or date |
| GET    | `/expenses/:id` | Get a specific expense |
| POST   | `/expenses` | Create New expense |
| PATCH  | `/expenses/:id` | Update a specific expense |
| DELETE | `/expenses/:id` | Remove a specific expense |

## Installation
```bash
git clone https://github.com/dianabasi-sam/expense-tracker-api
cd expense-tracker-api
npm install
```

## Usage
```bash
npm run dev
```
The API runs locally at `http://localhost:3000`

## Testing
You can use Postman to test the API by sending the appropriate request to each endpoint. Add query parameters when required.