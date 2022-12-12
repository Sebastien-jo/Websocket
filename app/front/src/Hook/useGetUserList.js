import {useSelector} from "react-redux";
import {selectUser} from "../Redux/userSlice";

export default function useGetUserList() {

    const user = useSelector(selectUser);

    return function () {

        return fetch('http://localhost:8245/api/user/list', {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.jwt}`
            }
        })
            .then(data => data.json())
    }
}