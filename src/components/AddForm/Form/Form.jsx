import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from '@material-ui/lab/DatePicker';
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider/LocalizationProvider";
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import makeSubObject from "../../utils/makeSubObkect";
import { useHistory } from "react-router";
import { addItemToDB } from '../../../slices/app';

export default function Form() {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.app.user.id);
  const currency = useSelector((state) => state.app.currency);
  const userData = useSelector((state) => state.app.data);

  const initial = {
    name: "",
    cost: "",
    currency: "RUB",
    option: "1",
    date: new Date(),
  };

  const history = useHistory();
  const [data, setData] = useState(initial);

  const handleChange = (e) => {
    const { name } = e.target;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData({...data, [name]: value});
  };

  const setDate = (newDate) => {
    setData({...data, date: newDate});
  };

  const onSubmit = (e) => {
    if (data.cost === 0 || data.name === '') {
      return false;
    };
    e.preventDefault();
    const item = makeSubObject(data, userID);
    dispatch(addItemToDB(item));
    setData(initial);
    history.push('/');
  }

  const cancel = () => {
    setData(initial);
    history.push('/');
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Название:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cost" className="form-label">
          Стоимость:
        </label>
        <input
          type="number"
          className="form-control"
          id="cost"
          name="cost"
          value={data.cost}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="currency"
          className="form-label col"
          style={{ padding: 0 }}
        >
          Выберите валюту:
        </label>
        <select className="form-select" id="currency" name="currency" onChange={handleChange}>
          <option value="RUB" defaultValue>
            Рубли
          </option>
          <option value="USD">Долары</option>
          <option value="EUR">Евро</option>
        </select>
      </div>
      <div className="mb-3">
        <label
          htmlFor="currency"
          className="form-label col"
          style={{ padding: 0 }}
        >
          Выберите опцию списания:
        </label>
        <select className="form-select" id="option" name="option" onChange={handleChange}>
          <option value="1" defaultValue>
            Раз в месяц
          </option>
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
      <div className="mb-3" style={{marginTop: '40px'}}> 
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
          <DatePicker
            disableFuture
            label="Дата начала подписки"
            openTo="year"
            views={["year", "month", "day"]}
            mask={'__.__.____'}
            value={data.date}
            onChange={(newValue) => {
                setDate(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className='row mb-3'>
          <button type='submit' className='btn btn-lg btn-success' style={{margin: '0 20px 0 1rem'}}>Сохранить</button>
          <button type='button' className='btn btn-danger' onClick={cancel}>Отмена</button>
      </div>
    </form>
  );
}
