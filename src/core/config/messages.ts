import { PORT } from "./constants";

// app variables
export const APP_MESSAGES = {
    RUNNING: `App is running on ${PORT}`,
    SERVER_ERROR: "Internal server error.",
    INVALID_SUCCESS_CODE:
        "Invalid success status code. It should be between 200 and 299.",
    INVALID_ERROR_CODE:
        "Invalid error status code. It should be between 400 and 599.",
} as const;

// DB messages
export enum DB_MESSAGES {
    URI_MISSING = "MONGO_URI missing.",
    CONNECTED = "Successfully connected to MongoDB.",
    FAILED = "DB CONNECTION ERROR.",
}

export enum GENERIC_MESSAGES {
    FILE_SIZE_ERROR = "File size must be under 50MB",
    NO_CONTENT = "No content",
    REQUIRED = "REQUIRED",
    FIELD_ERROR = "FIELD_ERROR",
}
