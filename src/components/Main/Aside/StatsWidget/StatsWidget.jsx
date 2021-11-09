import { useState } from "react";
import { useSelector } from "react-redux";
import CurrencySelector from "./CurrencySelector/CurrencySelector";
import PieChart from "./PieChart/PieChart";

export default function StatsWidget() {
  const stats = useSelector((state) => state.app.statistics);

  const [cur, setCur] = useState("RUB");

  const selectCurrency = (id) => {
    setCur(id);
  };

  return (
    <div className="widget border">
      <CurrencySelector select={selectCurrency} activeCur={cur} />
      <PieChart />
    </div>
  );
}
