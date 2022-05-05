import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../Config";

interface IUserInfoAuthRequest extends Request {
    user: any;
}

export function isAuthorized(req: IUserInfoAuthRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) return res.status(401).send({ error: "No token provided" });

    verify(token, config.SECRET, (err: any, user: any) => {
        if (err) return res.status(401).send({ error: "Invalid token" });
        req.user = user;
        next();
    });
}