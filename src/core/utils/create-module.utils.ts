import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { stdin, stdout } from "process";
import { createInterface } from "readline/promises";

const modulesDirectory = path.resolve("src", "modules");
const readline = createInterface({ input: stdin, output: stdout });

const normalizeModuleName = (value: string): string =>
    value.trim().toLowerCase();

const createModule = async (): Promise<void> => {
    const input = process.argv[2] ?? (await readline.question("Module name: "));
    const moduleName = normalizeModuleName(input);

    if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(moduleName)) {
        console.error(
            "Module name must use kebab-case and start with a letter.",
        );
        process.exitCode = 1;
        return;
    }

    const confirmation = process.argv[2]
        ? "yes"
        : await readline.question(`Create module "${moduleName}"? (y/N): `);

    if (!["y", "yes"].includes(confirmation.trim().toLowerCase())) {
        console.log("Module creation cancelled.");
        return;
    }

    const moduleDirectory = path.join(modulesDirectory, moduleName);
    if (existsSync(moduleDirectory)) {
        console.error(`Module "${moduleName}" already exists.`);
        process.exitCode = 1;
        return;
    }

    const fileNames = [
        `${moduleName}.config.ts`,
        `${moduleName}.controller.ts`,
        `${moduleName}.messages.ts`,
        `${moduleName}.route.ts`,
        `${moduleName}.schema.ts`,
        `${moduleName}.seeder.ts`,
        `${moduleName}.service.ts`,
        `${moduleName}.utils.ts`,
        `${moduleName}.model.ts`,
    ];

    mkdirSync(modulesDirectory, { recursive: true });
    mkdirSync(moduleDirectory);
    for (const fileName of fileNames) {
        writeFileSync(path.join(moduleDirectory, fileName), "", {
            flag: "wx",
        });
    }

    console.log(`Module "${moduleName}" created successfully.`);
};

createModule()
    .catch((error: Error) => {
        console.error(`Unable to create module: ${error.message}`);
        process.exitCode = 1;
    })
    .finally(() => readline.close());
