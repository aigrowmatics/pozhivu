/* ===== GreenLeaf Store - Main JavaScript ===== */

// ===== CART STATE =====
const CartManager = (() => {
  const CART_KEY = 'greenleaf_cart';
  const WISHLIST_KEY = 'greenleaf_wishlist';

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }
  function getWishlist() {
    try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
    catch { return []; }
  }
  function saveWishlist(wl) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wl));
  }
  function addItem(product) {
    const cart = getCart();
    const idx = cart.findIndex(i => i.id === product.id);
    if (idx > -1) {
      cart[idx].qty = (cart[idx].qty || 1) + 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    saveCart(cart);
    showToast(`🛒 ${product.name} added to cart!`);
  }
  function removeItem(id) {
    saveCart(getCart().filter(i => i.id !== id));
  }
  function updateQty(id, qty) {
    const cart = getCart();
    const idx = cart.findIndex(i => i.id === id);
    if (idx > -1) {
      if (qty < 1) { cart.splice(idx, 1); }
      else { cart[idx].qty = qty; }
    }
    saveCart(cart);
  }
  function getTotal() {
    return getCart().reduce((s, i) => s + i.price * (i.qty || 1), 0);
  }
  function getCount() {
    return getCart().reduce((s, i) => s + (i.qty || 1), 0);
  }
  function clearCart() {
    saveCart([]);
  }
  function toggleWishlist(product) {
    const wl = getWishlist();
    const idx = wl.findIndex(i => i.id === product.id);
    if (idx > -1) {
      wl.splice(idx, 1);
      showToast(`💔 Removed from wishlist`);
    } else {
      wl.push(product);
      showToast(`❤️ Added to wishlist!`);
    }
    saveWishlist(wl);
    return idx === -1; // true if added
  }
  function isInWishlist(id) {
    return getWishlist().some(i => i.id === id);
  }
  function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
      const count = getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
  return { getCart, saveCart, getWishlist, addItem, removeItem, updateQty, getTotal, getCount, clearCart, toggleWishlist, isInWishlist, updateCartBadge };
})();

// ===== TOAST NOTIFICATION =====
function showToast(message, duration = 3000) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ===== WISHLIST BUTTON INIT =====
function initWishlistButtons() {
  document.querySelectorAll('[data-wishlist]').forEach(btn => {
    const productId = btn.dataset.wishlist;
    if (CartManager.isInWishlist(productId)) {
      btn.classList.add('active');
      btn.innerHTML = '❤️';
    }
    btn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const product = {
        id: productId,
        name: btn.dataset.name || 'Product',
        price: parseFloat(btn.dataset.price || 0),
        emoji: btn.dataset.emoji || '🌿'
      };
      const added = CartManager.toggleWishlist(product);
      btn.classList.toggle('active', added);
      btn.innerHTML = added ? '❤️' : '🤍';
    });
  });
}

// ===== ADD TO CART BUTTONS =====
function initCartButtons() {
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        emoji: btn.dataset.emoji || '🌿',
        category: btn.dataset.category || ''
      };
      CartManager.addItem(product);
      btn.textContent = '✓ Added!';
      btn.style.background = '#40916C';
      setTimeout(() => {
        btn.textContent = '🛒 Add to Cart';
        btn.style.background = '';
      }, 2000);
    });
  });
}

// ===== TABS =====
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const el = document.getElementById(panel);
      if (el) el.classList.add('active');
    });
  });
}

// ===== QTY SELECTORS =====
function initQtySelectors() {
  document.querySelectorAll('.qty-selector').forEach(sel => {
    const input = sel.querySelector('.qty-input');
    const minus = sel.querySelector('[data-action="minus"]');
    const plus  = sel.querySelector('[data-action="plus"]');
    if (minus) minus.addEventListener('click', () => {
      const v = parseInt(input.value) - 1;
      if (v >= 1) { input.value = v; input.dispatchEvent(new Event('change')); }
    });
    if (plus) plus.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
      input.dispatchEvent(new Event('change'));
    });
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('mobile-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
}

// ===== AUTH GUARD =====
function requireAuth(redirectTo) {
  const user = localStorage.getItem('pozhivu_user');
  if (!user) {
    window.location.href = redirectTo || '../index.html';
    return false;
  }
  return true;
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  CartManager.updateCartBadge();
  initWishlistButtons();
  initCartButtons();
  initTabs();
  initQtySelectors();
  initMobileMenu();
  initSmoothScroll();
});
