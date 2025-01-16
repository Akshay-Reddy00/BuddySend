
interface IInputBoxProps {
    label: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputBox({label, placeholder, onChange}: IInputBoxProps){
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded-md font-normal"/>
    </div>
}