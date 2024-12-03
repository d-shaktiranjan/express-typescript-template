import { PORT } from "./constants";

// app variables
export const APP_MESSAGES = {
    RUNNING: `App is running on ${PORT}`,
    SERVER_ERROR: "Internal server error.",
} as const;

// DB messages
export enum DB_MESSAGES {
    URI_MISSING = "MONGO_URI missing.",
    CONNECTED = "Successfully connected to MongoDB.",
    FAILED = "DB CONNECTION ERROR.",
}

export enum GENERIC_MESSAGES {
    FILE_SIZE_ERROR = "File size must be under 50MB",
}
