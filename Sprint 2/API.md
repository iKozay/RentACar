# API Documentation
## Introduction
Welcome to the API documentation for *Our project*. This document provides details on how to interact with the API endpoints to perform various actions within the application.
This is a *RESTish* api, all responses are in *JSON* format.

## Base URL
The base URL for all API endpoints is: `http://localhost:3000/api`

## Authentication
Authentication and Authorization using 
JSON Web Tokens (JWT).
Our authorization works as the following:
When the user signs up, the route returns a *refresh token*
which is stored securely in the *cookies*, and another short lived
*access token* which is returned to the client, where it is stored in the *localStorage* to be used for future fetching.
When the *access token* expires, the client have to fetch the *refreshToken* route using the *refresh token* in order to obtain a new *access token*.
Passing the *access token* inside the Headers of the fetch function is required for almost all endpoints .

## Endpoints

### auth
Sign up
* **URL: `/api/auth/signup`**
* **Method: `POST`**
* **Description:** sign-up a user.
* **Request Body:**:
    ```
    {
    "username":"Alice333",
    "first_name": "Alice",
    "last_name": "Smith",
    "email": "alice.smith@example.com",
    "phone_number": "+1987654321",
    "date_of_birth": "1985-10-20",
    "profile_picture": "https://exampleImage.com",
    "password": "SecurePassword987!",
    "role":"customer
    }
    ```
* **Response:**
    * `200 OK`: user details in a JSON
    * `400`: duplicate key
    * `500`: Mongodb related error

Login
* **URL: `/api/auth/login`**
* **Method: `POST`**
* **Description:** login a user.
* **Request Body:**:
    ```
    {
    "username":"Alice333",
    "password": "SecurePassword987!",

    }
    ```
* **Example:**
    ```
    async function login() {
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          });
          const data = await response.json(); 
          if (response.ok) {
            localStorage.setItem("token", data.token);// storing the access token for future usage.
            alert("success");
          } else {
            alert(data.error || "Login failed");
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      }
    ```
* **Response:**
    * `201 OK`: returns an access token in a JSON
    * `401`: Invalid username / Invalid password
    * `500`: Internal server error
    * `501`: error creating JSON Web Tokens

Logout
* **URL: `/api/auth/logout`**
* **Method: `GET`**
* **Description:** logout the user.
* **Required Headers**: Authorization
* **Response:**
    * `200 OK`: Returns a success message
    * `500`: Internal server error
    * `501`: Error destroying the session

Refresh Access Token
* **URL: `/api/auth/refreshToken`**
* **Method: `GET`**
* **Description:** refresh *access token* using *refresh token*.
* **Required Options**:```credentials: "include" ``` to include refresh token from cookies,
* **Example**: 
    ```
    async function refreshToken() {
        try {
          const response = await fetch("/api/auth/refreshToken", {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          localStorage.setItem("token", data.token);// setting the new access token
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
    ```
* **Response:**
    * `200 OK`: Returns a success message
    * `500`: Internal server error
    * `501`: Error destroying the session
    
### Users
Get All Users
* **URL: `/api/users`**
* **Method: `GET`**
* **Required Headers**: Authorization
* **Description:** get a list containing all users
* **Restrictions:**: Admin only
* **Example**:
    ```
      async function users() {
        try {
          const response = await fetch("/api/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,// Adding the accessToken stored in the clientSide
            },
          });
          const data = await response.json();
          console.log(data); // Log the token in the response
        } catch (error) {
          console.error("Error:", error);
        }
      }
    ```
* **Response:**
    * `200 OK`: Returns an array of post objects.
    * `401`: Unauthorized

Get a User by ID
* **URL: `/api/users/:userId`**
* **Method: `GET`**
* **Required Headers**: Authorization
* **Description:** get user details by ID.
* **Restrictions:**: Admin only
* **Response:**
    * `200 OK`: Returns user details in a JSON
    * `401`: Unauthorized
    * `404 Not found`: user not found

Create a New User
* **URL: `/api/users/`**
* **Method: `POST`**
* **Description:** create a new user.
* **Required Headers**: Authorization
* **Restrictions:** Admin only
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
* **Example**:
    ```
    async function createUser(userData) {
        try {
            const response = await fetch('/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,// Adding the accessToken stored in the clientSide
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error || 'Failed to create user');
            }

            const newUser = await response.json();
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw error;
        }
    }
    ```
* **Response:**
    * `200 OK`: Returns user details in a JSON
    * `401`: Unauthorized
    * `400 bad request`: JSON object containing errors in request body

