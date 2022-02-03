import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CurrencySelector from "./CurrencySelector/CurrencySelector";
import PieChart from "./PieChart/PieChart";
import getStatsforPie from '../../../utils/getStatsforPie';
import MonthlyCost from '../../../utils/MonthlyCost';
import WidgetText from "./WidgetText/WidgetText";
import { updateStats } from "../../../../slices/app";
import calculateTotalCost from '../../../utils/calculateTotalCost';
import PropTypes from 'prop-types';

//виджет
export default function StatsWidget() {
  const dispatch = useDispatch();
  //отбираем только активные подписки
  const subs = useSelector((state) => state.app.statistics)
  const activeSubs = subs.filter((el) => {
    if (el.active === true) {
      return el;
    }
  });
  console.log(subs)
  //данные для диаграммы
  const [data, setData] = useState([]);
  //изначально информация показывается в рублях
  const [cur, setCur] = useState("RUB");
  //месячные расходы
  const [cost, setCost] = useState('');
  //всего потрачено
  const [totalCost, setTotalCost] = useState('');

  useEffect(() => {
    dispatch(updateStats());
    setData(getStatsforPie(activeSubs, cur));
    setCost(MonthlyCost(activeSubs, cur));
    setTotalCost(calculateTotalCost(subs, cur))
  }, [])

  const selectCurrency = (id) => {
    setCur(id);
    setData(getStatsforPie(activeSubs, id));
    setCost(MonthlyCost(activeSubs, id));
    setTotalCost(calculateTotalCost(subs, id));
  };

  if (activeSubs.length === 0) return <div style={{display: 'none'}}></div>;

  return (
    <div className="widget border">
      <WidgetText text={'Стоимость за месяц'} />
      <CurrencySelector select={selectCurrency} activeCur={cur} />
      <PieChart data={data} />
      <WidgetText text={cost} />
      <WidgetText text={totalCost} />
    </div>
  );
};

StatsWidget.propTypes = {
  stats: PropTypes.array
};
