import React, {useEffect} from "react";
import {useState} from "react";
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from "react-native";
import useGetUserList from "../Hook/useGetUserList";
import useBackendPing from "../Hook/useBackendPing";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import useGetChat from "../Hook/useGetChat";
import useGetNewChat from "../Hook/useGetNewChat";
import Chat from '../Components/Chat'
import { useNavigation } from '@react-navigation/native';

const UserList = () =>{
    const [userList, setUserList] = useState('')
    const [selectedId, setSelectedId] = useState(null)
    const [data, setData] = useState('')
    const [topic, setTopic] = useState('')
    const [recipient, setRecipient] = useState('')
    const getUserList = useGetUserList();
    const newChat = useGetNewChat();
    const navigation = useNavigation();
    const handleNewChat = (user) => {

        const userId = user.id;
        setRecipient(user.username);
        newChat(userId).then(data => setTopic(data));
    }

    useEffect(() => {
        if (topic !== '') {
            navigation.navigate('Chat',{
                isTopicId: topic.message.length > 0,
                recipientName: recipient,
                topicId: topic.id
            } )
        }
    }, [topic])

    useEffect( () => {
        getUserList().then(data => {
            console.log(data)
            setData(data)
        })
    }, [])

    const Item =  ({item}) => (
        <TouchableOpacity onPress={() => handleNewChat(item)} style={styles.card}>
            <Text>{item.username}</Text>
        </TouchableOpacity>
    )
    const renderItem = ({item}) => {
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
            />
        )
    }

    return (
        <View style={styles.pages}>
            <View style={styles.cards}>
                <FlatList
                    data={data.users}
                    renderItem={renderItem}
                    extraData={selectedId}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pages:{
        alignItems:'center',
    },
    cards:{
        margin: 100,
        // alignItems: 'center',

        width: '80%',

    },
    card:{
        alignItems: "center",
        margin: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#93b9ad',
    }
})

export default UserList;
