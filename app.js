// app.js

const products = [];
const billItems = [];

// Add Product Form
const addProductForm = document.getElementById('add-product-form');
const inventoryTable = document.querySelector('#inventory-table tbody');

addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('product-name').value;
  const category = document.getElementById('product-category').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const stock = parseInt(document.getElementById('product-stock').value);

  // Add product to inventory
  products.push({ name, category, price, stock });
  updateInventory();
  addProductForm.reset();
});

// Update Inventory Table
function updateInventory() {
  inventoryTable.innerHTML = '';
  
  products.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td class="${product.stock < 5 ? 'low-stock' : ''}">${product.stock}</td>
    `;
    inventoryTable.appendChild(row);
  });
}

// Billing Form
const billingForm = document.getElementById('billing-form');
const billList = document.getElementById('bill-list');
const totalAmount = document.getElementById('total-amount');

billingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('bill-product-name').value;
  const quantity = parseInt(document.getElementById('bill-quantity').value);

  // Check product availability
  const product = products.find((p) => p.name === name);
  if (!product || product.stock < quantity) {
    alert('Product not available or insufficient stock!');
    return;
  }

  // Update product stock
  product.stock -= quantity;

  // Add to bill
  billItems.push({ name, price: product.price, quantity });
  updateInventory();
  updateBill();
});

// Update Bill Details
function updateBill() {
  billList.innerHTML = '';
  let total = 0;

  billItems.forEach((item) => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
    billList.appendChild(li);
  });

  totalAmount.textContent = total.toFixed(2);
}
