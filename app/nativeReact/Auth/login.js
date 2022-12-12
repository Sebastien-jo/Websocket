import React, {useContext, useState} from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity, StyleSheet,
} from "react-native";
import {authUserContext, AuthUserProvider} from "../Contexts/auth";
import {selectUser, setUser} from "../Redux/userSlice";
import {useSelector, useDispatch} from "react-redux";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import useGetJWT from "../Hook/useGetJWT";
import List from "../Screens/list";
import jwt from 'jwt-decode';


const Login = ({navigation}) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [logUser, setLogUser] = useContext(authUserContext);
    const getJWT = useGetJWT();
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        getJWT(username, password).then(data => {
            if (data.JWT) {
                const deparse = jwt(data.JWT);
                dispatch(setUser({
                    jwt: data.JWT,
                    username: deparse.mercure.payload.username,
                    id: deparse.mercure.payload.userid,
                }));
                navigation.navigate("List", {replace: true});
                console.log(data.JWT)
            } else {
                console.log(data)
            }
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            <View  style={styles.login}>
                <View style={styles.form}>
                    <Text>Username</Text>
                    <TextInput value={username} onChangeText={(username)=>setUsername(username)} placeHolder="username" style={styles.input}/>
                </View>
                <View style={styles.form}>
                    <Text>Password</Text>
                    <TextInput value={password} onChangeText={(password)=>setPassword(password)} placeHolder="password" style={styles.input} autoCapitalize='none' secureTextEntry={true}/>
                </View>
                <View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        )
}
const styles = StyleSheet.create({
    text: {
      color: 'white'
    },
    form: {
        marginTop: 20
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        width: 250,
        height: 40,
        borderRadius: 20,
        margin: 10
    },
    button: {
        marginTop: 50,
        backgroundColor: '#3a4d43',
        color: 'white',
        alignItems: 'center',
        borderRadius: 50,
        height: 20,
        width: 90,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    login: {
        flex: 0.5,
        backgroundColor: '#93b9ad',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: '80%'
    }
    })
 export default Login;

