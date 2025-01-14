import "dotenv/config"
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers["authorization"];

    if(!authHeader || !authHeader.startsWith('Bearer ')) // [Bearer <token>]
        return res.status(403).json({
            error: 'Authorization token is missing or invalid'
        });

    const token = authHeader.split(' ')[1];

    try {
        if(!`${process.env.JWT_SECRET}`){
            console.error("JWT_SECRET is not defined in environment variables.");
            res.status(500).json({
                error: 'Server config issue'
            })
        }
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch(err) {
        return res.status(403).json({
            message: "Error verifying token"
        });
    }
}
