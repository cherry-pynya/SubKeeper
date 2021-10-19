import optionConverter from "../../../utils/optionConverter";
import currencyConverter from "../../../utils/currensyConverter";
import "../../../../materialIcons.css";
import { randomColor } from "randomcolor";

export default function SubTableItem({ item }) {
  let { letter, name, cost, currency, option, date } = item;
  option = optionConverter(option);
  currency = currencyConverter(currency);
  const color = randomColor();

  return (
    <div className="sabTable-item border">
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
        <span className='upperCase'>{name}</span>
      </div>
      <div className="sabTable-item-smal-text-container">
        <span>{`${cost} ${currency}`}</span>
      </div>
      <div className="sabTable-item-large-text-container">
        <span>{`списание ${option}`}</span>
      </div>
      <div className="sabTable-item-smal-text-container">
        <span>{date}</span>
      </div>
      <div className="sabTable-item-buttons column">
        <button className="sabTable-item-button">
          <span class="material-icons md-24">highlight_off</span>
        </button>
        <button className="sabTable-item-button">
          <span class="material-icons">edit</span>
        </button>
      </div>
    </div>
  );
}
