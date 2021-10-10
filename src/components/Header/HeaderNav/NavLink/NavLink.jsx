import { Link } from "react-router-dom";

export default function NavLink({item}) {
    const {name, path, active} = item;
    return(
        <li className="nav-item">
            <Link className={active ? 'nav-link active' : 'nav-link'} to={path} id={path}>{name}</Link>
        </li>
    );
}
