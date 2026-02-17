console.log('Connected');
const productContainer = document.getElementById('product-container');
const productQuantity = document.getElementById('product-quantity');
let loading = false;
const url = `https://fakestoreapi.com/products/?limit=`;

const fetchDataForHomePage = async (limit) => {
  loading = false;
  const res = await fetch(url + `${limit}`);
  const data = await res.json();
  loadDataOnHomePage(data);
};

const loadDataOnHomePage = (products) => {
  products?.forEach(
    ({ id, title, price, category, image, rating: { rate, count } }) => {
      productContainer.innerHTML += `
  <div class="card bg-base-100 w-88 md:w-full md:max-w-88 mx-auto shadow-sm">
    <figure class="bg-indigo-100 p-4 rounded-t-lg">
      <img src="${image}" class="h-40 w-32 mx-auto" alt="Shoes" />
    </figure>
    <div class="card-body">
      <div class="text-xs py-2 flex justify-between items-center">
        <div class="badge text-indigo-600 bg-indigo-100">${category}</div>
        <span
          ><i class="fa-solid fa-star" style="color: rgba(237, 184, 0, 1)"></i>
          ${rate} (${count})</span
        >
      </div>
      <h2 class="card-title truncate">${title}</h2>
      <p class="font-bold text-lg">$${price}</p>
      <div class="flex flex-row justify-center items-center gap-8">
        <!-- View Button -->
        <div>
           <button onclick="openModal(${id})"
            class="btn px-4"
          >
            <i class="fa-regular fa-eye fa-sm" style="color: #000000"></i>
            Details
          </button>
        </div>
        <!-- Add to Cart Button -->
        <div>
          <button onclick="addToCart(${id})"
class="btn btn-primary px-4"
          >
            <i
              class="fa-solid fa-cart-shopping fa-sm"
              style="color: #ffffff"
            ></i>
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
    `;
    },
  );
};

function addToCart(id) {
  const products = JSON.parse(localStorage.getItem('products')) || {};
  if (products[id]) {
    products[id] += 1;
  } else {
    products[id] = 1;
  }
  localStorage.setItem('products', JSON.stringify(products));
  getTotalProductQuantity();
}

const getTotalProductQuantity = () => {
  const products = JSON.parse(localStorage.getItem('products')) || {};
  let quantityArray = [];
  if (products) {
    for (const key in products) {
      quantityArray.push(products[key]);
    }
  } else {
    productQuantity.textContent = 0;

  }
  const updateQuantity = quantityArray.reduce(
    (previous, total) => previous + total,
    0,
  );
  productQuantity.textContent = updateQuantity;

};
getTotalProductQuantity();
fetchDataForHomePage(3);
