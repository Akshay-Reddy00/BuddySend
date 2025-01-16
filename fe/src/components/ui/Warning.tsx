import { Link } from "react-router-dom"

interface IWarningProps {
    label: string,
    linkText: string,
    to: string
}
export function Warning({label, linkText, to}: IWarningProps){
    return<div className="py-2 text-sm flex justify-center text-slate-400">
        <div>
            {label}
        </div>
        <Link className="pointer underline pl-1 cursor-pointer hover:font-semibold hover:text-slate-600" to={to}>
            {linkText}
        </Link> 
    </div>
}