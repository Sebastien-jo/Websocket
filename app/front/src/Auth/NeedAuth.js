import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../Redux/userSlice";
import {useCookies} from "react-cookie";

export default function NeedAuth(props) {
    let location = useLocation();
    const user = useSelector(selectUser);

    if (user !== {}) {
        return props.children;
    } else {
        return <Navigate to='/login' state={{from: location}}/>
    }
}