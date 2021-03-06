import PropTypes from 'prop-types';
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

//набор кнопок для выбора валюты виджета
export default function CurrencySelector({ select }) {
  const initial = [
    {
      id: "RUB",
      uni: "\u20BD",
      active: true,
    },
    {
      id: "USD",
      uni: "\u0024",
      active: false,
    },
    {
      id: "EUR",
      uni: "\u20AC",
      active: false,
    },
  ];

  const [data, setData] = useState(initial);

  const click = (e) => {
    const { id } = e.target;
    const arr = data.map((el) => {
      if (el.id === id) {
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    });
    setData(arr);
    select(id);
  };

  return (
    <div className="btn-group widget-cur-selector" role="group" aria-label="Basic example">
      {data.map((el) => (
        <CurBtn el={el} click={click} key={nanoid()} />
      ))}
    </div>
  );
}

//кнопка
function CurBtn({ el, click }) {
  return (
    <button
      type="button"
      className={el.active ? "btn btn-primary active primary-color" : "btn btn-primary primary-color"}
      id={el.id}
      onClick={click}
    >
      {el.uni}
    </button>
  );
}

CurrencySelector.propTypes = {
  select: PropTypes.func.isRequired,
};

CurBtn.propTypes = {
  el: PropTypes.object.isRequired,
  click: PropTypes.func.isRequired,
};
