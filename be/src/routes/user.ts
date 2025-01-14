import "dotenv/config";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z }from "zod";
import { Account, User } from '../db'
import { authMiddleware } from "../middleware";

const router = express.Router();
const JWT_SECRET = `${process.env.JWT_SECRET}`;
const signUpSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
    firstName: z.string().min(2),
    lastName: z.string(),
})

const signInSchema = z.object({
    username: z.string(),
    password: z.string()
})

const updateSchema = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
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
            message: "Username already exists"
        })
    }

    const dbUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    const userId = dbUser._id; //create new account
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000 // Skip bank integration
    })

    // const token = jwt.sign({
    //     userId: dbUser._id
    // }, JWT_SECRET);

    res.status(201).json({
        message: "User created successfully",
        // token: token
    })
})

router.post("/signin", async (req: Request, res: Response) => {
    const result = signInSchema.safeParse(req.body)
    if(!result.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })

        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

router.put("/update", authMiddleware, async (req: Request, res: Response) => {
    const response = updateSchema.safeParse(req.body);
    if(!response.success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    if (Object.keys(req.body).length === 0){
        return res.status(400).json({
            message: "No fields to update"
        })
    }

    try {
        await User.updateOne({_id: req.userId}, req.body)
    } catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
    
    res.status(200).json({
        message: "Updated successfully",
        _id: req.userId,
    })
})

router.get("/bulk", authMiddleware, async (req: Request, res: Response) => {
    const searchFilter = req.query.filter || "";

    const users  = await User.find({
        $or: [{
            firstName: {
                "$regex": searchFilter
            }
        }, {
            lastName: {
                "$regex": searchFilter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

export default router;