Update a User by ID
* **URL: `/api/users/:userId`**
* **Method: `PUT`**
* **Description:** update a user with the given ID.
* **Required Headers**: Authorization
* **Request body:**: 
    ```
    {
    "username":"Alice333",
    "first_name": "Alice",
    "last_name": "Smith",
    "email": "alice.smith@example.com",
    "phone_number": "+1987654321",
    "date_of_birth": "1985-10-20",
    "profile_picture": "https://exampleImage.com",
    "password": "SecurePassword987!",
    "role":"customer
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
* **Required Headers**: Authorization
* **Response:**
    * `200 OK`: Returns a success message, and user details in a JSON
    * `404 Not found`: user not found
    * `400 bad request`: JSON object containing errors
    * `401`: Unauthorized


### API Endpoints for Create a Vehicle

1. **Create a new Vehicle**
   - **URL**: `http://localhost:3000/api/vehicles/add`
   - **Method**: `POST`
   - **Description**: Creates a new Vehicle and stores it in the database.
   - **Required Headers**: Authorization
   - **Request body**:
    ```
    {
    "make": "Audi",
    "model": "A4",
    "price": 35000,
    "transmisssion": "Automatic",
    "numberOfSeats": 5,
    "address": "123 Main Street, Anytown, USA",
    "colour": "Black",
    "numberOfDoors": 4,
    "numberOfBaggage": 2,
    "kilometrage": 25000,
    "electricalOrFuel": "Fuel",
    "Avaibality": "Available",
    "Image": "https://example.com/audi_a4.jpg"
    }
    ```


2. **View all Vehicles**
   - **URL**: `http://localhost:3000/api/vehicles/vehicles`
   - **Method**: `GET`
   - **Description**: Retrieves all Vehicles in the database.
   - **Required Headers**: Authorization

3. **View a Vehicle by its ID**
   - **URL**: `http://localhost:3000/api/vehicles/vehicle/:id`
   - **Method**: `GET`
   - **Description**: Retrieves the vehicle with the mentioned id.
   - **Required Headers**: Authorization
     

4. **Update a Vehicle**
   - **URL**: `http://localhost:3000/api/vehicles/update/:id`
   - **Method**: `PUT`
   - **Description**: Modifies an existing vehicle with the provided changes.
   - **Required Headers**: Authorization
   - **Request Body**:
     ```
     {
       "transmisssion": "Manual"
     }
     ```

5. **Delete a Vehicle**
   - **URL**: `http://localhost:3000/api/vehicles/delete/:id`
   - **Method**: `DELETE`
   - **Description**: Deletes a vehicle by its ID.
   - **Required Headers**: Authorization
  



### API Endpoints for Reservation Management
*replace userId or reservationId with actual ID taken from database

1. **View all reservations for a user**
   - **URL**: `http://localhost:3000/api/reservations/user/userId`
   - **Method**: `GET`
   - **Description**: Retrieves all reservations associated with the specified user ID.
   - **Required Headers**: Authorization

2. **View a reservation by its ID**
   - **URL**: `http://localhost:3000/api/reservations/reservationId`
   - **Method**: `GET`
   - **Description**: Retrieves a reservation by its ID.
   - **Required Headers**: Authorization

3. **Create a new reservation**
   - **URL**: `http://localhost:3000/api/reservations`
   - **Method**: `POST`
   - **Description**: Creates a new reservation.
   - **Required Headers**: Authorization
   - **Request Body**:
     ```json
      {
        "vin": "65e52b7f3a6b6fac482c8278",
        "reservationDate": "2024-03-08T00:00:00.000Z",
        "pickupDate": "2024-03-09T00:00:00.000Z",
        "returnDate": "2024-03-10T00:00:00.000Z",
        "userID": "65ef29928e591664663d138d",
        "status": "not checked in",
        "addons": {
            "insurance": true,
            "gps": true,
            "childSeat": 2
        }
     }

     ```

4. **Modify a reservation**
   - **URL**: `http://localhost:3000/api/reservations/reservationId`
   - **Method**: `PUT`
   - **Description**: Modifies an existing reservation with the provided changes.
   - **Required Headers**: Authorization
   - **Request Body**:
     ```json
     {
       "pickupDate": "2024-03-12T10:00:00Z",
       "returnDate": "2024-03-17T10:00:00Z",
       "status": "checked in"
     }
     ```

5. **Cancel a reservation**
   - **URL**: `http://localhost:3000/api/reservations/reservationId`
   - **Method**: `DELETE`
   - **Description**: Cancels a reservation by its ID.
   - **Required Headers**: Authorization


