const form = document.querySelector("form");
const output = document.querySelector("#output");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(e.target);
  console.log(...formData);
  const fields = {};
  for (const [key, value] of formData) {
    fields[key] = value;
  }

  // Request data from server
  const req = await fetch(
    `http://localhost:3000/api/v1/query?search=${fields.search}&maxPrice=${fields.maxPrice}`
  );
  const data = await req.json();

  // Create elements for each item
  const elements = [];
  for (let item of data) {
    const container = document.createElement("div");
    const itemTitle = document.createElement("h2");
    const itemPrice = document.createElement("p");
    const itemImage = document.createElement("img");

    itemTitle.innerText = item.name;
    itemPrice.innerText = `$${item.price}`;
    itemImage.src = item.image;
    itemImage.alt = item.name;

    container.appendChild(itemTitle);
    container.appendChild(itemImage);
    container.appendChild(itemPrice);

    elements.push(container);
  }

  // Add the output to the output element
  output.replaceChildren();

  for (let elem of elements) {
    output.appendChild(elem);
  }
});
