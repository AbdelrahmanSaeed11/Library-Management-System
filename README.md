# Library Management System

## Overview

This is a simple application that manages books and the borrowing process. It allows users to borrow books, track borrowings, and generate various reports related to book lending.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js**: Version 18 or higher.
- **MySQL Workbench**: For database management.
- **Docker**: For containerization.
- **Postman**: Recommended for testing the API endpoints.

## Installation Instructions

### Clone the Repository

Begin by cloning the GitHub repository:

```bash
git clone https://github.com/AbdelrahmanSaeed11/Library-Management-System
```

### Install Dependencies

In the root directory of the application, run:

```bash
npm install
```

### Setting Up Environment Variables

This application uses several environment variables for configuration. Below is a list of the required environment variables, their descriptions, and default values (if applicable).

#### Required Environment Variables

| Variable         | Description                                              | Default Value      |
| ---------------- | -------------------------------------------------------- | ------------------ |
| `DB_HOST`        | The hostname of the database server.                     | `localhost`        |
| `DB_PORT`        | The port number on which the database server is running. | `3306` (for MySQL) |
| `DB_USER`        | The username for connecting to the database.             | `root`             |
| `DB_PASSWORD`    | The password for the database user.                      | `yourpassword`     |
| `DB_NAME`        | The name of the database to connect to.                  | `yourdatabase`     |
| `PORT`           | The port number on which the Express app runs.           | `3000`             |
| `TZ`             | The timezone for the application.                        | `UTC`              |
| `JWT_SECRET_KEY` | The secret key used for signing JWT tokens.              | `your_jwt_secret`  |

1. **Create a `.env` file** in the root directory of your project if it doesn't already exist.

2. **Add the environment variables** to the `.env` file in the following format:

   ```plaintext
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=yourdatabase
   PORT=3000
   TZ=UTC
   JWT_SECRET_KEY=your_jwt_secret
   ```

### Running the Application

#### Using Node.js

To start the application, use the following command:

```bash
node server.js
```

#### Using Docker

The application is also dockerized. To run it using Docker, execute:

```bash
docker-compose up --build
```

## API Endpoints

### Authentication

#### 1. POST /auth/login

- **Description**: Authenticate an admin and receive a token.
- **Request Body**:
  ```json
  {
    "email": "admin@bosta.com",
    "password": "admin"
  }
  ```
- **Response**:
  - **Status Code**: 200
  - **Response Body**:
    ```json
    {
      "token": "your_jwt_token_here"
    }
    ```

### Book Management

#### 2. GET /book

- **Description**: Retrieve a list of all books.
- **Response**:
  - **Status Code**: 200
  - **Response Body**:
    ```json
    [
      {
        "id": 1,
        "title": "Book Title",
        "author": "Book Author",
        "isbn": "Book ISBN",
        "available_quantity": 1,
        "shelf_location": "Book Shelf Location",
        "created_at": "2024-09-25T01:43:36.000Z",
        "updated_at": "2024-09-25T16:49:08.000Z"
      }
    ]
    ```

#### 3. GET /book/search

- **Description**: Retrieve a list of all books with specific search criteria.
- **Request Query Parameters**:
  ```json
  {
    "title": "TITLE",
    "author": "AUTHOR",
    "isbn": "ISBN"
  }
  ```
- **Response**:
  - **Status Code**: 200
  - **Response Body**:
    ```json
    [
      {
        "id": 1,
        "title": "Book Title",
        "author": "Book Author",
        "isbn": "Book ISBN",
        "available_quantity": 1,
        "shelf_location": "Book Shelf Location",
        "created_at": "2024-09-25T01:43:36.000Z",
        "updated_at": "2024-09-25T16:49:08.000Z"
      }
    ]
    ```

#### 4. POST /book

- **Description**: Add new book.
- **Authorization**: Bearer Token is required.
- **Request Body**:
  ```json
  {
    "title": "TITLE",
    "author": "AUTHOR",
    "isbn": "ISBN",
    "availableQuantity": 5,
    "shelfLocation": "SHELF LOCATION"
  }
  ```
- **Response**:
  - **Status Code**: 201
  - **Response Body**:
    ```json
    {
      "id": "ID",
      "message": "MESSAGE"
    }
    ```
- **Error Response**
  - **Code**: `400 Bad Request`, `401 Unauthorized`, `409 Conflict`

#### 5. PUT /book/:id

- **Description**: Update book details.
- **Authorization**: Bearer Token is required.
- **Request Body**:
  ```json
  {
    "title": "TITLE",
    "author": "AUTHOR",
    "isbn": "ISBN",
    "availableQuantity": 5,
    "shelfLocation": "SHELF LOCATION"
  }
  ```
- **Response**:
  - **Status Code**: 200
  - **Response Body**:
    ```json
    {
      "message": "MESSAGE"
    }
    ```
- **Error Response**
  - **Code**: `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `409 Conflict`

#### 6. DELETE /book/:id

- **Description**: Delete a book.
- **Authorization**: Bearer Token is required.
- **Response**:
  - **Status Code**: 204
- **Error Response**
  - **Code**: `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `409 Conflict`

### Borrowers

#### 7. GET /borrower

- **Description**: Retrieve a list of all registered borrowers.
- **Response**:
  - **Status Code**: 200
  - **Response Body**:
    ```json
    [
      {
        "id": 1,
        "name": "NAME",
        "email": "EMAIL",
        "registered_date": "2024-09-25T16:12:08.000Z"
      }
    ]
    ```

#### 8. POST /borrower

- **Description**: Add new borrower.
- **Authorization**: Bearer Token is required.
- **Request Body**:
  ```json
  {
    "name": "NAME",
    "email": "EMAIL"
  }
  ```
