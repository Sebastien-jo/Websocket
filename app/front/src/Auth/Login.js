import {useLocation, useNavigate, navigate} from "react-router-dom";
import {useContext, useState} from "react";
import {userContext} from "../Context/UserContext";
import useGetJWT from "../Hook/useGetJWT";
import {selectUser, setUser} from "../Redux/userSlice";
import {useSelector, useDispatch} from "react-redux";
import jwt from 'jwt-decode';
import {useCookies} from "react-cookie";


export default function Login() {
    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || '/';

    const getJWT = useGetJWT()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(["jwt"]);
    const dispatch = useDispatch();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

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
                navigate(from, {replace: true});
            } else {
                console.log(data)
            }
        })
    }

    return (
        <form className='mx-auto mt-5 rounded p-5 bg-light' style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
            <h1>Please LogIn</h1>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" onChange={handleUsername} value={username}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={handlePassword}
                       value={password}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}