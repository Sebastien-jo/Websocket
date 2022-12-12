import {useSelector} from "react-redux";
import {selectUser} from "../Redux/userSlice";

export default function useGetChat() {
    const user = useSelector(selectUser);

    return function (recipientId) {
        return fetch(`http://localhost:8245/api/chat/user/${recipientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.jwt}`
            }
        })
            .then(data => data.json())
    }
}
