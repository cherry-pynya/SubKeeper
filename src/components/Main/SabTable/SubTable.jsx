import { useSelector } from "react-redux";
import SubTableItem from "./SubTableItem/SubTableItem";
import Statistics from "../../utils/Statistics";
import { nanoid } from "@reduxjs/toolkit";

export default function SubTable() {
    const data = useSelector((state) => state.app.mockData);
    const cur = useSelector((state) => state.app.currency)
    const stats = new Statistics(data, cur);
    console.log(stats.init());

    return(
        <section style={{width: '70%', height: '100%'}}>
            {data.map((el) => <SubTableItem item={el} key={el.id} />)}
        </section>
    );
}