// ########## start env variables ##########
// app variables
export const PORT: number = parseInt(process.env.PORT as string) || 8000;
export const DEBUG: boolean = (process.env.DEBUG as string) === "true";

export const TAG = process.env.TAG || "local";

export const MONGO_URI: string | undefined = process.env.MONGO_URI;

export const OTP_EXPIRY: number =
    parseInt((process.env.OTP_EXPIRY as string) || "20") * 60 * 1000;

// jwt variables
export const JWT_SECRET: string =
    process.env.JWT_SECRET || Math.random().toString();
export const JWT_EXPIRY: string = process.env.JWT_EXPIRY || "3d";

// email variables
export const EMAIL_ID: string = process.env.EMAIL_ID || "";
export const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD || "";

export const CORS_ORIGIN: string[] = eval(process.env.CORS_ORIGIN || "");

export const TOKEN_EXPIRY_TIME: number =
    parseInt((process.env.TOKEN_EXPIRY_TIME as string) || "20") * 60 * 1000;
// ########## end env variables ##########
