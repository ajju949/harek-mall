document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#wishlist-products"); if (!root) return;
    function render() { const products = HAREK_PRODUCTS.filter(product => HarekMall.getWishlist().includes(product.id)); root.innerHTML = products.length ? products.map(HarekMall.productCard).join("") : `<div class="empty-state"><span>♡</span><h2>Your wishlist is waiting</h2><p>Save products you love to find them quickly later.</p><a class="button button-primary" href='/products">Browse products</a></div>`; HarekMall.bindCartButtons(root); root.querySelectorAll(".wishlist-toggle").forEach(button => button.addEventListener("click", () => window.setTimeout(render, 50))); }
    render();
});
