import { timesClicked } from "./main.js";
import { ctx } from "./main.js";
import { dummyData } from "./chart.js";
import { LogChart } from "./chart.js";

import { arrayOfDateStrings } from "../types/types.js";

const selectChartType = document.getElementById("chartType") as HTMLSelectElement;
const demoExampleElement = document.getElementById("demo-example");

const arrowButtonLeft = document.getElementById("arrow-left");
const arrowButtonRight = document.getElementById("arrow-right");

const arrayOfOptions = [];
let currentPosition = 0;

for( let i = 0; i < (selectChartType).options.length; i++ ) {
  arrayOfOptions.push(selectChartType.options[i].value);
}

// Sort dates from oldest to newest to get the date range for logs. Uses JS's built in sort algorithm...
export function handleDates(dateList : arrayOfDateStrings) {

  dateList.sort((a, b) => {

    const parseDate = (str: string) => {
      const [day, month, year] = str.split(".").map(Number); // Turns "08.10.2025" into an array of strings(split), then numbers, as map returns an array: [8, 10, 2025]
      return new Date(year, month - 1, day); // Creates a date object from [08, 10, 2025]. 8 is the "day" variable etc...
    }
    
    return parseDate(a).getTime() - parseDate(b).getTime();
  });
}

// Handle string operation, extracts every button which was clicked.
export function handleString(entry: string) {
  const value = entry; // redundant line of code?

  const result = value.split("\n")[0].replace("\r", "").slice(0, -3); // Remove automatically added \r from result string endings, and removes language categories.

  return result;
}

export function handleArrowButtons(e : PointerEvent) {

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