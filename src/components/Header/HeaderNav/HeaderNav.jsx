import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import LoginButton from '../../LoginButton/LoginButton';
import NavLink from './NavLink/NavLink';
import { nanoid } from '@reduxjs/toolkit';

const logedOut = [
    {
        name: 'Главная',
        path: '/',
        active: true,
    },
    {
        name: 'О проекте',
        path: '/about',
        active: false,
    },
];

const logedIn = [
    {
        name: 'Главная',
        path: '/',
        active: true,
    },
    {
        name: 'Добавить',
        path: '/add',
        active: false,
    },
    {
        name: 'О проекте',
        path: '/about',
        active: false,
    },
];

export default function HeaderNav() {
    const [items, setItems] = useState(logedOut);
    const login = useSelector((state) => state.app.login);

    useEffect(() => {
        if (login) {
            setItems(logedIn);
        } else {
            setItems(logedOut);
        }
    }, [login]);

    const navClick = (e) => {
        const { id } = e.target;
        const arr = items.map((el) => {
            if (id === el.path) {
                el.active = true;
            } else {
                el.active = false;
            }
            return el;
        });
        setItems(arr);
    };

    return(
        <nav className='navbar navbar-expand-lg navbar-light'>
            <div className='container-fluid'>
                <Link className="navbar-brand" to='/'>SubKeeper</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className='navbar-nav' onClick={navClick}>
                        {items.map((el) => <NavLink item={el} key={nanoid()} />)}
                    </ul>
                </div>
                <LoginButton />
            </div>
        </nav>
    );
};