let username = "admin";
let password = "1234";

let books = [
    { title: "The Alchemist", author: "Paulo Coelho", issued: false },
    { title: "Atomic Habits", author: "James Clear", issued: false },
    { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", issued: false }
];

// Login
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === username && pass === password) {
        document.getElementById("loginSection").classList.add("hidden");
        document.getElementById("librarySection").classList.remove("hidden");
        displayBooks();
    } else {
        document.getElementById("loginMessage").textContent =
            "Invalid Username or Password!";
    }
}

// Logout
function logout() {
    document.getElementById("loginSection").classList.remove("hidden");
    document.getElementById("librarySection").classList.add("hidden");

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("loginMessage").textContent = "";
}

// Display Books
function displayBooks() {

    let table = document.getElementById("bookTable");

    table.innerHTML = "";

    books.forEach((book, index) => {

        table.innerHTML += `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.issued ? "Issued" : "Available"}</td>
            <td>
                <button class="action-btn issue"
                    onclick="toggleIssue(${index})">
                    ${book.issued ? "Return" : "Issue"}
                </button>

                <button class="action-btn delete"
                    onclick="deleteBook(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

}

// Add Book
function addBook() {

    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();

    if (title === "" || author === "") {
        alert("Please fill all fields.");
        return;
    }

    books.push({
        title: title,
        author: author,
        issued: false
    });

    displayBooks();

    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";

}

// Issue / Return Book
function toggleIssue(index) {

    books[index].issued = !books[index].issued;

    displayBooks();

}

// Delete Book
function deleteBook(index) {

    if (confirm("Are you sure you want to delete this book?")) {

        books.splice(index, 1);

        displayBooks();

    }

}

// Search Book
function searchBook() {

    const input = document.getElementById("searchBook").value.toLowerCase();

    const rows = document.querySelectorAll("#bookTable tr");

    rows.forEach(row => {

        const text = row.textContent.toLowerCase();

        if (text.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}
