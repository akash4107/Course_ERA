# Express Book Review Application

A RESTful server-side web application built with Node.js and Express.js for managing book ratings and reviews. Features JWT & Session-based user authentication, CRUD operations for book reviews, and asynchronous book retrieval using Async/Await and Promises with Axios.

## Project Structure

```
expressBookReview/
├── README.md
├── .gitignore
└── final_project/
    ├── index.js
    ├── package.json
    └── router/
        ├── auth_users.js
        ├── booksdb.js
        └── general.js
```

## Setup & Installation

1. Navigate to the `final_project` directory:
   ```bash
   cd final_project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The server runs on `http://localhost:5000`.
