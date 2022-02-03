import PropTypes from 'prop-types';

export default function DashboardCube({item}) {
    const { category, name, show } = item;
    return (
        <div className='dashboard-dashboardCube border'>
            <div>
                <span>{category}</span>
            </div>
            <div>
                <span>{name}</span>
            </div>
            <div>
                <span>{show}</span>
            </div>
        </div>
    );
}

DashboardCube.propTypes = {
    item: PropTypes.object.isRequired,
};
