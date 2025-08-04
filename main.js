// Main logic and string manipulation/extraction.

const fileInput = document.getElementById("log-file");
const ctx = document.getElementById("myChart").getContext("2d");
let restaurantName = document.getElementById("r-name");
//let finalAnalytics = document.getElementById("analytics");
let resultArray = []; // Reset

export let timesClicked = {};

import { LogChart } from "./chart.js"; // Chart logic from chart.js

fileInput.addEventListener("change", handleLogFile);

// Handle string operation, extracts every button which was clicked.
function handleString(entry) {
  const value = entry;
  console.log("VALUE: ", value);

  const result = value.split("\n")[0].replace("\r", ""); // Remove automatically added \r from result string endings.
  console.log("RESULT: ", result);

  return result;
}

function handleLogFile() {
  const logFiles = fileInput.files;

  console.log(logFiles);

  for (const textFile of logFiles) {
    const reader = new FileReader();

    reader.readAsText(textFile);

    // Main handling logic
    reader.onload = () => {
      const values = reader.result;
      console.log("VALUES FROM READER: ", values);

      const amountOfEntries = values.split("bottun;"); // Every button which was clicked.

      restaurantName.innerHTML = `Restaurant name: ${values.split(";")[0]}, ${
        values.split(";")[1]
      }`;

      // extract every single category name which was clicked.
      for (let i = 1; i < amountOfEntries.length; i++) {
        resultArray.push(handleString(amountOfEntries[i]));
      }

      console.log(resultArray);

      // get the number of each category click. If they repeat increment.
      // Ovaj kod je odlican nasa ga na internetu.
      timesClicked = {};

      resultArray.forEach((element) => {
        timesClicked[element] = (timesClicked[element] || 0) + 1;
      });

      console.log(timesClicked);
      //finalAnalytics.innerHTML = Object.entries(timesClicked);

      // Display chart logs from our data object timesClicked;
      const resultChart = new LogChart(timesClicked, ctx);

      resultChart.destroyLogChart(); // Destroy any potentially existing instance of Chart/Canvas

      resultChart.renderLogChart();
    };

    reader.onerror = () => {
      console.error("Something went wrong", error);
    };
  }
}

// PRIMJER KAKO RADI GORNJI KOD ZA IZBROJAT KOLIKO JE PUTA KLIKNUTA KOJA KATEGORIJA
// ZA [Apple, Banana, Apple]

// forEach petlja koraci:
//apple: timesClicked: { apple: 0 + 1 = 1}
//banana: timesClicked: { apple: 1, banana: 0 + 1 = 1};
//apple: timesClicked: { apple: 1 + 1 = 2, banana: 1 };