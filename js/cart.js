document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#cart-content");
    if (!root) return;
    const items = () => HarekMall.getCart().map(entry => ({ ...entry, product: HAREK_PRODUCTS.find(product => product.id === entry.id) })).filter(entry => entry.product);
    function render() {
        const cartItems = items();
        if (!cartItems.length) { root.innerHTML = `<div class="cart-list empty-cart"><span>🛒</span><h2>Your cart is empty</h2><p>Add something you love and it will appear here.</p><a class="button button-primary" href='/products">Explore products</a></div>`; return; }
        const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        root.innerHTML = `<div class="cart-layout"><div class="cart-list">${cartItems.map(({ product, quantity }) => `<article class="cart-item"><img src="${product.image}" alt="${product.name}"><div><p>${product.brand}</p><h2>${product.name}</h2><strong>${HarekMall.formatPrice(product.price)}</strong><div class="quantity-control" aria-label="Quantity for ${product.name}"><button data-change="-1" data-product-id="${product.id}" aria-label="Reduce quantity">−</button><span>${quantity}</span><button data-change="1" data-product-id="${product.id}" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${product.id}">Remove</button></article>`).join("")}</div><aside class="order-summary"><h2>Price details</h2><div class="summary-row"><span>Subtotal</span><span>${HarekMall.formatPrice(subtotal)}</span></div><div class="summary-row"><span>Delivery</span><span style="color:var(--success);font-weight:700">Free</span></div><div class="summary-row summary-total"><span>Total</span><strong>${HarekMall.formatPrice(subtotal)}</strong></div><a class="button button-primary" style="width:100%;margin-top:1rem" href='/checkout">Proceed to checkout</a></aside></div>`;
        root.querySelectorAll("[data-change]").forEach(button => button.addEventListener("click", () => change(Number(button.dataset.productId), Number(button.dataset.change))));
        root.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => remove(Number(button.dataset.remove))));
    }
    function change(id, delta) { const cart = HarekMall.getCart(); const item = cart.find(entry => entry.id === id); item.quantity += delta; HarekMall.saveCart(cart.filter(entry => entry.quantity > 0)); render(); }
    function remove(id) { HarekMall.saveCart(HarekMall.getCart().filter(entry => entry.id !== id)); HarekMall.toast("Item removed from cart"); render(); }
    render();
});
