import { useSelector } from "react-redux";
import { selectAuthToken } from "../../../entities/auth/selectors";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

export default function useEcho() {

    const token = useSelector(selectAuthToken);

    const echoOptions = {
        broadcaster: 'reverb',
        key: 'yxktbi6auxglqdxakn5d',
        wsHost: '78.24.223.82',
        wsPort: 2323,
        wssPort: 2323,
        // cluster: config.pusher.cluster,
        forceTLS: false,
        enabledTransports: ['ws', 'wss'],
        //authEndpoint is your apiUrl + /broadcasting/auth
        authEndpoint: "http://tisho.creatrix-digital.ru/api/broadcasting/auth",
        // As I'm using JWT tokens, I need to manually set up the headers.
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        },
    };

    const pusher = Pusher;
    const echo = new Echo(echoOptions);

    return { echo };

}
