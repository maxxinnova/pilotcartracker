import { Request, Response } from "express"

export interface IRequestContext {
    request: Request;
    response: Response;
}
