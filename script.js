let cart = [];
let customerName = "";
const webhookURL = "https://discord.com/api/webhooks/1402526570295459910/iPSkQntdE1USE7FOmExgUcrRV9ZCdR8rqBfLYfy49GW5FWczkdhw8NLnstZEb-qexWHU"; // Dán link thật

function confirmName() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) {
    showToast("❗ Vui lòng nhập tên!");
    return;
  }
  customerName = name;
  document.getElementById("name-popup").style.display = "none";
  document.getElementById("menu-section").style.display = "block";
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById("cart");
  const totalEl = document.getElementById("total");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ${item.price.toLocaleString()}đ 
      <button onclick="removeFromCart(${index})" class="remove-btn">❌</button>`;
    cartList.appendChild(li);
  });

  totalEl.textContent = `Tổng: ${total.toLocaleString()}đ`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function submitOrder() {
  if (cart.length === 0) {
    showToast("❗ Chưa chọn món nào.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  let content = `**🛎️ Đơn hàng từ:  ${customerName}**\n`;
  cart.forEach(item => {
    content += `• ${item.name} - ${item.price.toLocaleString()}đ\n`;
  });
  content += `**Tổng: ${total.toLocaleString()}đ**`;

  fetch(webhookURL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ content })
  }).then(() => {
    showToast("✅ Đã gửi đơn! Chúc quý khách ngon miệng...");
    setTimeout(() => location.reload(), 3000);
  }).catch(err => {
    showToast("❌ Lỗi khi gửi đơn.");
    console.error(err);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
