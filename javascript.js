const jsonFilePath = "./data.json";
let jsonData;
const cartArray = [];
document.getElementById("menuber").addEventListener("click", function () {
  document.body.classList.toggle("open");
});

const cardListContainer = document.getElementById("section-four-card-list");
// Define the path to your JSON file (no import statement for JSON)

const cartCounter = document.getElementById("cart-counter");
const spanElement = cartCounter.getElementsByTagName("span")[0]; // Assuming there's only one <span> inside cart-counter

async function fetchData() {
  try {
    const response = await fetch(jsonFilePath);
    if (!response.ok) {
      throw new Error("Network is not okay");
    }
    jsonData = await response.json();
    generateCards(jsonData);
  } catch (error) {
    console.error("Fetch data is not okay", error);
  }
}

// Call the fetchData function to start fetching the JSON data

function generateCards(jsonData) {
  let html = "";
  jsonData.map((element) => {
    html += ` <div class="card">
    <div class="card-img-container">
    <img src="./public/images/card-imgs/card-6.png" alt="img" />
      </div>
      <div class="card-content">
        <div class="card-content-heading">
        <h3>${element.name}</h3>
        <p>$ ${element.price} USD</p>
        </div>
        <p>
        ${element.description}
        </p>
        <div class="card-content-btns">
        <button data-button-id=${element.id} class="primary">${
      element.count < 0 ? 0 : element.count
    }</button>
        <button class="secondary" data-button-id=${element.id}>${
      element.count == 0 ? "Add to card" : "+"
    }</button>
        </div>
        </div>
        </div>`;
  });
  cardListContainer.innerHTML = html;

  document.querySelectorAll(".secondary").forEach((btn) => {
    btn.addEventListener("click", function () {
      let id = btn.getAttribute("data-button-id");
      addToCart(id);
    });
  });

  document.querySelectorAll(".primary").forEach((btn) => {
    btn.addEventListener("click", function () {
      let id = btn.getAttribute("data-button-id");
      removeCart(id);
    });
  });
}

function addToCart(id) {
  const updatedData = jsonData.map((value) => {
    if (value.id == id) {
      cartArray.push();
      return {
        ...value,
        count: value.count + 1 // Increment the count property by 1
      };
    } else {
      return value; // Return unchanged value for items that don't match the ID
    }
  });

  // Now, you can update the jsonData with the updatedData
  jsonData = updatedData;
  generateCards(jsonData);
}

function removeCart(id) {
  const updatedData = jsonData.map((value) => {
    if (value.id == id) {
      return {
        ...value,
        count: value.count - 1 // Decrement the count property by 1
      };
    } else {
      return value; // Return unchanged value for items that don't match the ID
    }
  });

  // Update jsonData with the updatedData
  jsonData = updatedData;

  // Call generateCards with the updated data
  generateCards(jsonData);
}

fetchData();

// scroll:smoth
// https://youtube.com/shorts/hk3RgcBx5Fc?si=JHr8NQPd4E5rjhUc
