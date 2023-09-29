


const mydata = [
  {
    id: 1,
    name: "Burger Dreams",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 9.2,
    image_url: "IMAGE-1.png",
    count: 0,
    type :"Burger"
  },
  {
    id: 2,
    name: "Burger Waldo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 10.0,
    image_url: "IMAGE-2.png",
    count: 0,
    type :"Burger"
  },
  {
    id: 3,
    name: "Burger Cali",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 8.0,
    image_url: "IMAGE-3.png",
    count: 0,
    type :"Burger"
  },
  {
    id: 4,
    name: "Burger Bacon Buddy",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 9.99,
    image_url: "IMAGE-4.png",
    count: 0,
    type :"Burger"
  },
  {
    id: 5,
    name: "Burger Spicy",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 9.2,
    image_url: "IMAGE-5.png",
    count: 0,
    type :"Burger"
  },
  {
    id: 6,
    name: "Burger Classic",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 8.0,
    image_url: "IMAGE-6.png",
    count: 0,
    type :"Burger"
  },
  {
    id: 1,
    name: "Burger Dreams",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 9.2,
    image_url: "IMAGE-1.png",
    count: 0,
    type :"Burger"
  },
  {
    id: 2,
    name: "Burger Waldo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 10.0,
    image_url: "IMAGE-2.png",
    count: 0,
    type :"Burger"
  },
  {
    id: 3,
    name: "Burger Cali",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 8.0,
    image_url: "IMAGE-3.png",
    count: 0,
    type :"Burger"
  },
  {
    id: 4,
    name: "Burger Bacon Buddy",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 9.99,
    image_url: "IMAGE-4.png",
    count: 0,
    type :"Burger"
  },
  {
    id: 5,
    name: "Burger Spicy",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 9.2,
    image_url: "IMAGE-5.png",
    count: 0,
    type :"Burger"
  },
  {
    id: 6,
    name: "Burger Classic",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 8.0,
    image_url: "IMAGE-6.png",
    count: 0,
    type :"Burger"
  }
];

const cardListContainer = document.getElementById("section-four-card-list");
const cart_container = document.querySelector(".cart-counter");
const cart_value = cart_container.getElementsByTagName("span")[0];
const cart_section = document.getElementById("cart-section");
const total_bill = document.querySelector(".total-bill");
const place_order = document.querySelector(".place_order");
const logo = document.querySelector("#nav-logo-container");

document.getElementById("menuber").addEventListener("click", function() {
  document.body.classList.toggle("open");
});

document.querySelectorAll(".nav-links li a").forEach(item => {
  item.addEventListener("click", function() {
    document.body.classList.toggle("open");
  });
});

document
  .querySelector("#nav-logo-container")
  .addEventListener("click", function() {});

if (logo !== null) {
  logo.addEventListener("click", function() {
    window.location.href = "./index.html";
  });
}

function localStorageCheaking(mydata) {
  if (localStorage.getItem("key")) {
    let value = localStorage.getItem("key");
    let value2 = JSON.parse(value);
    renderCards(value2);
    setCartValue(value2);
    cartCardsRender(value2);
  } else {
    renderCards(mydata);
  }
}

function renderCards(data) {
  let html = "";
  data.forEach(element => {
    html += `
        <div class="card">
          <div class="card-img-container">
            <img src="/images/cards-images/${element.image_url}" alt="img"/>
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
                <button class="primary" data-id='${element.id}' > ${element.count}</button>
                <button class="secondary" data-id='${element.id}'>${element.count ==
    0
      ? "Add to card"
      : "+"}</button>
          </div>
        </div>
      </div>    
    `;
  });

  if (cardListContainer !== null) {
    cardListContainer.innerHTML = html;
  } else {
    console.log();
  }
  secondarybtn(data);
  primarybtn(data);
}

function primarybtn(data) {
  document.querySelectorAll(".primary").forEach(btn => {
    const id = btn.getAttribute("data-id");
    btn.addEventListener("click", function() {
      removeToCart(id, data);
    });
  });
}

function secondarybtn(data) {
  document.querySelectorAll(".secondary").forEach(btn => {
    const id = btn.getAttribute("data-id");
    btn.addEventListener("click", function() {
      addToCart(id, data);
    });
  });
}

function addToCart(id, data) {
  const updatedData = data.map(value => {
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
  setCartValue(updatedData);
  cartCardsRender(updatedData);
}

function removeToCart(id, data) {
  const updatedData = data.map(value => {
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
  setCartValue(updatedData);
  cartCardsRender(updatedData);
}

function storeLocalStorage(data) {
  return localStorage.setItem("key", JSON.stringify(data));
}

function removelocalStorage() {
  localStorage.clear();
}

function setCartValue(updatedData) {
  const value = updatedData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.count;
  }, 0);
  cart_value.innerText = value;
}

function cartCardsRender(data) {
  let html = "";
  data.map(item => {
    if (item.count > 0) {
      html += `
    <div class="cart-card">
          <img src="/images/cards-images/${item.image_url}" alt="">
          <div>
            <h2>${item.name}</h2>
            <h2>$${item.price}</h2>
          </div>
          <button class="secondary" data-id= '${item.id}'  >+</button>
          <h1>${item.count}</h1>
          <button class="primary" data-id= '${item.id}'>-</button>
        </div>
      </div>
    `;
    }
  });

  if (cart_section !== null) {
    cart_section.innerHTML = html;
  } else {
    console.log();
  }
  secondarybtn(data);
  primarybtn(data);
  calculateTotalBill(data);
}

function calculateTotalBill(data) {
  let totalBill = 0;
  data.forEach(item => {
    let amount = 0;
    if (item.count > 0) {
      amount = item.price * item.count;
    }
    totalBill += amount;
  });

  if (total_bill !== null) {
    total_bill.innerText = `Total Bill $ ${totalBill}`;
  } else {
    console.log();
  }
  placeOrder();
}

function placeOrder() {
  if (place_order !== null) {
    place_order.addEventListener("click", function() {
      if (window.confirm("Your Order Placed")) {
        removelocalStorage();
        location.reload();
        window.location.href = "../index.html";
      } else {
        // alert()
      }
    });
  } else {
    console.log();
  }
}

localStorageCheaking(mydata);

// // scroll:smoth
// // https://youtube.com/shorts/hk3RgcBx5Fc?si=JHr8NQPd4E5rjhUc
