console.log('Connected');
const allProductContainer = document.getElementById('all-product-container');

const fetchDataForAllProductsPage = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  const data = await res.json();
  console.log(data);
  loadDataOnProductsPage(data);
};

const loadDataOnProductsPage = (products) => {
  products?.forEach(
    ({ id, title, price, category, image, rating: { rate, count } }) => {
      allProductContainer.innerHTML += `
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
          <button
            class="px-4 py-1 px-4 curson-pointer border border-zinc-200 rounded-md flex gap-4 items-center text-sm"
          >
            <i class="fa-regular fa-eye fa-sm" style="color: #000000"></i>
            Details
          </button>
        </div>
        <!-- Add to Cart Button -->
        <div>
          <button
            class="px-4 py-1 px-4 curson-pointer border border-zinc-200 rounded-md flex gap-4 items-center text-sm bg-indigo-600 text-white"
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

fetchDataForAllProductsPage();
