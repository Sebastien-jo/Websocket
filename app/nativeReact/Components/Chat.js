import React from "react";
import {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, FlatList, TextInput} from "react-native";
import {useCreateNewTopic} from "../Hook/useCreateNewTopic";
import useGetChat from "../Hook/useGetChat";
import Message from "./Message";
import {SafeAreaView} from "react-native-web";



export default function Chat({ route, navigation }){

    const {isTopicId, recipientName, topicId}  = route.params;
    const [chat, setChat] = React.useState([]);
    const [message, setMessage] = useState('')
    const newMessage = useCreateNewTopic();

    const getChat = useGetChat();
    const [isTopic, setIsTopic] = useState(isTopicId);

    const recipient = recipientName;
    const [isReload, setIsReload] = useState(false);

    // useEffect(() => {
    //     const url = new URL('http://localhost:9090/.well-known/mercure%27');
    //     url.searchParams.append('topic', 'https://example.com/my-private-topic%27');
    //     console.log(url.toString());
    //
    //     const eventSource = new EventSource(url, {
    //         withCredentials: true
    //     });
    //     eventSource.onmessage = (event) => {
    //         setIsReload(true);
    //     };
    //
    //     return () => {
    //         eventSource.close()
    //     }
    // }, [])

    useEffect(() => {
        if (isTopic) {
            getChat(topicId).then(data => setChat(data));
            setIsReload(false);

        }
    }, [isTopic, isReload]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(recipient)
        newMessage(recipient, message).then(data => console.log(data));
        setMessage('');
        if (!isTopic) {
            setIsTopic(true);
            setIsReload(true);
        }
    }

    const renderItem = ({item}) => {
        return (
            <Message
                item={item}
            />
        )
    }

    return (
            <View>
                <FlatList
                    data={chat.message}
                    renderItem={renderItem}
                />
                <View>
                    <TextInput value={message} onChangeText={(message)=>setMessage(message)}/>
                </View>
                <View>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}
