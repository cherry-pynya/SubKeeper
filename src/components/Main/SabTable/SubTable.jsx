import { useSelector } from "react-redux";
import SubTableItem from "./SubTableItem/SubTableItem";

export default function SubTable() {
    const data = useSelector((state) => state.app.mockData);

    return(
        <section>
            {data.map((el) => <SubTableItem item={el} key={el.id} />)}
        </section>
    );
}