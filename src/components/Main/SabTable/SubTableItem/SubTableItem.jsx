import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import optionConverter from "../../../utils/optionConverter";
import currencyConverter from "../../../utils/currensyConverter";
import "../../../../materialIcons.css";
import { randomColor } from "randomcolor";
import loacaleDate from "../../../utils/localeDate";
import changeValidity from "../../../utils/changeValidity";
import { editItemInDB } from "../../../../slices/app";
import { useHistory } from "react-router";
import { editingForm } from "../../../../slices/form";
import { setModal } from "../../../../slices/modal";
import Tooltip from "@mui/material/Tooltip";

export default function SubTableItem({ item }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState(0);
  const stats = useSelector((state) => state.app.statistics);
  let { letter, name, cost, currency, option, date, id, active } = item;
  option = optionConverter(option);
  currency = currencyConverter(currency);
  const color = randomColor();
  const userID = useSelector((state) => state.app.user.id);

  const click = (e) => {
    //отвечает за появление суммы подписки по клику на нее
    if (
      e.target.classList.contains("sabTable-item-button") ||
      e.target.classList.contains("material-icons")
    ) {
      return false;
    }
    e.target
      .closest(".sabTable-item")
      .querySelector(".totalCost")
      .classList.toggle("inActive");
  };

  useEffect(() => {
    const el = stats.find((el) => el.id === id);
    setTotalCost(el.totalCost);
  }, []);

  const deleteItem = () => {
    // вызывает модальное окно удаления подписки
    dispatch(setModal({ id, name }));
  };

  const switActivness = () => {
    //меняет активность подписки
    const data = changeValidity({ ...item });
    dispatch(editItemInDB({ data, userID }));
    history.push("/");
  };

  //отправляем подписку в форму редактирования
  const editItem = () => {
    dispatch(editingForm(item));
    history.push("/add");
  };

  return (
    <div className="sabTable-item border" onClick={click}>
      <div className="sabTable-item-container">
        <div
          className="sabTable-item-letter-container"
          style={{ border: `2px solid ${color}`, borderRadius: "15px" }}
        >
          <h3
            className="sabTable-item-letter"
            style={{ margin: "0", color: color }}
          >
            {letter}
          </h3>
        </div>
        <div className="sabTable-item-smal-text-container">
          <span className="upperCase">{name}</span>
        </div>
        <div className="sabTable-item-smal-text-container">
          <span>{`${cost} ${currency}`}</span>
        </div>
        <div className="sabTable-item-large-text-container">
          <span>{`списание ${option}`}</span>
        </div>
        <div className="sabTable-item-smal-text-container">
          <span>{loacaleDate(date)}</span>
        </div>
        <div className="sabTable-item-buttons column">
          <Tooltip title="редактировать" placement="right">
            <button className="sabTable-item-button" onClick={editItem}>
              <span className="material-icons">edit</span>
            </button>
          </Tooltip>
          <Tooltip title="сделать неактивным" placement="right">
            <button className="sabTable-item-button" onClick={switActivness}>
              <span className="material-icons">
                {active ? "unpublished" : "published_with_changes"}
              </span>
            </button>
          </Tooltip>
          <Tooltip title="удалить" placement="right">
            <button className="sabTable-item-button" onClick={deleteItem}>
              <span className="material-icons md-24">highlight_off</span>
            </button>
          </Tooltip>
        </div>
      </div>
      <div
        className="sabTable-item-container totalCost inActive"
        style={{ overflow: "hidden" }}
      >
        <div style={{ width: "100%", textAlign: "center" }} className="some">
          <span>Всего потрачено: {`${totalCost} ${currency}`}</span>
        </div>
      </div>
    </div>
  );
}

SubTableItem.propTypes = {
  item: PropTypes.object.isRequired,
  stats: PropTypes.array,
  userID: PropTypes.string,
};
