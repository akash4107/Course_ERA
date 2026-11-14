const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists!" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User successfully registered. Now you can login" });
});

// Internal endpoint serving book data for Axios async/promise calls
public_users.get('/books-data', (req, res) => {
  res.status(200).json(books);
});

// Task 10 (Method 1): Get the book list available in the shop using Async/Await with Axios
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('http://localhost:5000/books-data');
    return res.status(200).send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books", error: error.message });
  }
});

// Task 10 (Method 2): Get book details based on ISBN using Promises with Axios
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  axios.get('http://localhost:5000/books-data')
    .then((response) => {
      const book = response.data[isbn];
      if (book) {
        return res.status(200).send(JSON.stringify(book, null, 4));
      } else {
        return res.status(404).json({ message: "Book not found" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: "Error retrieving book by ISBN", error: error.message });
    });
});

// Task 10 (Method 3): Get book details based on author using Async/Await with Axios
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author.toLowerCase();
  try {
    const response = await axios.get('http://localhost:5000/books-data');
    const allBooks = response.data;
    const filteredBooks = Object.values(allBooks).filter(
      (book) => book.author.toLowerCase() === author
    );

    if (filteredBooks.length > 0) {
      return res.status(200).send(JSON.stringify({ booksbyauthor: filteredBooks }, null, 4));
    } else {
      return res.status(404).json({ message: "No books found for this author" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by author", error: error.message });
  }
});

// Task 10 (Method 4): Get all books based on title using Promises with Axios
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();
  axios.get('http://localhost:5000/books-data')
    .then((response) => {
      const allBooks = response.data;
      const filteredBooks = Object.values(allBooks).filter(
        (book) => book.title.toLowerCase() === title
      );

      if (filteredBooks.length > 0) {
        return res.status(200).send(JSON.stringify({ booksbytitle: filteredBooks }, null, 4));
      } else {
        return res.status(404).json({ message: "No books found with this title" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: "Error retrieving books by title", error: error.message });
    });
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
