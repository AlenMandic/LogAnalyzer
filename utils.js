import { timesClicked } from "./main.js";
import { ctx } from "./main.js";
import { dummyData } from "./chart.js";
import { LogChart } from "./chart.js";

const selectChartType = document.getElementById("chartType");
const demoExampleElement = document.getElementById("demo-example");

const arrowButtonLeft = document.getElementById("arrow-left");
const arrowButtonRight = document.getElementById("arrow-right");

const arrayOfOptions = [];
let currentPosition = 0;

for( let i = 0; i < selectChartType.options.length; i++ ) {
  arrayOfOptions.push(selectChartType.options[i].value);
}

// Sort dates from oldest to newest to get the date range for logs. Uses JS's built in sort algorithm...
export function handleDates(dateList) {
  dateList.sort((a, b) => {
    let c = new Date(a);
    let d = new Date(b);
    return c - d;
  });
}

// Handle string operation, extracts every button which was clicked.
export function handleString(entry) {
  const value = entry;
  //console.log("VALUE: ", value);

  const result = value.split("\n")[0].replace("\r", "").slice(0, -3); // Remove automatically added \r from result string endings, and removes language categories.

  return result;
}

export function handleArrowButtons(e) {

  if (document.getElementById("arrow-right") === e.target) {

      if ( currentPosition >= arrayOfOptions.length - 1 ) currentPosition = -1;
      currentPosition += 1;

      selectChartType.value = arrayOfOptions[currentPosition]

      renderNewChart();

  } else {

      if ( currentPosition <= 0 ) currentPosition = 5;
      currentPosition -= 1;

      selectChartType.value = arrayOfOptions[currentPosition]

      renderNewChart();
  }

}

export function renderNewChart() {
    // Check if Demo is active and render that chart, if not render real chart
    if (window.getComputedStyle(demoExampleElement, null).display === 'block') {
      const resultChart = new LogChart(dummyData, ctx);
  
      resultChart.destroyLogChart();
      resultChart.renderLogChart();
  
      return;
    } else {
      // Display chart logs from our data object timesClicked;
      const resultChart = new LogChart(timesClicked, ctx);
  
      resultChart.destroyLogChart(); // Destroy any potentially existing instance of Chart/Canvas
      resultChart.renderLogChart();
    }
}

arrowButtonLeft.addEventListener("click", handleArrowButtons);
arrowButtonRight.addEventListener("click", handleArrowButtons);