# 🌿 GreenLeaf Store — E-Commerce Website

A fully functional, ready-to-deploy organic e-commerce website with green-to-white theme, built with pure HTML, CSS, and vanilla JavaScript. No build tools or frameworks required.

---

## 📁 Project Structure

```
greenleaf-store/
├── index.html              ← Login Page (entry point)
├── register.html           ← Create Account Page
├── home.html               ← Homepage with Hero, Products, About, Contact
├── cart.html               ← Shopping Cart (with promo codes)
├── checkout.html           ← Checkout with Shipping + Payment
├── css/
│   └── style.css           ← All styles (green-to-white theme)
├── js/
│   └── main.js             ← Cart, wishlist, toast, UI interactions
├── products/
│   ├── product-1.html      ← Organic Glow Serum (Skincare)
│   ├── product-2.html      ← Bamboo Water Bottle (Lifestyle)
│   ├── product-3.html      ← Forest Essential Oil (Wellness)
│   ├── product-4.html      ← Green Clay Face Mask (Skincare)
│   └── product-5.html      ← Herbal Tea Collection (Nutrition)
└── legal/
    ├── privacy.html         ← Privacy Policy
    ├── terms.html           ← Terms of Service
    ├── returns.html         ← Return & Refund Policy
    └── shipping.html        ← Shipping Policy (with all partners)
```

---

## 🚀 Pages Overview

| Page | File | Description |
|---|---|---|
| Login | `index.html` | Sign-in with email/password or social login |
| Register | `register.html` | Create new account |
| Homepage | `home.html` | Hero, categories, products, about, testimonials, newsletter, contact |
| Product 1 | `products/product-1.html` | Organic Glow Serum — with gallery, tabs, reviews |
| Product 2 | `products/product-2.html` | Bamboo Water Bottle |
| Product 3 | `products/product-3.html` | Forest Essential Oil Blend |
| Product 4 | `products/product-4.html` | Green Clay Face Mask |
| Product 5 | `products/product-5.html` | Herbal Tea Collection |
| Cart | `cart.html` | Cart with qty controls, promo codes, order summary |
| Checkout | `checkout.html` | Address, shipping method, payment, order confirmation |
| Privacy | `legal/privacy.html` | Full DPDP Act compliant Privacy Policy |
| Terms | `legal/terms.html` | Terms of Service |
| Returns | `legal/returns.html` | Return & Refund Policy |
| Shipping | `legal/shipping.html` | Shipping Policy with all courier partners |

---

## ✨ Features

- **Authentication** — Login & Register pages with localStorage session
- **Shopping Cart** — Add/remove items, qty controls, persisted in localStorage
- **Wishlist** — Toggle wishlist on any product
- **Promo Codes** — Try `GREEN200` (₹200 off) or `FIRST10` (10% off) in cart
- **Checkout Flow** — Address form, 3 shipping options, 5 payment methods
- **Order Confirmation** — Success modal with order ID
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Toast Notifications** — Subtle feedback for cart/wishlist actions
- **Product Tabs** — Description, Ingredients/Specs, How-to-Use, Reviews
- **Legal Pages** — DPDP Act compliant Privacy Policy, Terms, Returns, Shipping

---

## 💳 Payment Gateway Integration (Razorpay)

The checkout is pre-wired for **Razorpay** integration. To enable live payments:

1. Sign up at [razorpay.com](https://razorpay.com) and get your Key ID
2. Add the Razorpay script to `checkout.html`:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```
3. Replace the `placeOrder()` function's `setTimeout` with:
   ```javascript
   const options = {
     key: "YOUR_RAZORPAY_KEY_ID",
     amount: total * 100, // in paise
     currency: "INR",
     name: "GreenLeaf Store",
     description: "Organic Products",
     image: "🌿",
     handler: function(response) {
       // Order confirmed — show success modal
     },
     prefill: {
       name: fname + ' ' + lname,
       email: email,
       contact: phone
     },
     theme: { color: "#2D6A4F" }
   };
   const rzp = new Razorpay(options);
   rzp.open();
   ```

---

## 🚚 Shipping Partners Linked

- **Delhivery** — delhivery.com/tracking
- **BlueDart** — bluedart.com/tracking
- **DTDC** — dtdc.in/tracking
- **Ecom Express** — ecomexpress.in/tracking
- **India Post** — indiapost.gov.in
- **Dunzo / Swiggy Genie** — Same-day Bengaluru

---

## 🌐 Deployment Options

### Option 1: Static Hosting (No backend needed)
Upload all files to any static host:
- **Netlify**: Drag & drop the folder at netlify.com/drop
- **Vercel**: `vercel deploy` via CLI
- **GitHub Pages**: Push to a repo and enable Pages
- **Cloudflare Pages**: Connect repo and deploy

### Option 2: cPanel / Shared Hosting
Upload all files to `public_html/` via FTP or File Manager.
Point your domain to the folder. Done!

### Option 3: AWS S3 Static Website
```bash
aws s3 sync ./ s3://your-bucket-name --acl public-read
```

---

## 🎨 Customisation

### Change Brand Name
Find & replace `GreenLeaf` across all `.html` files.

### Change Colour Scheme
Edit CSS variables in `css/style.css`:
```css
:root {
  --green-800: #2D6A4F;   /* Primary brand colour */
  --green-700: #40916C;   /* Secondary / accent */
  --accent:    #D4A853;   /* Gold accent */
}
```

### Add Product Images
Replace emoji placeholders in product pages with real `<img>` tags:
```html
<!-- Replace this: -->
<div class="product-img-placeholder">✨</div>
<!-- With this: -->
<img src="../images/your-product.jpg" alt="Product Name" />
```

### Add Real Products
Use `products/product-1.html` as a template. Duplicate and update:
- Product name, category, price, description
- `data-id`, `data-name`, `data-price` on cart/wishlist buttons
- Tab content (ingredients, how to use)

---

## 📧 Contact Info (Update Before Launch)

Search and replace these placeholders across legal pages:
- `hello@greenleaf.store` → your email
- `returns@greenleaf.store` → your returns email
- `+91 800 123 4567` → your phone number
- `Indiranagar, Bengaluru — 560038` → your address

---

## 📜 Legal Pages

All legal pages are pre-written and compliant with:
- **Digital Personal Data Protection Act, 2023 (India)**
- **Consumer Protection Act, 2019**
- **Information Technology Act, 2000**

> ⚠️ Disclaimer: These are template documents. Please have a qualified legal professional review them before going live.

---

Made with 💚 by GreenLeaf Store
