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

Make sure you have [Node.js](https://nodejs.org/en/) using [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script).

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
