export default function getStatsforPie(stats, id) {
    const arr = [['Currency', 'Cost']];
    stats.forEach((el) => {
      if (el.active) {
        arr.push([el.name, el[id]]);
      }
    });
    return arr;
  }