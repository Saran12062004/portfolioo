
 function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCartItems(cart);
    updateCartSummary(cart);
}

// Display cart items
function displayCartItems(cart) {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Clear container before adding items

    if (cart.length === 0) {
        cartContainer.innerHTML = '<h2>Your cart is empty.🤣</h2>';
        return;
    }
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${product.title}</h4>
                <p class="cart-item-price">$${product.price}</p>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${product.id}, -1)">-</button>
                    <span>${product.quantity}</span>
                    <button onclick="updateQuantity(${product.id}, 1)">+</button>
                </div>
            </div>
        `
        cartContainer.appendChild(cartItem);
    });
}

// Update quantity in cart
function updateQuantity(productId, delta) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(product => product.id === productId);

        if (productIndex > -1) {
        cart[productIndex].quantity += delta;

        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1); // Remove product quantity is 0
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
}

// Remove product from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Update cart summary (total price)
function updateCartSummary(cart) {
    const totalPrice = cart.reduce((total, product) => 30+total + (product.price * product.quantity), 0);
    document.getElementById('cart-total-price').innerText = totalPrice.toFixed(2);
}

// Checkout (placeholder)
function checkout() {
    alert('Proceeding to checkout...');
// You can implement checkout functionality here
}

 // Update cart count in header
 function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.querySelector('#nav_btn4').innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${cartCount})`;
}
// Load the cart when the page loads
window.onload = loadCart;