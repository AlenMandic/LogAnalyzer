// Creating the actual chart and chart logic.
const selectChartType = document.getElementById("chartType");

selectChartType.addEventListener("change", handleSelectChange);

function handleSelectChange(e) {
  selectChartType.value = e.target.value;
}

export const dummyData = {
  apple: 5,
  banana: 7,
  strawberry: 2,
  lemon: 12,
  kiwi: 3,
  orange: 1,
  blueberry: 21,
  tomato: 10,
};

// class for exporting Chart.JS
export class LogChart {
  constructor(data, canvas) {
    this.data = data;
    this.canvas = canvas;
  }

  renderLogChart() {
    new Chart(this.canvas, {
      type: selectChartType.value, // we can use: bar, pie, radar, doughnut, line
      data: {
        labels: Object.keys(this.data),
        datasets: [
          {
            label: "Times Clicked",
            data: Object.values(this.data),
            backgroundColor: backgroundColorsDefault,
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

  displayDemoExample() {
    new Chart(this.canvas, {
      type: selectChartType.value, // we can use: bar, pie, radar, doughnut, line
      data: {
        labels: Object.keys(this.data),
        datasets: [
          {
            label: "Times Clicked",
            data: Object.values(this.data),
            backgroundColor: backgroundColorsDefault,
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

  // Reset upon creating a new chart if one exists
  destroyLogChart() {
    let chartStatus = Chart.getChart("myChart"); // our existing Chart-Canvas id.

    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
  }
}

// colors for our graph labels
const backgroundColorsDefault = [
  "red",
  "blue",
  "green",
  "gray",
  "black",
  "orange",
  "purple",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "pink",
  "yellow",
  "navy",
  "maroon",
  "olive",
  "aqua",
  "coral",
  "gold",
  "indigo",
  "salmon",
  "turquoise",
  "chocolate",
  "crimson",
  "darkgreen",
  "darkblue",
  "darkred",
];
