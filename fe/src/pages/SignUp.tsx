import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Heading } from "../components/ui/Heading";
import { InputBox } from "../components/ui/InputBox";
import { SubHeading } from "../components/ui/SubHeading";
import { Warning } from "../components/ui/Warning";
import { ErrorMessage } from "../components/Message";
import { BE_URL, SIGNUP } from "../utils/const";

export function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const redirect = useNavigate();

    async function handleSignUp() {
        try {
            await axios.post(BE_URL + SIGNUP, {
                firstName,
                lastName,
                username,
                password
            })
            redirect('/signin')
        } catch(err: AxiosError) {
            setError(err.response?.data?.message);
        }
    }

    return <div className="bg-blue-100 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your Information to create an account"} />
                <InputBox onChange={e => {setFirstName(e.target.value)}} label={"First Name"} placeholder={"Ram"} />
                <InputBox onChange={e => {setLastName(e.target.value)}} label={"Last Name"} placeholder={"Raghuvamsha"} />
                <InputBox onChange={e => {setUsername(e.target.value)}} label={"Email"} placeholder={"ram@gmail.com"} />
                <InputBox onChange={e => {setPassword(e.target.value)}} label={"Password"} placeholder={"123456"} />
                <div className="pt-4">
                    <Button label={"Sign up"} onClick={handleSignUp} />
                </div>
                {error && <ErrorMessage message={error} />}
                <Warning label={"Already have an account?"} linkText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}