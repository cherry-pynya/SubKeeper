import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from '@material-ui/lab/DatePicker';
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider/LocalizationProvider";
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import ruLocale from 'date-fns/locale/ru';
import makeSubObject from "../../utils/makeSubObkect";
import { useHistory } from "react-router";
import { addItemToDB, editItemInDB } from '../../../slices/app';
import { resetForm } from "../../../slices/form";
import checkFormData from "../../utils/checkFormData";

//форма добавления новой подписки или редактирования старой
export default function Form() {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.app.user.id);
  const initial = useSelector((state) => state.form);
  const history = useHistory();
  const subs = useSelector((state) => state.app.data);
  const [data, setData] = useState(initial);
  const [mistake, setMistake] = useState({
    active: false,
    mistake: '',
  });

  useEffect(() => {
    //обновляем форму при выходе со страницы редактирования
    return function cleanup() {
      dispatch(resetForm());
    }
  }, []);

  // меняем локальное состояние формы
  const handleChange = (e) => {
    const { name } = e.target;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData({...data, [name]: value});
  };

  //отвечает за дату
  const setDate = (newDate) => {
    setData({...data, date: newDate.toString()});
  };

  //субмит
  const onSubmit = (e) => {
    e.preventDefault();
    const check = checkFormData(data, subs);
    if (check) {
      setMistake({
        active: true,
        mistake: check,
      });
      return false;
    } else {
      if (data.newItem) {
        const item = makeSubObject(data, userID);
        dispatch(addItemToDB({item, userID}));
      } else {
        dispatch(editItemInDB({data, userID}));
      }
      dispatch(resetForm());
      history.push('/');
    }
  }

  // сброс формы
  const cancel = () => {
    dispatch(resetForm());
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
            value={new Date(data.date)}
            onChange={(newValue) => {
                setDate(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className={mistake.active ? "form-mistake" : "form-mistake inActive"}>
          <span>{mistake.mistake}</span>
      </div>
      <div className='row mb-3'>
          <button type='submit' className='btn btn-lg btn-success' style={{margin: '0 20px 0 1rem'}}>Сохранить</button>
          <button type='button' className='btn btn-danger' onClick={cancel}>Отмена</button>
      </div>
    </form>
  );
}

Form.propTypes = {
  userID: PropTypes.string,
  initial: PropTypes.object,
  subs: PropTypes.array,
}
