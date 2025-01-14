import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware";
import { Account } from "../db";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", authMiddleware, async(req: Request, res: Response) => {
    
    try {
        const account = await Account.findOne({
            userId: req.userId
        })

        res.status(200).json({
            balance: account?.balance
        })
    } catch(error) {
        res.status(400).json({
            message: error
        })
    }
})

//transactions
router.post("/transfer", authMiddleware, async(req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const {amount, to} = req.body;

    // get accounts within transaction
    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
        
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: 'Invalid account'
        });
        
    }

    //Perform the transfer
    //add [-amount] : From account 
    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {balance: -amount}
    }).session(session);
    
    //add [+amount] : To account
    await Account.updateOne({
        userId: to
    }, {
        $inc: {balance: amount}
    }).session(session);

    //Commit the transaction
    await session.commitTransaction();
    res.json({
        message: 'Transfer successful'
    })
})


export default router;