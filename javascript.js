document.getElementById("menuber").addEventListener("click", function () {
  document.body.classList.toggle("open");
});

const cardListContainer = document.getElementById("section-four-card-list");

// Define the path to your JSON file (no import statement for JSON)
const jsonFilePath = "./data.json";

let jsonData;

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

function generateCards(cards) {
  let html = "";
  cards.forEach((element) => {
    html += `
    <div class="card">
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
        <button class="primary">${element.count ? element.count : 0}</button>
        <button class="secondary" data-button-id=${
          element.id
        }>Add to card</button>
        </div>
        </div>
        </div>
        `;
  });
  cardListContainer.innerHTML = html;

  document.querySelectorAll(".secondary").forEach((element) => {
    element.addEventListener("click", addCart);
  });
}

const cartArray = [];

function addCart(event) {
  let id = this.getAttribute("data-button-id");
  jsonData.forEach((element) => {
    if (id == element.id) {
      cartArray.push({
        ...element,
        count: 1
      });
    }
    generateCards(cartArray);
  });
}



fetchData();
