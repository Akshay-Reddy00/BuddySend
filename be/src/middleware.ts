import "dotenv/config"
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers["authorization"];

    if(!authHeader || !authHeader.startsWith('Bearer ')) // [Bearer <token>]
        return res.status(403).json({});

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

        if(decoded){
            req.userId = (decoded as JwtPayload).userId;
            next();
        } else {
            return res.status(403).json({
                message: "You are not logged in"
            })
        }
    } catch(err) {
        return res.status(403).json({
            message: "Error logging in"
        });
    }
}