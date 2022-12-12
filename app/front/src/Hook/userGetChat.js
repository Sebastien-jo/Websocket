import {useSelector} from "react-redux";
import {selectUser} from "../Redux/userSlice";

export default function useGetChat() {
    const user = useSelector(selectUser);

    return function (topic) {
        return fetch(`http://localhost:8245/api/chat/${topic}`, {
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