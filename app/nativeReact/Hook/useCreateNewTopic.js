import {useSelector} from "react-redux";
import {selectUser} from "../Redux/userSlice";

export function useCreateNewTopic() {
    const user = useSelector(selectUser);

    return function (recipient, content) {

        return fetch(`http://localhost:8245/api/chat/send-message`, {
        method: 'POST',
            body: new URLSearchParams({
            'content': content,
            'recipient': recipient
        }),
            headers: {
            'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${user.jwt}`
        }
    })
.then(data => data.json())
}
}
