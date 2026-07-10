# AGENTS.md

## Project Overview

This project is an **Express.js-based backend application** written in TypeScript.

---

## Essentials

- Use `pnpm` as the package manager (**do not use npm or yarn**).
- Do **not** run `pnpm dev` unless explicitly instructed.
- Do **not** run `pnpm build` unless explicitly instructed.
- Use `pnpm typecheck` for type-check verification.
- Use `pnpm check` for linting, formatting, and spelling checks.
- Avoid using `any` and `unknown` as types.
- Follow the [Code of Conduct](docs/COC.md).

---

## Coding Standards

- Follow the existing project structure and naming conventions strictly.
- Use:
    - `camelCase` for variables and functions
    - `PascalCase` for classes
    - `kebab-case` for file and directory names
- Do not introduce inconsistent naming patterns.

---

## Architecture Guidelines

- Follow a **modular (feature-based) structure**:
    - Each feature should be inside `src/modules/<feature>/`

- Keep responsibilities separated:
    - controllers → request/response handling
    - schemas → validation
    - models → database layer
    - services → For example, suppose we have two controllers: one with getAllPosts() for admins and another with getPublicPosts() for public users. The logic is almost the same, with the only difference being the filter. Instead of duplicating the logic, we create a service such as getPostsService(filter: Record<string, boolean> | null = null). In the admin controller, we can call getPostsService() to retrieve all posts. In the public controller, we can call getPostsService({ isPublic: true }) to retrieve only public posts. This is a simple example of how to use controllers and services effectively.

---

## API Rules

- Always use standardized response helpers:
    - `successResponse`
    - `errorResponse`

- Do not send raw `res.json()` responses directly.
- Throw `ApiError` for controlled errors instead of generic errors only within utility functions. For example, in a utility like `getUserByEmail(email: string)`, if no user is found, use `throw ApiError("User not found", 404)`.

---

## Safety Rules

- Do not modify configuration files unless necessary.
- Do not introduce new dependencies unless explicitly required.
- Do not refactor large parts of the codebase unless instructed.

---

## Testing & Validation

- Ensure all changes pass:
    - `pnpm typecheck`
    - `pnpm check`

---

## General Guidance

- Prefer reusing existing utilities over creating new ones.
- Keep logic simple, readable, and modular.
- Maintain consistency with existing patterns.
- Do not over-comment the codebase; only include necessary comments. Comments should be minimal, necessary, and start with a lowercase letter.
- Avoid emojis on the codebase.
- Use minimal conventional commit messages, and do not create commits unless I explicitly ask.
- Don't bypass any rule checks or type checks or husky checks.

> Consistency over cleverness.
