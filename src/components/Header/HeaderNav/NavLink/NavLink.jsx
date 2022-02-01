import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

//ссылка в меня навигации
export default function NavLink({item}) {
    const {name, path, active} = item;

    return(
        <li className="nav-item">
            <Link className={active ? 'nav-link active' : 'nav-link'} to={path} id={path}>{name}</Link>
        </li>
    );
}

NavLink.propTypes = {
    item: PropTypes.object.isRequired,
};
