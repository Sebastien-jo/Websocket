import base64 from "react-native-base64";

export default function useGetJWT() {

    return function (username, password) {
        const credentials = base64.encode(`${username}:${password}`);
        return fetch('http://localhost:8245/login', {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${credentials}`
          }
        })
            .then(data => data.json())
    }
}
