import { useSelector, useDispatch } from "react-redux";
import { toggleActive } from "../../slices/modal";

export default function Modal({children}) {
    const dispatch = useDispatch();
    const active = useSelector((state) => state.modal.active);

    return (
        <div className="modal" onClick={dispatch(toggleActive())}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
}