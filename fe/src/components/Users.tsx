import axios from "axios";
import { useEffect, useState } from "react"
import { Button } from "./ui/Button"
import { useNavigate } from "react-router-dom";
import { BE_URL, SEARCH } from "../utils/const";

interface UserType {
    _id: string,
    username: string,
    firstName: string,
    lastName: string
}

export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const token = localStorage.getItem('token');

    useEffect(()=>{
            axios.get(BE_URL + SEARCH + "?filter=" +filter, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {setUsers(res.data.user)})
            .catch(error => {
                console.error("Error fetching users: ", error.response?.data);
            })
    },[filter]);

    return<div className="p-2">
        <div className="p-2 font-semibold">
            Users
        </div>
        <div className="p-2 w-full">
            <input onChange={(e) => {setFilter(e.target.value)}} type="text" placeholder="Search users..." className="w-full px-2 py-1 border border-slate-200 rounded"></input>
        </div>
        <div>
            {users.map((user: UserType) => <User key={user._id} user={user}/>)}
        </div>
    </div>
}

function User({user}: {user: UserType}) {
    const navigate = useNavigate();

    function handleSendMoney() {
        navigate('/transfer?id=' +user._id + "&name=" + user.firstName);
    }

    return<div className="flex justify-between p-2">
        <div className="flex font-medium">
            <div className="h-12 w-12 mt-1 mr-2 rounded-full bg-slate-200 flex justify-center">
                <div className="h-full flex flex-col justify-center text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="h-full flex flex-col justify-center">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="h-full flex flex-col justify-center">
            <Button label={"Send Money"} onClick={handleSendMoney} />
        </div>
    </div>
}