import { ReadStream } from "fs";

export interface FileAttachment {
    filename: string;
    content: ReadStream | Buffer;
}

export interface MulterFiles {
    [fieldName: string]: Express.Multer.File[] | undefined;
}
