// ---------- Signup ----------
function signup(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;

    if (name === "" || email === "" || pass === "") {
        document.getElementById("signupMsg").innerText = "All fields required!";
        return;
    }

    if (pass !== confirm) {
        document.getElementById("signupMsg").innerText = "Passwords do not match!";
        return;
    }

    localStorage.setItem("user", JSON.stringify({ email, pass }));
    document.getElementById("signupMsg").innerText = "Signup Successful!";
}

// ---------- Login ----------
function login(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPassword").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.pass === pass) {
        localStorage.setItem("loggedIn", true);
        window.location.href = "index.html";
    } else {
        document.getElementById("loginMsg").innerText = "Invalid Credentials!";
    }
}

// ---------- Logout ----------
function logout() {
    localStorage.removeItem("loggedIn");
    location.reload();
}

// ---------- Products ----------
let products = [
    { name: "Apple", price: 100 },
    { name: "Rice", price: 50 },
    { name: "Turmeric", price: 80 }
];

function loadProducts() {
    let list = document.getElementById("productList");
    if (!list) return;

    list.innerHTML = "";
    products.forEach((p, index) => {
        list.innerHTML += `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${index})">Add to Cart</button>
        </div>`;
    });
}

function addToCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(products[index]);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

// ---------- Cart ----------
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDiv = document.getElementById("cartItems");
    let total = 0;

    if (!cartDiv) return;

    cartDiv.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;
        cartDiv.innerHTML += `
        <p>${item.name} - ₹${item.price}
        <button onclick="removeItem(${index})">Remove</button></p>`;
    });

    document.getElementById("totalAmount").innerText = "Total: ₹" + total;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ---------- Auto Load ----------
window.onload = function () {
    loadProducts();
    loadCart();

    if (localStorage.getItem("loggedIn")) {
        document.getElementById("loginLink").style.display = "none";
        document.getElementById("signupLink").style.display = "none";
        document.getElementById("logoutLink").style.display = "block";
    }
};