- **Response**:
  - **Status Code**: 201
  - **Response Body**:
    ```json
    {
      "id": "ID",
      "message": "MESSAGE"
    }
    ```
- **Error Response**
  - **Code**: `400 Bad Request`, `401 Unauthorized`, `409 Conflict`

#### 9. PUT /borrower/:id

- **Description**: Update borrower details.
- **Authorization**: Bearer Token is required.
- **Request Body**:
  ```json
  {
    "name": "NAME",
    "email": "EMAIL"
  }
  ```
- **Response**:
  - **Status Code**: 200
  - **Response Body**:
    ```json
    {
      "message": "MESSAGE"
    }
    ```
- **Error Response**
  - **Code**: `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `409 Conflict`

#### 10. DELETE /borrower/:id

- **Description**: Delete a borrower.
- **Authorization**: Bearer Token is required.
- **Response**:
  - **Status Code**: 204
- **Error Response**
  - **Code**: `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `409 Conflict`

#### 11. GET /borrower/:id/borrowings

- **Description**: Retrieve all books that borrower currently have.
- **Response**:
  - **Status Code**: 200
  - **Response Body**:
    ```json
    [
      {
        "book_id": 6,
        "title": "TITLE",
        "author": "AUTHOR",
        "isbn": "ISBN",
        "shelf_location": "SHELF LOCATION",
        "borrowed_at": "2024-09-05T17:20:00.000Z",
        "due_date": "2024-09-19T00:00:00.000Z"
      }
    ]
    ```

#### 12. POST /borrower/:id/book/checkout

- **Description**: Borrower checkout a book.
- **Authorization**: Bearer Token is required.
- **Request Body**:
  ```json
  {
    "bookId": "BOOK ID",
    "dueDate": "DUE DATE"
  }
  ```
- **Response**:
  - **Status Code**: 201
  - **Response Body**:
    ```json
    {
      "message": "MESSAGE"
    }
    ```
- **Error Response**
  - **Code**: `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `409 Conflict`

#### 13. POST /borrower/:id/book/return

- **Description**: Borrower return a book.
- **Authorization**: Bearer Token is required.
- **Request Body**:
  ```json
  {
    "bookId": "BOOK ID"
  }
  ```
- **Response**:
  - **Status Code**: 200
  - **Response Body**:
    ```json
    {
      "message": "MESSAGE"
    }
    ```
- **Error Response**
  - **Code**: `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `409 Conflict`

### Borrowings Reports

#### 14. GET /borrowing/overdue

- **Description**: Retrieve a list of all overdue borrowings.
- **Authorization**: Bearer Token is required.
- **Response**:
  - **Status Code**: 200 OK
  - **Response Body**:
    ```json
    [
      {
        "book_id": 3,
        "title": "TITLE",
        "author": "AUTHOR",
        "isbn": "ISBN",
        "shelf_location": "SHELF LOCATION",
        "borrower_id": 2,
        "name": "BORROWER NAME",
        "email": "BORROWER EMAIL",
        "borrowed_at": "2024-07-20T14:30:00.000Z",
        "due_date": "2024-08-03T00:00:00.000Z"
      }
    ]
    ```

#### 15. GET /borrowing/reports/export

- **Description**: Export a CSV/XLSX file for all borrowings processes in a specific period.
- **Authorization**: Bearer Token is required.
- **Request Query Parameters**:
  - startDate: isO 8601 date format
  - endDate: isO 8601 date format
  - format: "csv" | "xlsx"
- **Response**:
  - **Status Code**: 200 OK
  - **Response Body**:
    - **Content Type**: "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

#### 16. GET /borrowing/reports/last-month/export

- **Description**: Export a CSV/XLSX file for all borrowings processes in the last month.
- **Authorization**: Bearer Token is required.
- **Request Query Parameters**:
  - format: "csv" | "xlsx"
- **Response**:
  - **Status Code**: 200 OK
  - **Response Body**:
    - **Content Type**: "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

#### 17. GET /borrowing/reports/overdue/last-month/export

- **Description**: Export a CSV/XLSX file for all overdue borrowings processes in the last month.
- **Authorization**: Bearer Token is required.
- **Request Query Parameters**:
  - format: "csv" | "xlsx"
- **Response**:
  - **Status Code**: 200 OK
  - **Response Body**:
    - **Content Type**: "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

#### 18. GET /borrowing/reports/returned/last-month/export

- **Description**: Export a CSV/XLSX file for all returned borrowings processes in the last month.
- **Authorization**: Bearer Token is required.
- **Request Query Parameters**:
  - format: "csv" | "xlsx"
- **Response**:
  - **Status Code**: 200 OK
  - **Response Body**:
    - **Content Type**: "text/csv" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

### Rate Limiting

The application implements rate limiting for the following endpoints:

- **POST /auth/login**
- **PUT /borrowers/:id**

### Authentication

The application uses Bearer Token authorization. After logging in, you will receive a token. Use this token in the `Authorization` header for endpoints that require authentication:

```
Authorization: Bearer your_jwt_token_here
```

### Note for Testing File Responses in Postman

When testing the borrowings report endpoints that return files (e.g., CSV or XLSX), Postman provides an easy way to download the file after receiving a response.

1. Send the request as usual.
2. Once the response is returned, click on the **"Save Response"** button.
3. From the dropdown, choose **"Save Response to file"** to download the file (CSV/XLSX) to your computer.

## Conclusion

This Book Management Application provides a straightforward way to manage books and borrowing processes. For any issues or contributions, please open an issue or pull request on the GitHub repository.
