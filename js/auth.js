const HarekAuth = (() => {
    const USERS_KEY = "harek-mall-users";
    const SESSION_KEY = "harek-mall-session";
    const users = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const setError = (form, field, message) => { const target = form.querySelector(`[data-error="${field}"]`); if (target) target.textContent = message; };
    const clearErrors = form => form.querySelectorAll("[data-error]").forEach(error => error.textContent = "");
    const currentUser = () => JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    const setSession = user => localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
    function register(form) {
        clearErrors(form);
        const values = Object.fromEntries(new FormData(form));
        let valid = true;
        if (!values.name.trim()) { setError(form, "name", "Enter your name."); valid = false; }
        if (!/^\S+@\S+\.\S+$/.test(values.email)) { setError(form, "email", "Enter a valid email address."); valid = false; }
        if (values.password.length < 6) { setError(form, "password", "Use at least 6 characters."); valid = false; }
        if (values.password !== values.confirmPassword) { setError(form, "confirmPassword", "Passwords do not match."); valid = false; }
        if (!values.terms) { setError(form, "terms", "Please accept the terms to continue."); valid = false; }
        if (!valid) return;
        const allUsers = users();
        if (allUsers.some(user => user.email.toLowerCase() === values.email.toLowerCase())) { setError(form, "email", "An account already uses this email."); return; }
        const user = { name: values.name.trim(), email: values.email.trim().toLowerCase(), password: values.password };
        allUsers.push(user); localStorage.setItem(USERS_KEY, JSON.stringify(allUsers)); setSession(user);
        HarekMall.toast("Account created successfully"); window.setTimeout(() => window.location.href = '/account", 500);
    }
    function login(form) {
        clearErrors(form); const values = Object.fromEntries(new FormData(form));
        const user = users().find(item => item.email === values.email.trim().toLowerCase() && item.password === values.password);
        if (!user) { setError(form, "general", "Email or password is incorrect. Create an account if you are new here."); return; }
        setSession(user); HarekMall.toast(`Welcome back, ${user.name.split(" ")[0]}!`); window.setTimeout(() => window.location.href = '/account", 450);
    }
    function signOut() { localStorage.removeItem(SESSION_KEY); window.location.href = '/"; }
    document.addEventListener("DOMContentLoaded", () => {
        const registerForm = document.querySelector("#register-form"); if (registerForm) registerForm.addEventListener("submit", event => { event.preventDefault(); register(registerForm); });
        const loginForm = document.querySelector("#login-form"); if (loginForm) loginForm.addEventListener("submit", event => { event.preventDefault(); login(loginForm); });
        document.querySelectorAll(".logout-button").forEach(button => button.addEventListener("click", event => { event.preventDefault(); signOut(); }));
        const user = currentUser();
        document.querySelectorAll("[data-user-name]").forEach(element => element.textContent = user ? user.name : "Guest shopper");
        document.querySelectorAll("[data-user-email]").forEach(element => element.textContent = user ? user.email : "Sign in to manage your account");
        const ordersRoot = document.querySelector("#orders-list");
        if (ordersRoot) {
            const orders = JSON.parse(localStorage.getItem("harek-mall-orders") || "[]");
            ordersRoot.innerHTML = orders.length ? orders.map(order => `<article class="order-card"><img src="${order.items[0].product.image}" alt=""><div><h2>Order ${order.id}</h2><p>${order.date} · ${order.items.reduce((sum, item) => sum + item.quantity, 0)} item(s)</p><strong>${HarekMall.formatPrice(order.total)}</strong></div><span class="status-pill">Confirmed</span></article>`).join("") : `<div class="empty-state"><span>📦</span><h2>No orders yet</h2><p>When you place an order, its details will be shown here.</p><a class="button button-primary" href='/products">Start shopping</a></div>`;
        }
    });
    return { currentUser, signOut };
})();
