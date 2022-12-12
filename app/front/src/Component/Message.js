import React from "react";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
import {useSelector} from "react-redux";
import {selectUser} from "../Redux/userSlice";


export default function Message(props) {
    
    const date = props.message.createdAt;
    const user = props.message.user.username;
    const message = props.message.content;

    const currentUser = useSelector(selectUser);

    return user !== currentUser.username ? (

            <div className="d-flex flex-row justify-content-start">
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 1"/>
                <div>
                    <p className="small p-2 ms-3 mb-1 rounded-3">{message}</p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted">{date}</p>
                </div>
            </div>

        ) :
        (
            <div className="d-flex flex-row justify-content-end">
                <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{message}</p>
                    <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">{date}</p>
                </div>
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 1"/>
            </div>
        )
}