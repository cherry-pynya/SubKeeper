import { useSelector } from "react-redux";

import NotLogedIn from "./NotLogedIn/NotLogedIn";

export default function Main() {
    const login = useSelector((state) => state.app.login);

    if (!login) return <NotLogedIn />
    
    return (
        <div></div>
    );
}