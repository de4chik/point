declare namespace Express {
    export interface Request {
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }
}
