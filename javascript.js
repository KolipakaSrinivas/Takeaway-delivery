const jsonFilePath = "data.json";

// Function to toggle menu
const menutoggle = () => document.body.classList.toggle("open");

// Variable to store JSON data
let jsonData;

// Fetch the JSON data
async function fetchingData() {
  try {
    const response = await fetch(jsonFilePath);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    jsonData = await response.json();
    call(); // Call another function after jsonData is populated
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

fetchingData();

// Function to work with jsonData after it's populated
function call() {
    console.log(jsonData);
}
