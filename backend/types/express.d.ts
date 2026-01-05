import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            files?: fileUpload.FileArray;
            user?: JwtPayload & {
                id: number;
                email: string;
                role: string;
                nickname: string;
            };
        }
    }
}

export {};
