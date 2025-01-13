import "dotenv/config"
import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) // [Bearer <token>]
        return res.status(403).json({});

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({})
        }
    } catch(err) {
        return res.status(403).json({});
    }
}