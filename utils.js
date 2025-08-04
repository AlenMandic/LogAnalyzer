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
  console.log("VALUE: ", value);

  const result = value.split("\n")[0].replace("\r", "").slice(0, -3); // Remove automatically added \r from result string endings, and removes language categories.
  console.log("RESULT: ", result);

  return result;
}
