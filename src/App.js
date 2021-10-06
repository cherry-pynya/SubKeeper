import { useSelector, useDispatch } from "react-redux";
import { login } from "./slices/app";

export default function App() {
  const user = useSelector((state) => state.app.user);
  const isloged = useSelector((state) => state.app.login);
  const dispatch = useDispatch();

  const click = () => {
    dispatch(login());
  };

  console.log(user);
  console.log(isloged);

  return (
    <div className="App">
      <button onClick={click}>login</button>
    </div>
  );
}
