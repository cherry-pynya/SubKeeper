import { useSelector } from "react-redux";
import SubTableItem from "./SubTableItem/SubTableItem";
import StatusText from "./StatusText";

export default function SubTable() {
  const data = useSelector((state) => state.app.mockData);
  const inActive = data.filter((el) => el.active === false);
  const active = data.filter((el) => el.active === true);

  if (inActive.length === 0) {
    return (
      <section style={{ width: "70%", height: "100%" }}>
        <StatusText text={'активные'} />
        {active.map((el) => (
          <SubTableItem item={el} key={el.id} />
        ))}
      </section>
    );
  }

  return (
    <section style={{ width: "70%", height: "100%" }}>
      <StatusText text={'активные'} />
      {active.map((el) => (
        <SubTableItem item={el} key={el.id} />
      ))}
      <StatusText text={'не активные'} />
      {inActive.map((el) => (
        <SubTableItem item={el} key={el.id} />
      ))}
    </section>
  );
}
