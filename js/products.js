console.log('Connected');
const allProductContainer = document.getElementById('all-product-container');
const catagoriesEl = document.getElementById('catagories');
const modal = document.getElementById('my_modal_1');
const productTitle = document.getElementById('product-title');
const productPrice = document.getElementById('product-price');
const productDescription = document.getElementById('product-description');
const productRating = document.getElementById('product-rating');
const loader = document.getElementById('loader');
const allCategoryBtn = document.getElementById('all-category-btn');

// fetchDataForAllProductsPage
const fetchDataForAllProductsPage = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  const data = await res.json();
  loadDataOnProductsPage(data);
};

// loadDataOnProductsPage
const loadDataOnProductsPage = (products) => {
  allProductContainer.innerHTML = '';
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
            class="btn px-4 btn-primary"
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
  allCategoryBtn.classList.remove('hidden');
  loader.classList.add('hidden');
};

// loadCatagories
const loadCatagories = (categories) => {
  categories.forEach((category) => {
    const div = document.createElement('div');
    div.className = 'badge border border-gray-300 capitalize cursor-pointer';
    div.textContent = category;
    div.addEventListener('click', () => {
      categoryWiseProduct(category);
    });
    catagoriesEl.appendChild(div);
  });
};

const categoryWiseProduct = async (category) => {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
  );
  const data = await res.json();
  loadDataOnProductsPage(data);
};

const openModal = async (idParams) => {
  const res = await fetch(`https://fakestoreapi.com/products/${idParams}`);
  const data = await res.json();

  const {
    id,
    title,
    price,
    description,
    rating: { rate },
  } = data;
  console.log(data);
  productTitle.textContent = title;
  productDescription.textContent = description;
  productPrice.textContent = '$' + price;
  productRating.textContent = rate;
  my_modal_1.showModal();
};

// fetchCatagories
const fetchCatagories = async () => {
  allCategoryBtn.classList.add('hidden');
  loader.classList.remove('hidden');
  const res = await fetch(`https://fakestoreapi.com/products/categories`);
  const data = await res.json();
  loadCatagories(data);
};

// Call fetchCatagories;
fetchCatagories();

// fetchDataForAllProductsPage
fetchDataForAllProductsPage();
