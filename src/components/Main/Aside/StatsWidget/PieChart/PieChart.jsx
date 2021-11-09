import Chart from "react-google-charts";

export default function PieChart() {
  return (
    <div className="widget-piechart-container">
      <Chart
        style={{overflow: 'hidden'}}
        width={"250px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Task", "Hours per Day"],
          ["Work", 11],
          ["Eat", 2],
          ["Commute", 2],
          ["Watch TV", 2],
          ["Sleep", 7],
        ]}
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
