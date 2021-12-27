import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SubTableItem from "./SubTableItem/SubTableItem";
import StatusText from "./StatusText";

export default function SubTable() {
  const data = useSelector((state) => state.app.data);
  const index = data.length;
  const inActive = data.filter((el) => el.active === false);
  const active = data.filter((el) => el.active === true);
  console.log(data)

  if (data.length === 0) {
    return (
      <section style={{ width: "70%", height: "100%", margin: 0 }}>
        <StatusText text={index ? 'активные' : 'у вас пока нет подписок нажмите \"добавить\", чтобы они появились!'} />
      </section>
    );
  } else {
    return (
      <section style={{ width: "70%", height: "100%", margin: 0 }}>
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
}
