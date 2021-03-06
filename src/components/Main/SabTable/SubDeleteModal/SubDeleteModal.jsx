import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { deleteFromDB } from "../../../../slices/app";
import { resetModal } from '../../../../slices/modal';

//модальное окно удаления подписки
export default function SubDeleteModal() {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.modal.id);
    const name = useSelector((state) => state.modal.name).toUpperCase();
    const active = useSelector((state) => state.modal.active);
    const userID = useSelector((state) => state.app.user.id);

    const submit = () => {
        dispatch(deleteFromDB({id, userID}));
        dispatch(resetModal());
    }

    const cancel = () => {
        dispatch(resetModal());
    }

    return(
        <form className={active ? "modal-content active" : "modal-content"} onSubmit={submit}>
            <span>Вы уверенны, что хотите удалить подписку {name}? Ее нельзя будет востановить!</span>
            <div className="modal-btn">
                <button type='submit' className="btn btn-success btn-space">Да</button>
                <button type="button" className="btn btn-danger" onClick={cancel}>Нет</button>
            </div>
        </form>
    );
}

SubDeleteModal.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    active: PropTypes.bool,
    userID: PropTypes.string,
};
