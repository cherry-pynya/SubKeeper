import { useSelector } from "react-redux";

export default function Modal({children}) {
    const active = useSelector((state) => state.modal.active);


    return (
        <div className={active ? "modal active" : "modal"}>
            {children}
        </div>
    );
}