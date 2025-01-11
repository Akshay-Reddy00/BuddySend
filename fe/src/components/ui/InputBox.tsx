
interface IInputBoxProps {
    label: string;
    placeholder: string;
}

export function InputBox({label, placeholder}: IInputBoxProps){
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input placeholder={placeholder} className="w-full px-2 py-1 border rounded-md"/>
    </div>
}