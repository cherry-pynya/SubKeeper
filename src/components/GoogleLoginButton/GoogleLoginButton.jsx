import { useDispatch } from 'react-redux';
import { login } from '../../slices/app';

//брендировааная кнопка логирования
export default function GoogleLoginButton() { 
  const dispatch = useDispatch();
  const click = () => {
    dispatch(login());
  };

  return (
    <div className="google-button" onClick={click}>
        <span className="google-button-icon"></span>
        <span className="google-button-text">Sign In with Google</span>
    </div>
  );
}
