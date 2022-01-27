import { useSelector } from "react-redux";
import SubTableItem from "./SubTableItem/SubTableItem";
import StatusText from "./StatusText";
import PropTypes from 'prop-types';

export default function SubTable() {
  const data = useSelector((state) => state.app.data);
  const index = data.length;
  const inActive = data.filter((el) => el.active === false);
  const active = data.filter((el) => el.active === true);

  if (data.length === 0) {
    return (
      <section className="subtable-section">
        <StatusText text={index ? 'активные' : 'у вас пока нет подписок нажмите \"добавить\", чтобы они появились!'} />
      </section>
    );
  } else {
    return (
      <section className="subtable-section">
        <StatusText text={'активные'} />
        {active.map((el) => (
          <SubTableItem item={el} key={el.id} />
        ))}
        {inActive.length > 0 ? <StatusText text={'не активные'} />: false}
        {inActive.map((el) => (
          <SubTableItem item={el} key={el.id} />
        ))}
      </section>
    );
  }
}

SubTable.propTypes = {
  data: PropTypes.array,
};

