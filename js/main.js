console.log('Connected');
const productContainer = document.getElementById('product-container');

const url = `https://fakestoreapi.com/products/?limit=`;

const fetchDataForHomePage = async (limit) => {
  const res = await fetch(url + `${limit}`);
  const data = await res.json();
  loadDataOnHomePage(data);
};

const loadDataOnHomePage = (products) => {
  products?.forEach(
    ({
      id,
      title,
      price,
      description,
      category,
      image,
      rating: { rate, count },
    }) => {
      productContainer.innerHTML += `
 <div class="rounded-lg border-zinc-200 border overflow-hidden">
            <!-- product Image -->
            <div class="bg-indigo-100 p-4  rounded-t-lg">
              <img
                src=${image}
                alt="T-shirt"
                class="h-32 w-auto mx-auto "
              />
            </div>
            <!-- Product Content -->
            <div class="p-2">
              <div class="text-xs py-2 flex justify-between">
                <span
                  class="text-indigo-600 bg-indigo-100 rounded-full font-semibold px-4"
                  > ${category}</span
                >
                <span
                  ><i
                    class="fa-solid fa-star"
                    style="color: rgba(237, 184, 0, 1)"
                  ></i>
                  ${rate} (${count})</span
                >
              </div>
              <p class="text-xs truncate">${title}</p>
              <p class="font-bold text-md">${price}</p>
              <div class="flex justify-between pt-2">
                <!-- View Button -->
                <button
                  class="px-4 py-1 px-4 border border-zinc-200 rounded-md flex gap-4 items-center text-sm"
                >
                  <i class="fa-regular fa-eye fa-sm" style="color: #000000"></i>
                  Details
                </button>
                <!-- Add to Cart Button -->
                <button
                  class="px-4 py-1 px-4 border border-zinc-200 rounded-md flex gap-4 items-center text-sm bg-indigo-600 text-white"
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
    `;
    },
  );
};

fetchDataForHomePage(3);
