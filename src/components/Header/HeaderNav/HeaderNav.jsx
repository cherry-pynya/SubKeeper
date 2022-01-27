import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoginButton from "../../LoginButton/LoginButton";
import NavLink from "./NavLink/NavLink";
import { nanoid } from "@reduxjs/toolkit";
import NavBrand from "./NavBrand/Navbrand";
import { useHistory } from "react-router";
import json2mq from "json2mq";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HeaderNav() {
  const history = useHistory();
  const currentPath = history.location.pathname;
  const matches = useMediaQuery(
    json2mq({
      maxWidth: 765,
    })
  );

  const logedOut = [
    {
      name: "Главная",
      path: "/",
      active: false,
    },
    {
      name: "О проекте",
      path: "/about",
      active: false,
    },
  ];

  const logedIn = [
    {
      name: "Главная",
      path: "/",
      active: false,
    },
    {
      name: "Добавить",
      path: "/add",
      active: false,
    },
    {
      name: "О проекте",
      path: "/about",
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

  const click = (e) => {
      const elem = e.target.closest('.navbar').querySelector('.navbar-collapse');
      elem.classList.toggle('inActive');
  };

  if (matches) {
    return (
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="container-fluid">
          <button
            onClick={click}
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavBrand />
          <LoginButton />
        </div>
        <div
          className="collapse navbar-collapse show inActive"
          style={{overflow: "hidden"}}
        >
          <ul className="navbar-nav mr-auto">
            {items.map((el) => (
              <NavLink item={el} key={nanoid()} currentPath={currentPath} />
            ))}
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-md navbar-light">
        <NavBrand />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {items.map((el) => (
              <NavLink item={el} key={nanoid()} currentPath={currentPath} />
            ))}
          </ul>
        </div>
        <LoginButton />
      </nav>
    );
  }
}

HeaderNav.propTypes = {
  login: PropTypes.bool
}
