import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { InputBox } from "../components/ui/InputBox";
import { ErrorMessage, SuccessMessage } from "../components/Message";
import { BE_URL, TRANSFER } from "../utils/const";

export function SendMoney(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name")
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const redirect = useNavigate();
    const token = localStorage.getItem('token');

    async function handleTransfer(){
        try {
            await axios.post(BE_URL + TRANSFER, {
                to: id,
                amount: amount
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSuccess(true);
            setTimeout(() => {
                redirect('/dashboard');
            }, 1000)
            
        } catch(err: AxiosError) {
            setError(err.response?.data?.message);
        }
    }
    
    return <div className="h-screen flex justify-center bg-blue-100">
        <div className="h-full flex flex-col justify-center">
            <div className="h-min p-4 w-96 bg-white border text-card-foreground max-w-md space-y-4 shadow-lg rounded-lg">
                <div className="flex items-center justify-center font-bold text-2xl">
                    <img src={'/indian.png'} className="size-8"/><p className="p-2">Send Money</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-xl font-semibold">{name?.[0]}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="p-2 flex flex-col">
                    <div className="p-2">
                        <InputBox onChange={(e) => {setAmount(parseFloat(e.target.value))}} label={"Amount (in Rs)"} placeholder={"Enter amount"} />
                    </div>
                    <div className="flex justify-center">
                        {error && <ErrorMessage message={error} />}
                        {success && <SuccessMessage message={"Transfer successful. Redirecting..."} />}
                    </div>
                    <div className="p-2">
                        <Button onClick={handleTransfer} className={'bg-green-600 hover:bg-green-700'} label={"Initiate Transfer"} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}