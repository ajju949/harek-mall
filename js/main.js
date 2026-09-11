/* Shared UI, cart storage, and product-card helpers. */
const HarekMall = (() => {
    const CART_KEY = "harek-mall-cart";
    const WISHLIST_KEY = "harek-mall-wishlist";

    const formatPrice = value => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
    const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const saveCart = cart => { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); };
    const cartQuantity = () => getCart().reduce((total, item) => total + item.quantity, 0);

    function updateCartCount() {
        document.querySelectorAll(".cart-count").forEach(count => {
            const quantity = cartQuantity();
            count.textContent = quantity;
            count.setAttribute("aria-label", `${quantity} products in cart`);
        });
    }

    function toast(message) {
        let element = document.querySelector(".toast");
        if (!element) {
            element = document.createElement("div");
            element.className = "toast";
            element.setAttribute("role", "status");
            document.body.append(element);
        }
        element.textContent = message;
        element.classList.add("is-visible");
        window.clearTimeout(toast.timer);
        toast.timer = window.setTimeout(() => element.classList.remove("is-visible"), 2600);
    }

    function addToCart(productId) {
        const cart = getCart();
        const item = cart.find(product => product.id === productId);
        if (item) item.quantity += 1;
        else cart.push({ id: productId, quantity: 1 });
        saveCart(cart);
        const product = HAREK_PRODUCTS.find(product => product.id === productId);
        toast(`${product.name} added to your cart`);
    }

    const getWishlist = () => JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
    function toggleWishlist(productId) {
        const wishlist = getWishlist();
        const index = wishlist.indexOf(productId);
        if (index === -1) { wishlist.push(productId); toast("Saved to your wishlist"); }
        else { wishlist.splice(index, 1); toast("Removed from your wishlist"); }
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
        return index === -1;
    }

    function productCard(product) {
        return `<article class="product-card">
            <a class="product-image-wrap" href='/product-detail?id=${product.id}" aria-label="View ${product.name}">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-badge">${product.badge}</span>
            </a>
            <div class="product-details">
                <p class="product-brand">${product.brand}</p>
                <h3><a href='/product-detail?id=${product.id}">${product.name}</a></h3>
                <p class="rating" aria-label="Rated ${product.rating} out of 5"><span>★ ${product.rating}</span> <small>(${product.reviews})</small></p>
                <div class="price-row"><strong>${formatPrice(product.price)}</strong><del>${formatPrice(product.oldPrice)}</del></div>
                <div style="display:grid;grid-template-columns:1fr 38px;gap:.5rem"><button class="button button-outline add-to-cart" type="button" data-product-id="${product.id}">Add to cart</button><button class="icon-button wishlist-toggle${getWishlist().includes(product.id) ? " is-active" : ""}" type="button" data-product-id="${product.id}" aria-label="Save ${product.name} to wishlist">♥</button></div>
            </div>
        </article>`;
    }

    function bindCartButtons(scope = document) {
        scope.querySelectorAll(".add-to-cart").forEach(button => button.addEventListener("click", () => addToCart(Number(button.dataset.productId))));
        scope.querySelectorAll(".wishlist-toggle").forEach(button => button.addEventListener("click", () => {
            const saved = toggleWishlist(Number(button.dataset.productId));
            button.classList.toggle("is-active", saved);
        }));
    }

    function initNavigation() {
        const button = document.querySelector(".menu-toggle");
        const nav = document.querySelector(".main-nav");
        if (!button || !nav) return;
        button.addEventListener("click", () => {
            const opened = nav.classList.toggle("is-open");
            button.setAttribute("aria-expanded", String(opened));
            button.setAttribute("aria-label", opened ? "Close navigation menu" : "Open navigation menu");
        });
    }

    function initNewsletter() {
        const form = document.querySelector("#newsletter-form");
        if (!form) return;
        form.addEventListener("submit", event => {
            event.preventDefault();
            toast("You’re on the list — welcome to Harek Mall!");
            form.reset();
        });
    }

    function initHome() {
        const featured = document.querySelector("#featured-products");
        if (featured) {
            featured.innerHTML = HAREK_PRODUCTS.slice(0, 4).map(productCard).join("");
            bindCartButtons(featured);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("#current-year").forEach(year => year.textContent = new Date().getFullYear());
        updateCartCount();
        initNavigation();
        initNewsletter();
        initHome();
        bindCartButtons();
    });

    return { formatPrice, getCart, saveCart, updateCartCount, addToCart, getWishlist, toggleWishlist, productCard, bindCartButtons, toast };
})();
