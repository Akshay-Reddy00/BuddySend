import { Button } from "../components/ui/Button";
import { Heading } from "../components/ui/Heading";
import { InputBox } from "../components/ui/InputBox";
import { SubHeading } from "../components/ui/SubHeading";
import { Warning } from "../components/ui/Warning";

export function SignIn() {
    return <div className="bg-slate-500 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox label={"Email"} placeholder={"ram@gmail.com"} />
                <InputBox label={"Password"} placeholder={"123456"} />
                <div className="pt-4">
                    <Button label={"Sign In"} onClick={() => alert("SignIn")} />
                </div>
                <Warning label={"Don't have an account?"} linkText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}