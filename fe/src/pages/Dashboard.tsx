import { Appbar } from "../components/ui/Appbar";
import { Balance } from "../components/ui/Balance";
import { Users } from "../components/Users";

export function Dashboard(){
    return<div>
        <Appbar />
        <Balance />
        <Users />
    </div>
}