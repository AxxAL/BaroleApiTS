import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../Config";

interface IUserInfoAuthRequest extends Request {
    user: any;
}

export function isAuthorized(req: IUserInfoAuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ error: "No token provided" });

    const token = authHeader.split(" ")[1];

    verify(token, config.SECRET, (err: any, user: any) => {
        if (err) return res.status(401).send({ error: "Invalid token" });
        req.user = user;
        next();
    });
}