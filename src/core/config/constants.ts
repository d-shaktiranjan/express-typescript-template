// ########## start env variables ##########
// app variables
export const PORT: number = parseInt(process.env.PORT as string) || 8000;
export const DEBUG: boolean = (process.env.DEBUG as string) === "true";

export const TAG = process.env.TAG || "local";

export const MONGO_URI: string | undefined = process.env.MONGO_URI;

export const CORS_ORIGIN: string[] = eval(process.env.CORS_ORIGIN || "");
export const MULTER_SIZE_LIMIT: number = parseInt(
    process.env.MULTER_SIZE_LIMIT || "1",
);
// ########## end env variables ##########
