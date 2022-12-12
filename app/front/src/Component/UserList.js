import React, {useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import {useGetNewChat} from "../Hook/useGetNewChat";
import {Link, useNavigate} from "react-router-dom";
import '../App.css';


export default function UserList() {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
    const [topic, setTopic] = useState("");
    const [recipient, setRecipient] = useState("");
    const newChat = useGetNewChat();
    const getUserList = useGetUserList();


    const handleNewChat = (user) => {
        const userId = user.id;
        setRecipient(user.username);
        newChat(userId).then(data => setTopic(data));
    }

    useEffect(() => {
        if (topic !== "") {
            navigate(`/chat/${topic.id}`, {
                state: {
                    topic: topic.id,
                    isTopic: topic.message.length > 0 ? true : false,
                    recipient: recipient
                }
            });
        }
    }, [topic])

    useEffect(() => {
        getUserList().then(data => setUserList(data.users));
    }, [])


    return (
        <div className='m-5 text-center div_userlist'>
            <h1 className='m-5 text-center'>What's app</h1>
            <Link to={'/user'} className='btn btn-primary mb-5'>Connexion Qr Code</Link>

            <h2>Messages</h2>
            {userList.map((user) => (
                <div className="user_row">
                    <div>
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                            alt="avatar 1"/>
                        <span>{user.username}</span>
                    </div>
                    <button className='btn btn-dark w-100' type='submit' value={user.id}
                            onClick={() => handleNewChat(user)}>Message
                    </button>
                </div>

            ))}
        </div>
    )
}
