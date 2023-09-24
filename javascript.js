const jsonData = "./data.json";
const cardListContainer = document.getElementById("section-four-card-list");
const cart_container = document.querySelector('.cart-counter')
const cart_value = cart_container.getElementsByTagName('span')[0]


document.getElementById("menuber").addEventListener("click", function () {
  document.body.classList.toggle("open");
});



function localStorageCheaking() {
  if (localStorage.getItem("key")) {
    let value = localStorage.getItem("key");
    let value2 = JSON.parse(value);
    renderCards(value2);
    setCartValue(value2)
  } else {
    fetchIngData(jsonData);
  }
}

async function fetchIngData(jsonData) {
  try {
    const response = await fetch(jsonData);
    if (!response.ok) {
      throw new Error("netWork is not ok");
    }
    const fetchData = await response.json();
    renderCards(fetchData);
  } catch (error) {
    console.log(error);
  }
}

function renderCards(data) {
  let html = "";
  data.forEach((element) => {
    html += `
        <div class="card">
          <div class="card-img-container">
            <img src="./public/images/card-imgs/card-6.png" alt="img"/>
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
                <button class="primary" data-id='${element.id}' > ${
      element.count
    }</button>
                <button class="secondary" data-id='${element.id}'>${
      element.count == 0 ? "Add to card" : "+"
    }</button>
          </div>
        </div>
      </div>    
    `;
  });
  cardListContainer.innerHTML = html;

  document.querySelectorAll(".secondary").forEach((btn) => {
    const id = btn.getAttribute("data-id");
    btn.addEventListener("click", function () {
      addToCart(id, data);
    });
  });

  document.querySelectorAll(".primary").forEach((btn) => {
    const id = btn.getAttribute("data-id");
    btn.addEventListener("click", function () {
      removeToCart(id, data);
    });
  });
}

function addToCart(id, data) {
  const updatedData = data.map((value) => {
    if (value.id == id) {
      return {
        ...value,
        count: value.count + 1
      };
    } else {
      return value;
    }
  });
  renderCards(updatedData);
  storeLocalStorage(updatedData);
  setCartValue(updatedData)
}

function removeToCart(id, data) {
  const updatedData = data.map((value) => {
    if (value.id == id) {
      if (value.count > 0) {
        return {
          ...value,
          count: value.count - 1
        };
      } else {
        return value;
      }
    } else {
      return value;
    }
  });

  renderCards(updatedData);
  storeLocalStorage(updatedData);
  setCartValue(updatedData)
}

function storeLocalStorage(data) {
  return localStorage.setItem("key", JSON.stringify(data));
}

function removelocalStorage() {
  localStorage.clear();
}

function setCartValue(updatedData) {
  const value = updatedData.reduce((accumulator, currentValue)=> {
   return accumulator + currentValue.count
  },0)
  cart_value.innerText = value
} 

// removelocalStorage()

localStorageCheaking();


// // scroll:smoth
// // https://youtube.com/shorts/hk3RgcBx5Fc?si=JHr8NQPd4E5rjhUc