# Expense Tracker API

A full-stack expense tracking application built with Node.js, Express, HTML, CSS and Javascript.

## Features

### Expense Management
- Users can add new expenses with a category, amount, and date.
- Users can retrieve their expenses.
- Users can filter expenses by category, amount, or date.
- Users can update existing expenses.
- Users can delete existing expenses.

### Filtering and Sorting
- Users can search expenses by category.
- Users can filter expenses by category.
- Users can view custom categories under "others".
- Users can sort expenses by newest, oldest, highest amount, or lowest amount.
- Users can view the three most recent expenses, with an option to view all expenses.

### Frontend
- Responsive user interface.
- Dynamic rendering of expenses.
- Expense summary showing total expenses and expense count.
- Mobile friendly layout.

## Technologies Used
- Javascript
- HTML5
- CSS3
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