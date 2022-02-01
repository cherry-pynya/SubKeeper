import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../slices/app';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

//кнопка входа/выхода не брендированная
export default function LoginButton() {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoged = useSelector((state) => state.app.login);

    const click = () => {
        if (!isLoged) {
            dispatch(login());
        } else {
            dispatch(logout());
            history.push('/');
        }
    };
    
    return (
        <button type="button" className={isLoged ? 'btn btn-danger' : 'btn btn-success'} onClick={click}>{isLoged ? 'Выйти' : 'Войти'}</button>
    );
}

LoginButton.propTypes = {
    isLoged: PropTypes.bool,
};
