import { Button } from "../components/ui/Button";
import { Heading } from "../components/ui/Heading";
import { InputBox } from "../components/ui/InputBox";
import { SubHeading } from "../components/ui/SubHeading";
import { Warning } from "../components/ui/Warning";

export function SignUp() {
    return <div className="bg-slate-500 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your Information to create an account"} />
                <InputBox label={"First Name"} placeholder={"Ram"} />
                <InputBox label={"Last Name"} placeholder={"Raghuvamsha"} />
                <InputBox label={"Email"} placeholder={"ram@gmail.com"} />
                <InputBox label={"Password"} placeholder={"123456"} />
                <div className="pt-4">
                    <Button label={"Sign up"} onClick={() => {alert("Signup")}} />
                </div>
                <Warning label={"Already have an account?"} linkText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}