import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SubTableItem from "./SubTableItem/SubTableItem";
import StatusText from "./StatusText";
import { getDataFromDB } from '../../../slices/app';

export default function SubTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.app.mockData);
  const index = data.length;
  const inActive = data.filter((el) => el.active === false);
  const active = data.filter((el) => el.active === true);
  const userID = useSelector((state) => state.app.user.id);


  useEffect(() => {
    dispatch(getDataFromDB(userID));
  }, []);

  if (inActive.length === 0) {
    return (
      <section style={{ width: "70%", height: "100%", margin: 0 }}>
        <StatusText text={index ? 'активные' : 'у вас пока нет подписок нажмите \"добавить\", чтобы они появились!'} />
        {active.map((el) => (
          <SubTableItem item={el} key={el.id} />
        ))}
      </section>
    );
  }

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
