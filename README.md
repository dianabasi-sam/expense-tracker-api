# Expense Tracker API

A full-stack expense tracking application built with Node.js, Express, PostgreSQL, HTML, CSS, and JavaScript.

The application allows authenticated users to create, view, filter, update, and delete their own expenses through a REST API and a browser-based interface.

## Features

### Expense Management

- Create new expenses.
- Retrieve expenses belonging to the authenticated user.
- Retrieve a specific expense.
- Update existing expenses.
- Delete existing expenses.
- Filter expenses by category, amount, or date.
- Search expenses by category.
- Sort expenses by newest, oldest, highest amount, or lowest amount.
- View recent expenses or all expenses.
- Display total expenses and expense count.

### Authentication & Authorization

- User registration.
- User login.
- Password hashing with bcrypt.
- JWT-based authentication.
- Protected expense routes.
- User-specific expense access.
- Users cannot access expenses belonging to another user.
- Logout functionality through client-side token removal.
- User roles stored in the database ("user" / "admin").

### Database

The application uses PostgreSQL for persistent data storage.

Database relationships include:

users
  |
  | 1-to-many
  |
expenses

Each expense is associated with the user who created it through the "user_id" foreign key.

### The database also includes:

- Primary keys using identity columns.
- Unique constraint on user email.
- Foreign key relationship between users and expenses.
- Validation constraints on expense amounts and user roles.
- An index on "expenses.user_id".
- Parameterized SQL queries to prevent SQL injection.
- PostgreSQL connection pooling through "pg".

### Technologies Used

- JavaScript
- HTML5
- CSS3
- Node.js
- Express.js
- PostgreSQL
- "pg"
- bcrypt
- JSON Web Tokens (JWT)
- dotenv
- CORS
- Postman
- Nodemon

### Project Structure

src/
├── app.js
├── db.js
├── middleware/
│   └── auth.js
├── public/
│   ├── auth.js
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── register.js
│   ├── scripts.js
│   └── styles.css
└── routes/
    ├── auth.js
    └── expenses.js

### API Endpoints

## Authentication

Method| Endpoint| Description
POST| "/auth/register"| Register a new user
POST| "/auth/login"| Authenticate a user and receive a JWT

### Expenses

## All expense endpoints require authentication.

Method| Endpoint| Description
GET| "/expenses"| Get the authenticated user's expenses
GET| "/expenses/:id"| Get a specific expense
POST| "/expenses"| Create a new expense
PATCH| "/expenses/:id"| Update an expense
DELETE| "/expenses/:id"| Delete an expense

### Expense Filtering

## The "GET /expenses" endpoint supports query parameters:

/expenses?category=Food
/expenses?amount=2500
/expenses?date=2026-09-05

### Multiple filters can also be combined.

### Authentication

After logging in, the API returns a JWT.

Protected requests must include the token in the "Authorization" header:

Authorization: Bearer <JWT>

The authentication middleware verifies the token before allowing access to protected expense routes.

The authenticated user's ID is then used to associate new expenses with that user and restrict access to their own expenses.

### Environment Variables

Create a ".env" file in the project root:

DB_USER=your_database_user
DB_HOST=localhost
DB_NAME=expense_tracker
DB_PASSWORD=your_database_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret

Do not commit the ".env" file to Git.

### Installation

Clone the repository and install the dependencies:

git clone https://github.com/dianabasi-sam/expense-tracker-api
cd expense-tracker-api
npm install

Configure the required environment variables in ".env".

Make sure PostgreSQL is running and the "expense_tracker" database has been created.

### Usage

Start the development server:

npm run dev

The application runs locally at:

http://localhost:3000

Opening the root URL takes the user to the login page.

### Testing

The API can be tested using Postman or through the application's frontend.

Authentication should be completed first to obtain a JWT before accessing protected expense endpoints.

### Tested functionality includes:

- User registration.
- User login.
- Invalid authentication handling.
- Creating expenses.
- Retrieving expenses.
- Filtering expenses.
- Updating expenses.
- Deleting expenses.
- User-specific expense access.
- Protection against accessing another user's expenses.
- Logout.
- Database persistence.

### Database Design

## Users

The "users" table stores:

- "id"
- "name"
- "email"
- "password"
- "role"

## Expenses

The "expenses" table stores:

- "id"
- "category"
- "description"
- "amount"
- "date"
- "user_id"

The "user_id" column references the "id" column of the "users" table.

### Security

The application implements several basic security measures:

- Passwords are hashed using bcrypt before being stored.
- JWTs are used to authenticate protected requests.
- JWT secrets and database credentials are stored in environment variables.
- SQL queries use parameterized values.
- Expense access is restricted using the authenticated user's ID.
- Database constraints provide additional validation.

### License

This project was developed as part of a full-stack development internship project.