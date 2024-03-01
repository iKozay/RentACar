# API Documentation
## Introduction
Welcome to the API documentation for *Our project*. This document provides details on how to interact with the API endpoints to perform various actions within the application.

## Base URL
The base URL for all API endpoints is: `http://localhost:3000/api`

## Authentication
As for the moment, no authentication for the routes yet.
Will will be preforming authentication using 
JSON Web Tokens (JWT) to authenticate, and authorize.

## Endpoints

### Users
Get All Users
* **URL: `/api/users`**
* **Method: `GET`**
* **Description:** get a list containing all users
* **Response:**
    * `200 OK`: Returns an array of post objects.

Get a User by ID
* **URL: `/api/users/:userId`**
* **Method: `GET`**
* **Description:** get user details by ID.
* **Response:**
    * `200 OK`: Returns user details in a JSON
    * `404 Not found`: user not found

Create a New User
* **URL: `/api/users/`**
* **Method: `POST`**
* **Description:** create a new user.
* **Request body:**: 
    ```
    {
    "first_name": "Alice",
    "last_name": "Smith",
    "email": "alice.smith@example.com",
    "phone_number": "+1987654321",
    "date_of_birth": "1985-10-20",
    "profile_picture": "https://exampleImage.com",
    "password": "SecurePassword987!"
    }
    ```
* **Response:**
    * `200 OK`: Returns user details in a JSON
    * `400 bad request`: JSON object containing errors in request body

Update a User by ID
* **URL: `/api/users/:userId`**
* **Method: `PUT`**
* **Description:** update a user with the given ID.
* **Request body:**: 
    ```
    {
    "first_name": "Alice",
    "last_name": "Smith",
    "email": "alice.smith@example.com",
    "phone_number": "+1987654321",
    "date_of_birth": "1985-10-20",
    "profile_picture": "https://exampleImage.com",
    "password": "SecurePassword987!"
    }
    ```
* **Response:**
    * `200 OK`: Returns user details in a JSON
    * `400 bad request`: JSON object containing errors in request body
    * `404`: User not found

Delete a user by ID
* **URL: `/api/users/:userId`**
* **Method: `DELETE`**
* **Description:** delete a user by ID.
* **Response:**
    * `200 OK`: Returns a success message, and user details in a JSON
    * `404 Not found`: user not found
     * `400 bad request`: JSON object containing errors