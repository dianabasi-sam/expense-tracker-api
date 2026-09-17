const expenseForm = document.getElementById("expense-form");
const addExpenseButton = document.getElementById("add-expense-button");

const expenseList = document.getElementById("expense-list");

const totalExpensesElement = document.getElementById("total-expenses");
const expenseCountElement = document.getElementById("expense-count");

const viewAllButton = document.getElementById("view-all");
const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./login.html";
});

let allExpenses = [];
let showAllExpenses = false;


const categoryFilter = document.getElementById("category-filter");

categoryFilter.addEventListener("change", () => {
    renderExpenses();
});


const sortSelect = document.getElementById("sort");

sortSelect.addEventListener("change", () => {
    renderExpenses();
});


const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
    renderExpenses();
});

viewAllButton.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "all";
    showAllExpenses=true;
    renderExpenses();
});

function updateExpenseSummary(expenses) {
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const count = expenses.length;
    totalExpensesElement.textContent = `₦${total.toFixed(2)}`;
    expenseCountElement.textContent = count;
}

let editingExpenseId = null;

function displayExpense(expense) {
    
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense-item");

    const categoryElement = document.createElement("h3");
    categoryElement.textContent = expense.category;
    
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = expense.description;
    
    const amountElement = document.createElement("p");
    amountElement.textContent = `₦${parseFloat(expense.amount).toFixed(2)}`;
    amountElement.classList.add("expense-amount")
    
    const dateElement = document.createElement("p");
    dateElement.textContent = expense.date;
    
    const actions = document.createElement("div");
    actions.classList.add("expense-actions");


    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");

    editButton.addEventListener("click", () => {
        editingExpenseId = expense.id;
        categoryInput.value = expense.category;
        descriptionInput.value = expense.description;
        amountInput.value = expense.amount;
        dateInput.value = expense.date;
        expenseForm.style.display = "block";
    });
    
    descriptionInput.addEventListener("input", () => {
        console.log("Description input changed:", descriptionInput.value);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    
    deleteButton.addEventListener("click", () => {

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }
        fetch(`http://localhost:3000/expenses/${expense.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                // expenseItem.remove();
                loadExpenses();
            } else {
                console.error("Failed to delete expense");
            }
        })
        .catch(error => {
            console.error("Error deleting expense:", error);
        });
    });

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    expenseItem.appendChild(categoryElement);
    expenseItem.appendChild(descriptionElement);
    expenseItem.appendChild(amountElement);
    expenseItem.appendChild(dateElement);
    expenseItem.appendChild(actions);
    expenseList.appendChild(expenseItem);
}


function displayNoExpensesMessage() {
    const message = document.createElement("p");
    message.textContent = "No expense found.";
    message.classList.add("no-expenses");
    expenseList.appendChild(message);
}


function renderExpenses() {
    let filteredExpenses = [...allExpenses];

    if (!showAllExpenses){
        filteredExpenses.sort((expenseA, expenseB)=>
        new Date(expenseB.date) - new Date(expenseA.date));

    }

    const selectedCategory = categoryFilter.value;

    if (selectedCategory !== "all") {
        if (selectedCategory === "others") {
        const predefinedCategories = [
            "food",
            "transport",
            "data",
            "entertainment",
            "religion",
            "airtime"
        ];

        filteredExpenses = filteredExpenses.filter(expense =>
            !predefinedCategories.includes(
                expense.category.trim().toLowerCase()
            )
        );
    } else {
        filteredExpenses = filteredExpenses.filter(expense =>
            expense.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
        );
    }
}

    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm !== "") {
        filteredExpenses = filteredExpenses.filter(expense => 
            expense.category.toLowerCase().includes(searchTerm)
        );
    }

    const sortOption = sortSelect.value;
    if (sortOption === "highest") {
        filteredExpenses.sort((expenseA, expenseB) => parseFloat(expenseB.amount) - parseFloat(expenseA.amount));
    }

    if (sortOption === "lowest") {
        filteredExpenses.sort((expenseA, expenseB) => parseFloat(expenseA.amount) - parseFloat(expenseB.amount));
    }

    if (sortOption === "newest") {
        filteredExpenses.sort((expenseA, expenseB) => new Date(expenseB.date) - new Date(expenseA.date));
    }

    if (sortOption === "oldest") {
        filteredExpenses.sort((expenseA, expenseB) => new Date(expenseA.date) - new Date(expenseB.date));
    }

    if(!showAllExpenses && searchInput.value.trim() === "" && categoryFilter.value === "all"){
        filteredExpenses = filteredExpenses.slice(0,3)
    }

    expenseList.innerHTML = "";
    if (filteredExpenses.length === 0) {
        displayNoExpensesMessage();
    } else {
        filteredExpenses.forEach(displayExpense);
    }
};


function loadExpenses() {
    expenseList.innerHTML = "";

    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. Please log in.");
        return;
    }

    fetch("http://localhost:3000/expenses", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(expenses => {
            allExpenses = expenses;
            updateExpenseSummary(expenses);
            renderExpenses();
        });
}

loadExpenses();

expenseForm.style.display = "none";

addExpenseButton.addEventListener("click", () => {
    expenseForm.style.display = "block";
});

const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");

expenseForm.addEventListener("submit", (e) => {
    console.log("SUBMIT VALUES:", {
        category: categoryInput.value,
        description: descriptionInput.value,
        amount: amountInput.value,
        date: dateInput.value
    });
    e.preventDefault();
    const category = categoryInput.value.trim();
    const amount = amountInput.value.trim();
    const date = dateInput.value.trim();
    const description = descriptionInput.value.trim();


    if (!category || !amount || !date || !description) {
        alert("Please fill in all fields.");
        return;
    }

    if (editingExpenseId !== null) {

        
        // Update existing expense
        console.log("SENDING", {
            category: category,
            description: description,
            amount: amount,
            date: date
        });
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }
        fetch(`http://localhost:3000/expenses/${editingExpenseId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ category, description, amount, date })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Expense updated:", data);
            loadExpenses(); // Reload expenses to reflect changes
            expenseForm.reset();
            expenseForm.style.display = "none";
            editingExpenseId = null;
        })
        .catch(error => {
            console.error("Error updating expense:", error);
        });
    } else {
        // Add new expense
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }
        fetch("http://localhost:3000/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        body: JSON.stringify({ category, description, amount, date })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Expense added:", data);
        loadExpenses();
        // updateExpenseSummary([data]);
        // displayExpense(data);
        expenseForm.reset();
        expenseForm.style.display = "none";
    })
    .catch(error => {
        console.error("Error adding expense:", error);
    });
}
});