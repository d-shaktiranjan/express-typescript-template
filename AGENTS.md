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
- Use the shortest appropriate import path:
    - use relative imports such as `./auth.service` for files within the same module.
    - use the matching path alias for imports outside the current directory: `@config/*`, `@libs/*`, `@middlewares/*`, `@modules/*`, or `@utils/*`.
    - use `@modules/*`, such as `@modules/auth/auth.service`, when importing from another module or from outside `src/modules`.
- Use:
    - `camelCase` for variables and functions
    - `PascalCase` for classes
    - `kebab-case` for file and directory names
- Do not introduce inconsistent naming patterns.

---

## Architecture Guidelines

- Follow a **modular (feature-based) structure**:
    - Each feature should be inside `src/modules/<feature>/`
    - Use `pnpm module:create` to scaffold a new feature module.
    - Use singular responsibility suffixes such as `.controller.ts`, `.model.ts`, `.route.ts`, `.schema.ts`, `.service.ts`, and `.utils.ts`.
    - Capitalize the module name in generated model filenames, such as `User.model.ts`.

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

## API Documentation

- Record API changes in the branch changelog; do not maintain a global changelog.
- **Branch changelog** means `docs/CHANGELOG.<branch_name>.md`, with `/` in
  the current branch name replaced by `-` (for example, `feature/patient/lab`
  becomes `docs/CHANGELOG.feature-patient-lab.md`). Do not create or switch
  branches to generate it.
- Compare the current branch and its working changes against `main`, and document
  all API-level differences from that baseline, not just the latest commit.
  Inspect the full diff and relevant implementations; do not copy historical
  changelog entries for APIs that are already present in `main`.
- Write branch changelogs for the frontend team: include added, changed, moved,
  and removed endpoints; methods and full paths; authentication and roles;
  changed request fields, validation, response shapes, status codes, and errors;
  representative request/response examples; compatibility and required frontend
  actions. Describe observable behavior changes and distinguish internal storage
  changes from API contract changes. State when no frontend action is needed.
- Keep one cumulative branch changelog file and update it as the branch changes.
  Record the branch and baseline commit used for comparison. If `main` cannot be
  resolved locally, report that limitation instead of guessing the baseline.
- Use `DOCUMENT.<description>.md` for standalone guides and API reference notes.
- Use `MIGRATION.<description>.md` for standalone migration instructions.
- Migration and documentation notes may instead be included as subsections of
  the branch changelog when a separate file is unnecessary.

---

## General Guidance

- Prefer reusing existing utilities over creating new ones.
- Keep logic simple, readable, and modular.
- Maintain consistency with existing patterns.
- Do not over-comment the codebase; only include necessary comments. Comments should be minimal, necessary, and start with a lowercase letter.
- Avoid emojis on the codebase.
- Use minimal conventional commit messages, and do not create commits unless I explicitly ask.
- Do not create or switch branches unless the user explicitly asks. Work on the current branch by default; this rule takes precedence over branch-creation requirements in other project documents.
- Don't bypass any rule checks or type checks or husky checks.

> Consistency over cleverness.
