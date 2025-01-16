import axios from "axios";
import { useEffect, useState } from "react";
import { BE_URL, FIRSTNAME } from "../../utils/const";

export function Appbar(){
    const [name, setName] = useState();
    useEffect(() => {
        axios.get(BE_URL + FIRSTNAME, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => setName(res.data.firstname))
        .catch(err => {
            console.error("Error fetching firstname: ", err.response?.data);
        })
    })

    return<div className="bg-blue-400 rounded-b-lg w-full border-b shadow-sm shadow-gray-400 flex items-center justify-between">
        <div className="ml-4 text-3xl font-semibold flex items-center">
            <img src={"/indian-rupee.png"} className="m-2 size-10  bg-gray-600 rounded-full"/>
            BuddySend
        </div>
        <div className="flex items-center justify-between text-2xl font-semibold">
            <p className="m-2">Hello {name}</p>
        </div>

    </div>
}