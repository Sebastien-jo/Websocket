import React from "react";
import {View, Image, Text} from "react-native";
import {useSelector} from "react-redux";
import {selectUser} from "../Redux/userSlice";

export default function Message({item}) {
    console.log(item)
    const date = item.createdAt;
    const user = item.user.username;
    const message = item.content;
    const currentUser = useSelector(selectUser);

    return user !== currentUser.username ?(
        <View>
            <Text>{message}</Text>
        </View>
    ):
        (
            <View>
                <Text>{message}</Text>
            </View>
        )
}
