interface IButtonProps {
    label: string;
    onClick: () => void;
}

export function Button({label, onClick}: IButtonProps){
    return <button onClick={onClick} className="w-full text-sm px-5 py-3 mb-2 rounded-lg text-white font-medium bg-gray-800 hover:bg-gray-900">
            {label}
        </button>
}