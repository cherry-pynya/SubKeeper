import { useSelector, useDispatch } from 'react-redux';
import { toggleLogin } from '../../slices/app';

export default function LoginButton() {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.app.login);

    const click = () => {
        dispatch(toggleLogin());
    };
    
    return (
        <button type="button" className={login ? 'btn btn-danger' : 'btn btn-success'} onClick={click}>{login ? 'Выйти' : 'Войти'}</button>
    );
}