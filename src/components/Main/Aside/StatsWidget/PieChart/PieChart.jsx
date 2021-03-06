import PropTypes from 'prop-types';
import Chart from "react-google-charts";

//google pie chart
export default function PieChart({data}) {
  return (
    <div className="widget-piechart-container">
      <Chart
        style={{overflow: 'hidden'}}
        width={"250px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
            chartArea: {
                width: '90%',
                height: '90%'
            },
            legend: 'none'
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
};
