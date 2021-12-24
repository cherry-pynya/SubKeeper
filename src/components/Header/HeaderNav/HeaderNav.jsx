import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import LoginButton from '../../LoginButton/LoginButton';
import NavLink from './NavLink/NavLink';
import { nanoid } from '@reduxjs/toolkit';
import NavBrand from './NavBrand/Navbrand';
import { useHistory } from 'react-router';

export default function HeaderNav() {
    const history = useHistory();
    const currentPath = history.location.pathname;
    console.log(history.location.pathname);

    const logedOut = [
        {
            name: 'Главная',
            path: '/',
            active: false,
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
            active: false,
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
    
    const [items, setItems] = useState(logedOut);
    const login = useSelector((state) => state.app.login);

    useEffect(() => {
        if (login) {
            setItems(logedIn);
        } else {
            setItems(logedOut);
        }
    }, [login]);
    /**
    useEffect(() => {
        const newItems = items.map((el) => {
            if (el.path === currentPath) {
                el.active = true;
            } else {
                el.active = false;
            }
            return el;
        });
        console.log( 'newItems' ,newItems);
        setItems(newItems);
    }, [currentPath]);
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
    */

    return(
        <nav className='navbar navbar-expand-sm navbar-light'>
            <div className='container-fluid'>
                <NavBrand />
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className='navbar-nav'>
                        {items.map((el) => <NavLink item={el} key={nanoid()} currentPath={currentPath} />)}
                    </ul>
                </div>
                <LoginButton />
            </div>
        </nav>
    );
};