# Harek Mall

Harek Mall is a responsive, front-end e-commerce demo for shopping mobiles, clothes, and footwear. It is built with plain HTML, CSS, and JavaScript so it can be opened directly in a browser without a build step.

## Run locally

Open [html/index.html](html/index.html) in a browser. For the most reliable navigation experience, serve the project folder with a lightweight local server, for example VS Code's **Live Server** extension.

## Project structure

```text
harek mall.in/
├── assets/
│   ├── icons/              # Local icon assets
│   └── images/             # Local product and UI imagery
├── css/
│   ├── style.css           # Base tokens, layout, and global styles
│   ├── animations.css      # Motion and keyframe rules
│   ├── components.css      # Reusable UI components
│   ├── auth.css            # Authentication pages
│   ├── products.css        # Catalogue and product details
│   ├── cart.css            # Cart and checkout pages
│   ├── dashboard.css       # Account and dashboard pages
│   └── responsive.css      # Final cross-page responsive refinements
├── html/
│   ├── index.html
│   ├── products.html
│   ├── product-detail.html
│   ├── login.html
│   ├── register.html
│   ├── cart.html
│   ├── checkout.html
│   ├── account.html
│   ├── wishlist.html
│   └── 404.html
├── js/
│   ├── data.js             # Product catalogue
│   ├── main.js             # Shared navigation, cards, notifications, cart helpers
│   ├── animations.js       # Scroll and entrance effects
│   ├── auth.js             # Client-side authentication
│   ├── products.js         # Filtering, sorting, and catalogue rendering
│   ├── product-detail.js   # Product detail rendering
│   ├── cart.js             # Cart page behaviour
│   ├── checkout.js         # Checkout validation and order flow
│   └── wishlist.js         # Wishlist behaviour
└── README.md
```

## Current implementation

- Responsive home page, catalogue, product details, cart, checkout, account, wishlist, and 404 page
- Search, category filters, product sorting, size/colour selection UI, and scroll-in animations
- Registration and login validation with browser-local demo accounts
- Browser-local cart, wishlist, and order history persistence
- Checkout address validation and a demo order-confirmation flow
- Accessible navigation, form labels, focus states, skip links, and feedback toasts

## Development conventions

- Keep page files in `html/`, feature scripts in `js/`, and styles in `css/`.
- Use relative paths from HTML pages: `../css/`, `../js/`, and `../assets/`.
- Product, wishlist, account, and order state are demo-only browser data; no production backend or payment processing is connected.

## Completed phases

1. Setup
2. Design system
3. Core pages
4. Authentication
5. Products
6. Cart and checkout
7. User features
8. Final polish
