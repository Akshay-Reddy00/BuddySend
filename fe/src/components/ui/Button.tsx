interface IButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
}

export function Button({label, onClick, className}: IButtonProps){
    return <button onClick={onClick} className={`${className} w-full text-sm px-5 py-3 mb-2 rounded-lg text-white font-medium bg-gray-800 hover:bg-gray-900`}>
            {label}
        </button>
}