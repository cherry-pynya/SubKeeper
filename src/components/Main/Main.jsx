import { useSelector } from "react-redux";
import Page from "../Page/Page";
import SubTable from "./SabTable/SubTable";

import NotLogedIn from "./NotLogedIn/NotLogedIn";
import Aside from "./Aside/Aside";

export default function Main() {
    const login = useSelector((state) => state.app.login);

    if (!login) return (
        <Page>
            <NotLogedIn />
        </Page>
    );
    
    return (
        <Page>
            <SubTable />
            <Aside />
        </Page>
    );
}