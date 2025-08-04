// Main logic and string manipulation/extraction.

const fileInput = document.getElementById("log-file");
const ctx = document.getElementById("myChart").getContext("2d");
let restaurantName = document.getElementById("r-name");
const demoExampleNote = document.getElementById("demo-example");
const errorWarning = document.getElementById("error-warning");
//let finalAnalytics = document.getElementById("analytics");
let resultArray = []; // Reset
let dateArray = [];

let timesClicked = {};
errorWarning.style.display = "none";

import { LogChart } from "./chart.js"; // Chart logic from chart.js
import { handleDates } from "./utils.js";
import { handleString } from "./utils.js";
import { dummyData } from "./chart.js";

fileInput.addEventListener("change", handleLogFile);

// Display initial dummy graph instead of nothing
const demoExample = new LogChart(dummyData, ctx);
demoExample.displayDemoExample();

function handleLogFile() {
  dateArray = []; // Reset date array

  const logFiles = fileInput.files;

  console.log(logFiles);

  for (const textFile of logFiles) {
    // handle loading in incorrect file types
    if (!textFile.type.startsWith("text")) {
      errorWarning.style.display = "block";
      return;
    }

    const reader = new FileReader();

    reader.readAsText(textFile);

    // Main handling logic
    reader.onload = () => {

      // catch any errors during main logic
      try {
        demoExampleNote.style.display = "none";
        errorWarning.style.display = "none";

        const values = reader.result;
        //console.log("VALUES FROM READER: ", values);

        const amountOfEntries = values.split("bottun;"); // Every button which was clicked.

        restaurantName.innerHTML = `Restaurant ${values.split(";")[0]}, ${values
          .split(";")[1]
          .slice(0, -9)}`;

        dateArray.push(`${values.split(";")[1].slice(0, -9)}`);

        // extract every single category name which was clicked.
        for (let i = 1; i < amountOfEntries.length; i++) {
          resultArray.push(handleString(amountOfEntries[i]));
        }

        console.log(resultArray);

        // get the number of each category click. If they repeat increment.
        // ovaj kod je odlican nasa ga na internetu.
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

        // Handle dates and show accurate date range using dateHandler function
        handleDates(dateArray);

        // Display accurate date range for multiple log files
        if (logFiles.length != 1) {
          restaurantName.innerHTML = `Restaurant ${values.split(";")[0]}, ${
            dateArray[0]
          } - ${dateArray[dateArray.length - 1]}`;
        }

      } catch {
        demoExampleNote.style.display = "block";
        errorWarning.style.display = "block";
      }

    };

    reader.onerror = () => {
      demoExampleNote.style.display = "block";

      // handle errors on reading files
      console.error("Something went wrong during file-reading", error);
    };
  }
}

// PRIMJER KAKO RADI GORNJI KOD ZA IZBROJAT KOLIKO JE PUTA KLIKNUTA KOJA KATEGORIJA
// ZA [Apple, Banana, Apple]

// forEach petlja koraci:
//apple: timesClicked: { apple: 0 + 1 = 1}
//banana: timesClicked: { apple: 1, banana: 0 + 1 = 1};
//apple: timesClicked: { apple: 1 + 1 = 2, banana: 1 };
