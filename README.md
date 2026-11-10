# Express TypeScript MongoDB Template

## Getting Started

### Using GitHub Template (Recommended)

Click the **"Use this template"** button on GitHub to create your own repository.

### Using degit

```bash
npx degit d-shaktiranjan/express-typescript-template my-app
cd my-app
```

### Using Git Clone

```bash
git clone https://github.com/d-shaktiranjan/express-typescript-template my-app
cd my-app
rm -rf .git
```

# Setup

Use Node.js 24.18 or newer within the 24.x release line. Install [Node.js](https://nodejs.org/en/) using [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script).

```bash
nvm use
```

Then install [pnpm](https://pnpm.io/installation).

```bash
corepack enable
```

Clone the repo and install the dependencies

```bash
pnpm install
```

Create a .env file by running the following command. And add the value into .env

```bash
cp .env.sample .env
```

And run the dev server

```bash
pnpm run dev
```

**MUST** Follow [Code of conduct.](./docs/COC.md)

## Feature modules

Keep feature code under `src/modules/<feature>/`. Shared configuration, libraries,
middleware, and utilities live in `src/core/`. Keep database models inside their
feature modules.

Run `pnpm module:create` for an interactive prompt, or
`pnpm module:create user-profile` to create a module directly. The scaffolder
creates empty config, controller, messages, model, route, schema, seeder, service,
and utility files. Module names and filenames use kebab-case. Existing modules
are never overwritten. Mount new routers in `src/index.ts` under `/api`.

## Compiler compatibility

The `tsc` command uses TypeScript 7 through the `@typescript/native` package alias.
The `typescript` dependency aliases `@typescript/typescript6`, providing the
TypeScript 6 API required by the current ESLint tooling and other compiler API
consumers. Both packages are development dependencies.

This follows the [official TypeScript side-by-side setup](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-60).
Keep these aliases when updating dependencies until the tooling supports the
TypeScript 7 API. The TypeScript configuration uses NodeNext module resolution;
relative dynamic imports use `.js` extensions for compatibility with emitted code.

## API documentation

- `/docs` serves Swagger UI with try-it-out support.
- `/docs/openapi.json` serves the raw OpenAPI specification for API tools.
- `/docs/changelog` lists changelogs, guides, and migration notes from `docs/`.
- `/docs/changelog/<filename>` previews a document; append `/raw` to read its source.

Add endpoints and request/response schemas to
`src/modules/docs/openapi.document.ts` as features are implemented. The starter
specification documents the existing root metadata endpoint; it does not import
Juuno's business APIs. The OpenAPI JSON is served directly to remain compatible
with Swagger and other OpenAPI consumers.

Use `CHANGELOG.<branch-name>.md` for branch changelogs (replace `/` in the branch
name with `-`), `DOCUMENT.<description>.md` for guides, and
`MIGRATION.<description>.md` for migration notes. Only matching regular files are
listed or served; other files and symbolic links are excluded. The viewer offers
filters, Markdown preview, raw view, copy, and download. Markdown rendering and
sanitization assets are served locally, with no CDN requirement.

Documentation routes are public. The build script copies the viewer's HTML,
CSS, and JavaScript into `dist/modules/docs`. Deploy the root `docs/` directory
alongside `dist/`, production dependencies, and `package.json`; start the server
from the project root.
