import { nanoid } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import DashboardCube from './DashboardCube/DashboardCube';
import DashBoardData from '../../utils/DashBoardData';

export default function Dashboard() {
    //передаем только активные
    const stats = useSelector((state) => state.app.statistics).filter((el) => {
        if (el['active'] === true) return el;
    });
    const data = new DashBoardData(stats).init();

    return (
        <div className="dashboard-container">
            {data.map((el) => <DashboardCube item={el} key={nanoid()} />)}
        </div>
    );
}

Dashboard.propTypes = {
    stats: PropTypes.array,
};
