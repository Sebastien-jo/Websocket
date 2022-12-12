import React, {useState, useEffect} from 'react';
import Message from "./Message";
import useGetChat from "../Hook/userGetChat";
import {useLocation} from "react-router-dom";
import '../assets/style/Chat.css';
import {useCreateNewTopic} from "../Hook/useCreateNewTopic";

export default function Chat() {

    const [chat, setChat] = React.useState([]);
    const state = useLocation();
    const newMessage = useCreateNewTopic();

    const getChat = useGetChat();
    const [isTopic, setIsTopic] = useState(state.state.isTopic);
    const recipient = state.state.recipient;
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://example.com/my-private-topic');
        console.log(url.toString());

        const eventSource = new EventSource(url, {
            withCredentials: true
        });
        eventSource.onmessage = (event) => {
            console.log(event.data);
            setIsReload(true);
        };

        return () => {
            eventSource.close()
        }
    }, [])


    useEffect(() => {
        if (isTopic) {
            getChat(state.state.topic).then(data => setChat(data));
            setIsReload(false);
        }
    }, [isTopic, isReload]);


    const handleSubmit = (e) => {
        e.preventDefault();
        newMessage(recipient, e.target.message.value).then(data => console.log(data));
        e.target.message.value = '';
        if (!isTopic) {
            setIsTopic(true);
        }
    }

    return (
        <section>
            <a href={"/"} className="btn btn-warning">Retour</a>
            <div className="container py-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-6">

                        <div className="card" id="chat2">
                            <div className="card-header d-flex justify-content-between align-items-center p-3">
                                <h5 className="mb-0">Chat</h5>
                            </div>
                            <div className="card-body" data-mdb-perfect-scrollbar="true">
                                {
                                    isTopic ?
                                        <>
                                            {
                                                chat.length !== 0 ?
                                                    chat.message.map((message, index) => {
                                                        return <Message key={index} message={message}/>
                                                    }) :
                                                    null
                                            }
                                        </>
                                        : <p>Envoyez un message pour démarrer la conversation</p>
                                }
                            </div>

                            <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                     alt="avatar 3"/>
                                <form className="me-3" onSubmit={handleSubmit}>
                                    <input type="text" name="message" className="form-control form-control-lg"
                                           id="exampleFormControlInput1"
                                           placeholder="Type message"/>
                                    <button type="submit" className="btn btn-primary btn-sm">Envoyer</button>
                                </form>
                                <a className="ms-1 text-muted" href="#!"><i
                                    className="fas fa-paperclip"></i></a>
                                <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
                                <a className="ms-3" href="#!"><i className="fas fa-paper-plane"></i></a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}