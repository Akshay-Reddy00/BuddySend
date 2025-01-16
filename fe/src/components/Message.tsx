export function ErrorMessage({message}: {message: string}){
    return<div className="font-semibold text-sm text-red-600">
        {message}
    </div>
}

export function SuccessMessage({message}: {message: string}){
    return<div className="font-semibold text-sm text-green-600">
        {message}
    </div>
}