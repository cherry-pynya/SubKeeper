import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CurrencySelector from "./CurrencySelector/CurrencySelector";
import PieChart from "./PieChart/PieChart";
import getStatsforPie from '../../../utils/getStatsforPie';
import MonthlyCost from '../../../utils/MonthlyCost';
import WidgetText from "./WidgetText/WidgetText";
import { updateStats } from "../../../../slices/app";
import PropTypes from 'prop-types';

export default function StatsWidget() {
  const dispatch = useDispatch();
  //отбираем только активные подписки
  const stats = useSelector((state) => state.app.statistics).filter((el) => {
    if (el.active === true) {
      return el;
    }
  });

  const [data, setData] = useState([]);
  const [cur, setCur] = useState("RUB");
  const [cost, setCost] = useState('')

  useEffect(() => {
    dispatch(updateStats());
    setData(getStatsforPie(stats, cur));
    setCost(MonthlyCost(stats, cur));
  }, [])

  const selectCurrency = (id) => {
    setCur(id);
    setData(getStatsforPie(stats, id));
    setCost(MonthlyCost(stats, id));
  };

  if (stats.length === 0) return <div style={{display: 'none'}}></div>;

  return (
    <div className="widget border">
      <WidgetText text={'Стоимость за месяц'} />
      <CurrencySelector select={selectCurrency} activeCur={cur} />
      <PieChart data={data} />
      <WidgetText text={cost} />
    </div>
  );
};

StatsWidget.propTypes = {
  stats: PropTypes.array
};
