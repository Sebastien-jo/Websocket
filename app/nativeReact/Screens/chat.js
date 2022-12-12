
import React from "react";
import {View, Text, Image} from "react-native";
import {SafeAreaView} from "react-native";
import Chat from "../Components/Chat";

const ChatList = ({route, navigation}) => {
    const {isTopicId, recipientName, topicId}  = route.params;
    return (
        <SafeAreaView>
            <View>
                <Chat isTopicId={isTopicId} recipientName={recipientName} topicId={topicId} />
            </View>
        </SafeAreaView>
    )
}

export default ChatList;
