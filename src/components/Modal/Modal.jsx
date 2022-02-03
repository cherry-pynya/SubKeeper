import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

//обертка для модального окна
export default function Modal(props) {
    const active = useSelector((state) => state.modal.active);

    return (
        <div className={active ? "modal active" : "modal"}>
            {props.children}
        </div>
    );
}

Modal.propTypes = {
    props: PropTypes.node,
};
