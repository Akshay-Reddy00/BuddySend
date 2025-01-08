import mongoose from "mongoose";
import 'dotenv/config';


export async function dbConnect() {
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log('***** Connected to DB *****');
    } catch(e){
        console.error('Error connecting to DB', e);
    }
}

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

export const User = mongoose.model("User", userSchema);