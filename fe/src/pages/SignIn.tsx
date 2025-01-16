import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Heading } from "../components/ui/Heading";
import { InputBox } from "../components/ui/InputBox";
import { SubHeading } from "../components/ui/SubHeading";
import { Warning } from "../components/ui/Warning";
import { ErrorMessage } from "../components/Message";

export function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const redirect = useNavigate();

    async function handleSignIn() {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            })
            localStorage.setItem("token", res.data.token)
            redirect('/dashboard');
        } catch(err: AxiosError) {
            setError(err.response?.data?.message);
        }
    }

    return <div className="bg-blue-100 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox onChange={e => {setUsername(e.target.value)}} label={"Email"} placeholder={"ram@gmail.com"} />
                <InputBox onChange={e => {setPassword(e.target.value)}} label={"Password"} placeholder={"123456"} />
                <div className="pt-4">
                    <Button label={"Sign In"} onClick={handleSignIn} />
                </div>
                {error && <ErrorMessage message={error} />}
                <Warning label={"Don't have an account?"} linkText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}