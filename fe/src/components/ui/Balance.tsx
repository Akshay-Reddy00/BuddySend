import axios from "axios";
import { useEffect, useState } from "react"
import { BALANCE, BE_URL } from "../../utils/const";

export function Balance(){
    const [value, setValue] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(BE_URL + BALANCE, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => setValue(res.data.balance))
        .catch(error => {
            console.error("Error fetching users: ", error.response?.data);
        })
    }, [])

    return<div className="m-2 p-2 flex flex-col items-start bg-slate-300 rounded-lg">
        <div className="pt-2 text-black text-xl font-medium">
            ₹ {value}
        </div>
        <div className="text-slate-500 text-sm font-normal">
            Available balance
        </div>
    </div>
}