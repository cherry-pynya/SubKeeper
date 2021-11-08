import { useSelector } from "react-redux";
import Page from "../Page/Page";
import SubTable from "./SabTable/SubTable";

import NotLogedIn from "./NotLogedIn/NotLogedIn";
import Widget from "./Widget/Widget";

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
            <Widget />
        </Page>
    );
}