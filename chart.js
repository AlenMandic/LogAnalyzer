// Creating the actual chart and chart logic.
const selectChartType = document.getElementById("chartType");

selectChartType.addEventListener("change", handleSelectChange);

function handleSelectChange(e) {
    selectChartType.value = e.target.value;
}

export class LogChart {
  constructor(data, canvas) {
    this.data = data;
    this.canvas = canvas;
  }

  renderLogChart() {
    new Chart(this.canvas, {
      type: selectChartType.value,  // Vamo moze bit: bar, pie, radar, doughnut, line
      data: {
        labels: Object.keys(this.data),
        datasets: [
          {
            label: "Times Clicked",
            data: Object.values(this.data),
            backgroundColor: ["red", "blue", "green"],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  destroyLogChart() {
    let chartStatus = Chart.getChart("myChart"); // our existing Chart-Canvas id.

    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
  }
}
