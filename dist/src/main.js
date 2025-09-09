import { LogChart, dummyData } from "./chart.js"; // Chart logic from chart.js
import { handleDates, handleString } from "./utils.js";
const fileInput = document.getElementById("log-file");
const demoExampleNote = document.getElementById("demo-example");
const errorWarning = document.getElementById("error-warning");
let restaurantName = document.getElementById("r-name");
let resultArray = []; // Reset
let dateArray = [];
export let timesClicked;
const chartCanvas = document.getElementById("myChart"); // Returns a regular HTML element
export const ctx = chartCanvas.getContext("2d");
errorWarning.style.display = "none";
fileInput.addEventListener("change", handleLogFile);
// Display initial dummy graph
const demoExample = new LogChart(dummyData, ctx);
demoExample.renderLogChart();
function handleLogFile() {
    const logElement = fileInput;
    const logFiles = logElement.files;
    dateArray = [];
    timesClicked = {};
    resultArray = [];
    // A new FileReader must be instantiated and run for every file we load in.
    for (const textFile of logFiles) {
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
                const amountOfEntries = values.split("bottun;"); // Every button which was clicked.
                restaurantName.innerHTML = `${values.split(";")[0]}, ${values
                    .split(";")[1]
                    .slice(0, -9)}`;
                let restaurantNameUppercase = "Restaurant " +
                    restaurantName.innerText[0].toUpperCase() +
                    restaurantName.innerText.slice(1);
                restaurantName.innerHTML = restaurantNameUppercase;
                dateArray.push(`${values.split(";")[1].slice(0, -9)}`);
                // extract every single category name which was clicked.
                for (let i = 1; i < amountOfEntries.length; i++) {
                    resultArray.push(handleString(amountOfEntries[i]));
                }
                timesClicked = {};
                // get the number of each category click. If they repeat increment. ovaj kod je odlican nasa ga na internetu.
                resultArray.forEach((element) => {
                    timesClicked[element] = (timesClicked[element] || 0) + 1;
                });
                // Display chart logs from our data object timesClicked;
                const resultChart = new LogChart(timesClicked, ctx);
                demoExample.destroyLogChart(); // Destroy the dummy demo example
                resultChart.destroyLogChart(); // Destroy any potentially existing instance of Chart/Canvas
                resultChart.renderLogChart();
                // Handle dates and show accurate date range using dateHandler function
                handleDates(dateArray);
                // Display accurate date range for multiple log files. Capitalize the first letter of the restaurant name
                if (logFiles.length != 1) {
                    restaurantName.innerHTML = `Restaurant ${values.split(";")[0][0].toUpperCase() +
                        values.split(";")[0].slice(1)}, ${dateArray[dateArray.length - 1]} - ${dateArray[0]}`;
                }
            }
            catch (error) {
                console.error(error);
                demoExampleNote.style.display = "block";
                errorWarning.style.display = "block";
            }
        };
        reader.onerror = (error) => {
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
