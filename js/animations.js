document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(".category-card, .product-card, .benefit-card, .section-heading");
    targets.forEach(target => target.classList.add("reveal"));
    if (!("IntersectionObserver" in window)) { targets.forEach(target => target.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    targets.forEach(target => observer.observe(target));
});
