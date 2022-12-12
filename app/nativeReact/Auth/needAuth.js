import {Navigate, useLocation} from "react-router-native";
import {authUserContext} from "../Contexts/auth";
import {useContext} from "react";

export default function NeedAuth(props) {
    // let location = useLocation();
    const [loggedUser, setLoggedUser] = useContext(authUserContext);

    if (loggedUser) {
        return props.children;
    }
}
