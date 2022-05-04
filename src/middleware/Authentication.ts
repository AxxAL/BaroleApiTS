import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function isAuthorized(req: Request, res: Response, next: NextFunction) {
    const secret = process.env.SECRET as string;
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) return res.status(401).send({ error: "No token provided" });

    verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: "Invalid token" });
        req.id = decoded;
        next();
    }
}