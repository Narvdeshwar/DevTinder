# API Documentation

This document provides an overview of the core API endpoints for user authentication and profile management.

---

## User Authentication & Signup

### POST `/api/v1/login`
- Description: Authenticate a user with their credentials.

### POST `/api/v1/signup`
- Description: Register a new user account.

### POST `api/v1/logout`
- Description : for logout the user

---

## Profile Management

### GET `/api/v1/profile`
- Description: Retrieve the authenticated user's profile information.

### PUT `/api/v1/profile/update`
- Description: Update user profile details (e.g., name, email).

### PUT `/api/v1/profile/editpassword`
- Description: Change the user's account password.

---

>  All profile-related routes require authentication via a valid token.
