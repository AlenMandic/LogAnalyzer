import { renderNewChart } from "./utils.js";

import { mainDataForChart, dummyDataForChart, ourCanvas } from "../types/types.js";

declare const Chart: any; // Beacuse i'm importing Chart.js library via CDN i don't have the type

export const dummyData : dummyDataForChart = {
  apple: 5,
  banana: 7,
  strawberry: 2,
  lemon: 12,
  kiwi: 3,
  orange: 1,
  blueberry: 21,
  tomato: 10,
};

// Creating the actual chart and chart logic.
const selectChartType = document.getElementById("chartType") as HTMLSelectElement;

selectChartType.addEventListener("change", handleSelectChange);

export function handleSelectChange(e : Event) {
selectChartType.value = e.target.value;

renderNewChart()

}

// class for exporting Chart.JS
export class LogChart {

  data: mainDataForChart | dummyDataForChart;
  canvas: ourCanvas;

  constructor(data: mainDataForChart | dummyDataForChart, ctx: ourCanvas) {
    this.data = data;
    this.canvas = ctx;
  }

  renderLogChart() {
    return new Chart(this.canvas, {
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
