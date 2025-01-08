import "dotenv/config";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {z}from "zod";
import {User} from '../db'

const router = express.Router();
const JWT_SECRET = `${process.env.JWT_PASSWORD}`;
const signUpSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
    firstName: z.string().min(2),
    lastName: z.string(),

})

router.post("/signup", async (req: Request, res: Response) => {
    const result = signUpSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(411).json({
            message: "Incorrect input"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already exists"
        })
    }

    const dbUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    res.status(201).json({
        message: "User created successfully",
        token: token
    })
})

export default router;