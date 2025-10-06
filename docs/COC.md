# Code of Conduct

## Overview

This code of conduct outlines the guidelines and expectations for contributors participating in the project. These rules are designed to ensure consistency and maintain a clean and readable codebase.

## Directory Naming

- **MUST:** Directory names must be in snake case.
- **SHOULD:** Directory name must be in plural form.
- Ex- `routers`, `controllers`

## File Naming

- **MUST:** File names must be in camel case.
- **SHOULD:** Controllers,middlewares,models, route & test file names should include the directory name.
- Ex- `auth.routers.ts`, `auth.model.ts`, `auth.controller.ts`, `auth.test.ts`

## Variable & Class Naming & Declaration

- **MUST:** Variable & function names must be in camel case, Ex- `isValidEmail`,`authStrings`
- **MUST:** Class names must be in pascal case, Ex- `ApiResponse`,`UserModel`
- **MUST NOT:** Use `var` for variable declaration. Prefer `let` and `const` for variable declaration.
- **MUST:** Use meaningful name, Ex- `userObject`,`verificationToken`
- **MUST NOT:** Use random names for variable, file name & folder name.

## API Endpoint Guidelines

- **MUST:** All endpoints **must** use the `/api` prefix.
    - Example: `/api/auth/login`
- **SHOULD:** Resource/module names **should** be in **plural** form.
    - Example: `/api/books`

| Method   | Endpoint         | Description                                                                           |
| -------- | ---------------- | ------------------------------------------------------------------------------------- |
| `GET`    | `/api/books`     | Retrieve a list of books.                                                             |
| `POST`   | `/api/books`     | Create a new book. Even for a single resource, the route should be plural (`/books`). |
| `GET`    | `/api/books/:id` | Retrieve details of a specific book.                                                  |
| `PUT`    | `/api/books/:id` | Replace an entire book object.                                                        |
| `PATCH`  | `/api/books/:id` | Partially update a book.                                                              |
| `DELETE` | `/api/books/:id` | Delete a specific book.                                                               |

**MUST:** Return appropriate HTTP status codes:

- `200 OK` – Successful requests.
- `201 Created` – When a resource is successfully created.
- `204 No Content` – When a resource is successfully deleted or updated without returning data.
- `400 Bad Request` – Invalid request format or parameters.
- `401 Unauthorized` – When authentication fails.
- `403 Forbidden` – When the user is authenticated but not authorized.
- `404 Not Found` – When the requested resource doesn't exist.
- `500 Internal Server Error` – For unexpected server-side errors.

## VCS

- **MUST:** use [Git](https://git-scm.com/) to manage versions.
- **MUST NOT:** directly push to dev & main branch.
- **MUST:** Create PR to dev only.
- **MUST NOT:** Merge failed PR to dev.
- **MUST:** Create a new branch for new feature or bugfix.
- **MUST:** Make atomic commit.
- **MUST:** Be follow branch naming conventions.
- **MUST:** Be follow commit message conventions.
- **MUST:** Follow [Git Conduct](./gitConduct.md).
