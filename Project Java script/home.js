let  allProducts = [];
const shopCart = document.querySelector('.shop_cart');
shopCart.textContent = 'Loading...';
shopCart.style.fontSize = '200%';
shopCart.style.fontFamily = 'arial';
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            allProducts = products;
            displayProducts(allProducts);
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayProducts(products) {                                      

        const container = document.getElementById('product-container');
        container.innerHTML = '';
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="card-body">
                    <h3 class="card-title">${product.title}</h3>
                    <p class="card-description">${product.description}</p>
                    <hr>
                    <p class="card-price">$${product.price}</p>
                    <hr>
                </div>
                <div class="card-footer">
                    <button>Details</button>
                    <button onclick="addToCart(${product.id})">Add To Cart</button>
                </div>
            `;
                    
            container.appendChild(card);
        });
    }
    // Function to filter products
    function filterProducts(category) {
        if (category === 'all') {
            displayProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(product => product.category === category);
            displayProducts(filteredProducts);
        }
    } 
        function addToCart(productId) {
        const product = allProducts.find(p => p.id === productId);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {

        // existingProduct.quantity;

        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
    }

    // Update cart count in header
        function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
        document.querySelector('#nav_btn4').innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${cartCount})`;
    }
    window.onload = updateCartCount;