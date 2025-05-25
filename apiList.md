# API Documentation

This document provides an overview of the core API endpoints for user authentication and profile management.

---

## User Authentication & Signup

### POST `/login`

- Description: Authenticate a user with their credentials.

### POST `/signup`

- Description: Register a new user account.

### POST `/logout`

- Description : for logout the user

### POST `/forgot-password`

- Description : forgot the password

---

## Profile Management

### GET `/profile/view`

- Description: Retrieve the authenticated user's profile information.

### PUT `/profile/update`

- Description: Update user profile details (e.g., name, email).

### PUT `/profile/editpassword`

- Description: Change the user's account password.

## Connection Management

### POST `/request/send/intersted/:userID`

---

> All profile-related routes require authentication via a valid token.
