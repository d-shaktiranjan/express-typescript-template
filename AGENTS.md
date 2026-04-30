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

> Consistency over cleverness.
