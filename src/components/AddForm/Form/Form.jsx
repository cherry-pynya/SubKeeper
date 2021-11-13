import { useState } from "react";

export default function Form() {
  const [data, setData] = useState({
    name: "",
    cost: "",
    currency: "",
    option: "",
    date: "",
  });
  return (
    <form className="add-form">
      <div className="mb-3">
        <label htmlfor="name" className="form-label">
          Название:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={data.name}
        />
      </div>
      <div className="mb-3">
        <label htmlfor="cost" className="form-label">
          Стоимость:
        </label>
        <input
          type="number"
          className="form-control"
          id="cost"
          name="cost"
          value={data.cost}
        />
      </div>
      <div className="mb-3">
        <label htmlfor="currency" className="form-label col" style={{padding: 0}}>
          Выберите валюту:
        </label>
        <select className="form-select" id='currency' name='currency'>
          <option value="RUB" selected>Рубли</option>
          <option value="USD">Долары</option>
          <option value="EUR">Евро</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlfor="currency" className="form-label col" style={{padding: 0}}>
          Выберите опцию списания:
        </label>
        <select className="form-select" id='option' name='option'>
          <option value="1" selected>Раз в месяц</option>
          <option value="2">Раз в два месяца</option>
          <option value="3">Раз в три месяца</option>
          <option value="4">Раз в четыре иксяца</option>
          <option value="5">Раз в пять месяцев</option>
          <option value="6">Раз в шесть месяце</option>
          <option value="7">Раз в семь месяцнв</option>
          <option value="8">Раз в восемь месяцев</option>
          <option value="9">Раз в девять месяцев</option>
          <option value="10">Раз в десять месяцев</option>
          <option value="11">Раз в одинадцать месяцев</option>
          <option value="12">Раз в год</option>
        </select>
      </div>
    </form>
  );
}
