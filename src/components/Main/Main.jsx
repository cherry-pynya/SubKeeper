import { useSelector } from "react-redux";
import Page from "../Page/Page";
import SubTable from "./SabTable/SubTable";
import Modal from "../Modal/Modal";
import SubDeleteModal from "./SabTable/SubDeleteModal/SubDeleteModal";
import PropTypes from 'prop-types';
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
            <Modal>
                <SubDeleteModal />
            </Modal>
        </Page>
    );
}

Main.propTypes = {
    login: PropTypes.bool,
};
