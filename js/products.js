document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#products-grid");
    if (!grid) return;
    const searchInput = document.querySelector("#product-search");
    const categorySelect = document.querySelector("#category-filter");
    const sortSelect = document.querySelector("#sort-products");
    const count = document.querySelector("#product-count");
    const urlCategory = new URLSearchParams(window.location.search).get("category");

    if (urlCategory && [...categorySelect.options].some(option => option.value === urlCategory)) categorySelect.value = urlCategory;

    function render() {
        const query = searchInput.value.trim().toLowerCase();
        let products = HAREK_PRODUCTS.filter(product => {
            const matchesCategory = !categorySelect.value || product.category === categorySelect.value;
            const text = `${product.name} ${product.brand} ${product.category}`.toLowerCase();
            return matchesCategory && text.includes(query);
        });
        if (sortSelect.value === "price-low") products.sort((a, b) => a.price - b.price);
        if (sortSelect.value === "price-high") products.sort((a, b) => b.price - a.price);
        if (sortSelect.value === "rating") products.sort((a, b) => b.rating - a.rating);
        count.textContent = `${products.length} product${products.length === 1 ? "" : "s"} found`;
        grid.innerHTML = products.length ? products.map(HarekMall.productCard).join("") : `<div class="empty-state"><span>🔎</span><h2>No products found</h2><p>Try a different search or clear your filters.</p></div>`;
        HarekMall.bindCartButtons(grid);
    }

    [searchInput, categorySelect, sortSelect].forEach(control => control.addEventListener("input", render));
    render();
});
