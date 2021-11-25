import { Link } from "react-router-dom"

export default function NavBrand() {
    return <Link className="navbar-brand" to='/' style={{textDecoration: 'none', color: '#000000'}}>SubKeeper</Link>
}