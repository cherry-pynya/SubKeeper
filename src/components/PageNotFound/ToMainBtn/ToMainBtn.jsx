import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setStatusFullfiled } from "../../../slices/app";

export default function ToMainBtn() {
  const history = useHistory();
  const dispatch = useDispatch();

  const click = () => {
    dispatch(setStatusFullfiled());
    history.push("/");
  };

  return (
    <button type="button" className="btn primary-color" onClick={click}>
      На главную!
    </button>
  );
}
