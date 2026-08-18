// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PRODUCTS_DATA = [
  {
    id: 1, name: "PEACE OF MIND", category: "fresh",
    notes: "Fresh · Calm · Comforting",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/peaceofmind.png",
    desc: "This is the kind of fragrance that makes you feel more polished, calmer, and more confident without trying too hard. If you love fresh scents that still feel warm and mature — Peace of Mind is ready to become your comfort scent.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://shopee.co.id/SHEM-PARFUM-PEACE-OF-MIND-i.42480258.29217791856?extraParams=%7B%22display_model_id%22%3A325586559973%2C%22model_selection_logic%22%3A3%7D",
      tokopedia: "https://tk.tokopedia.com/ZS9vFVMnX",
      tiktok:    "https://vt.tokopedia.com/t/ZS9FuGqNg4wqk-rt2pJ/"
    }
  },
  {
    id: 2, name: "VELVET BLOOM", category: "floral",
    notes: "Soft · Sweet · Irresistible",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/velvetbloom.png",
    desc: "Velvet Bloom is the kind of fragrance that makes people ask, ‘What perfume are you wearing?’",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/1gZ1EjuT",
      tokopedia: "https://tk.tokopedia.com/ZS9vFq7SP/",
      tiktok:    "https://vt.tokopedia.com/t/ZS9FuGCwykntg-hcseU/"
    }
  },
  {
    id: 3, name: "TOBACCO ROYALE", category: "woody",
    notes: "Warm · Sweet · Powerful",
    price: 100000, badge: "new", color: "#ffffff",
    img: "asset/product/tobaccoroyale.png",
    desc: "Imagine a tobacco scent that feels warm, elegant, and luxurious. Not the smell of cigarettes — but a smooth and classy tobacco fragrance. This is the kind of perfume that makes you feel more authoritative and sophisticated.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/eUGi2ikH",
      tokopedia: "https://tk.tokopedia.com/ZS9vFqSU4/",
      tiktok:    "https://vt.tokopedia.com/t/ZS9FutJMyabkd-LsnIE/"
    }
  },
  {
    id: 4, name: "GREEN ENCHANTMENT", category: "fresh",
    notes: "Clean · Fresh · Powerful",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/greenenchantment.png",
    desc: "This is the kind of fragrance that makes people say: ‘Your scent is so good, it’s clean.’ If you love light, fresh scents that boost your mood — Green Enchantment by SHEM is a must-have.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/55DDMRmL",
      tokopedia: "https://tk.tokopedia.com/ZS9vFqyjc/",
      tiktok:    "https://vt.tokopedia.com/t/ZS9FuGnxEbNmK-YcLxk/"
    }
  },
  {
    id: 5, name: "SCENT OF AMBITION", category: "oriental",
    notes: "Oud · Rose · Patchouli",
    price: 100000, badge: "new", color: "#ffffff",
    img: "asset/product/scentofambition.png",
    desc: "Scent of Ambition is a bold statement of self. The luxurious blend of Oud, romantic Rose, and warm Patchouli creates a complex and character-rich oriental composition. For those who aren't afraid to dream big.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/iGhrjZ89",
      tokopedia: "https://tk.tokopedia.com/ZS9vFDCQJ/",
      tiktok:    "https://vt.tokopedia.com/t/ZS9FuG7WgT9CM-CopI3/"
    }
  },
  {
    id: 6, name: "SPREAD LOVE", category: "floral",
    notes: "Pure · Elegant · Addictive",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/SPREADLOVE.png",
    desc: "Spread Love is the fragrance for you who wants to look gentle, but still has a strong character. Clean. Elegant. Makes people want to get closer.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/MmtQXsLe",
      tokopedia: "https://tk.tokopedia.com/ZS9vFXMGX/",
      tiktok:    "https://vt.tokopedia.com/t/ZS9FuGbmFEpgq-0PeUW/"
    }
  },
  {
    id: 7, name: "WOODED NECTAR", category: "woody",
    notes: "Amberwood · Patchouli · Oakmoss",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/wooddednectar.png",
    desc: "Wooded Nectar is a unique blend between a gentle sweetness and elegant wood notes. Not a childish sweetness, but a deep, warm, and sophisticated fragrance. This is the type of scent that makes people say: \"Your fragrance is different, really nice.\"",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/tQqbw83f",
      tokopedia: "https://tk.tokopedia.com/ZS9vFHdQD/",
      tiktok:    "https://vt.tokopedia.com/t/ZS9FuGT8PmwWV-S49v8/"
    }
  },
  {
    id: 8, name: "FREESIA LAGOON", category: "fresh",
    notes: "Fresh · Sweet · Elegant",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/freesialagoon.png",
    desc: "Imagine you're at the seaside, with a gentle breeze and a warm, non-blazing sun. Fresh, calm, yet still feminine. That's the vibe of Freesia Lagoon. This is the kind of fragrance that makes people feel that you're bright, friendly, and easy to love.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/6QY5zstf",
      tokopedia: "https://tk.tokopedia.com/ZS9vFQ4Mo/",
      tiktok:    "https://vt.tokopedia.com/t/ZS9FuGsMKWjoD-AjH2f/"
    }
  },
  {
    id: 9, name: "ENERGIQUE BREEZE", category: "fresh",
    notes: "Fresh · Clean · Powerful",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/energiquebreeze.png",
    desc: "Imagine the fresh citrus aroma of grapefruit and lemon that instantly boosts your energy. With a hint of mint and pink pepper, it offers a refreshing sensation that remains characterful.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/fVq78ywG",
      tokopedia: "https://tk.tokopedia.com/ZS9vFS712/",
      tiktok:    "https://vt.tokopedia.com/t/ZS9FuGEUNKmBA-Zt3D9/"
    }
  },
  {
    id: 10, name: "SPICE OF THE SEA", category: "woody",
    notes: "Fresh · Salty · Mysterious",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/spiceofthesea.png",
    desc: "Imagine the gentle sea breeze on a warm evening. Fresh, slightly salty, but warm on the skin. This is the type of fragrance that makes people feel at ease, yet has depth. If you love the elegant scent of the sea that stands out from the rest — Spice of the Sea is a must-try.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/QtTbSbKV",
      tokopedia: "https://tk.tokopedia.com/ZS9vFxAYx/",
      tiktok:    "https://vt.tokopedia.com/t/ZS9Fute2kaUsj-sUXSc/"
    }
  },
  {
    id: 11, name: "SERENITY", category: "woody",
    notes: "Fresh · Calm · Soft",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/serenity.png",
    desc: "Serenity is not about drawing attention, but about making people comfortable.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/C29Vzec9",
      tokopedia: "",
      tiktok:    ""
    }
  },
  {
    id: 12, name: "BLOOMSCAPE", category: "woody",
    notes: "",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/bloomscape.png",
    desc: "Bloomscape is not about drawing attention, but about making people slowly fall in love.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
      ],
    marketplace: {
      shopee:    "https://id.shp.ee/QmwqLmry",
      tokopedia: "",
      tiktok:    ""
    }
  },
  {
    id: 13, name: "MOKSA", category: "woody",
    notes: "Fresh · Floral · Nature",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/moksa.png",
    desc: "Moksa is the fragrance for those who know, true strength does not always roar loudly.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/P8MxBTdg",
      tokopedia: "",
      tiktok:    ""
    }
  },
  {
    id: 14, name: "LUMINAIR", category: "woody",
    notes: "Fresh · Citrus · Nature",
    price: 100000, badge: null, color: "#ffffff",
    img: "asset/product/luminairr.png",
    desc: "Luminair is the type of fragrance that makes people feel comfortable when they are near you.",
    sizes: [
      { label:"10ml", price: 100000 },
      { label:"55ml", price: 350000 }
    ],
    marketplace: {
      shopee:    "https://id.shp.ee/bwxQ42Ug",
      tokopedia: "",
      tiktok:    ""
    }
  }
];

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
let cart = [];
let activeFilter = "semua";

// ─────────────────────────────────────────────
// BOTTLE SVG (fallback jika tidak ada foto)
// ─────────────────────────────────────────────
function bottleSVG(color) {
  return `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="32" width="20" height="12" rx="2" fill="#c8aa7e"/>
    <rect x="46" y="22" width="28" height="14" rx="3" fill="#b89a6a"/>
    <rect x="50" y="17" width="20" height="10" rx="2" fill="#9a8055"/>
    <path d="M32 52 Q28 62 26 82 L26 148 Q26 162 60 162 Q94 162 94 148 L94 82 Q92 62 88 52 Z" fill="${color}"/>
    <path d="M32 52 Q28 62 26 82 L26 148 Q26 162 60 162 Q94 162 94 148 L94 82 Q92 62 88 52 Z" fill="rgba(184,154,106,0.12)"/>
    <path d="M32 68 Q28 78 26 98 L26 148 Q26 160 60 160 Q94 160 94 148 L94 98 Q92 78 88 68 Z" fill="rgba(184,154,106,0.22)"/>
    <rect x="38" y="95" width="44" height="52" rx="1" fill="rgba(255,255,255,0.8)"/>
    <line x1="42" y1="107" x2="78" y2="107" stroke="#b89a6a" stroke-width="0.4"/>
    <line x1="42" y1="138" x2="78" y2="138" stroke="#b89a6a" stroke-width="0.4"/>
    <text x="60" y="120" text-anchor="middle" font-family="serif" font-size="7" fill="#1a1612" font-style="italic">SHEM</text>
    <text x="60" y="130" text-anchor="middle" font-family="sans-serif" font-size="4" fill="#6b5f52" letter-spacing="1.5">PARFUM</text>
    <path d="M40 60 Q37 85 37 125" stroke="rgba(255,255,255,0.55)" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`;
}

// ─────────────────────────────────────────────
// RENDER PRODUCTS
// ─────────────────────────────────────────────
function renderProducts(products) {
  const grid = document.getElementById("productsGrid");
  if (!products.length) {
    grid.innerHTML = `<p style="color:var(--mid);padding:2rem;grid-column:1/-1;text-align:center;">Tidak ada produk ditemukan.</p>`;
    return;
  }
  grid.innerHTML = products.map(p => `
    <div class="product-card" data-category="${p.category}" data-id="${p.id}" onclick="openModal(${p.id})" style="cursor:pointer;">
      <div class="product-img" style="background:${p.color};">
        ${p.badge === "new"  ? '<span class="badge-new">New</span>'   : ''}
        ${p.badge === "sale" ? '<span class="badge-sale">Sale</span>' : ''}
        ${p.img
          ? `<img src="${p.img}" alt="${p.name}" class="product-bottle-img" />`
          : bottleSVG(p.color)
        }
      </div>
      <div class="product-info">
        <p class="product-category">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-notes">${p.notes}</p>
        <div class="product-footer">
          <div class="product-price">
            ${p.originalPrice ? `<span class="original">Rp ${p.originalPrice.toLocaleString("id-ID")}</span>` : ""}
            Rp ${p.price.toLocaleString("id-ID")}
          </div>
          <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${p.id})" title="add to cart!">+</button>
        </div>
      </div>
    </div>
  `).join("");
}

function filterProducts(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const filtered = cat === "semua"
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category.toLowerCase() === cat.toLowerCase());
  renderProducts(filtered);
  if (typeof reObserveProducts === "function") reObserveProducts(); // Re-observe untuk animasi
}

// ─────────────────────────────────────────────
// PRODUCT MODAL
// ─────────────────────────────────────────────
function openModal(productId) {
  const p = PRODUCTS_DATA.find(function(x) { return x.id === productId; });
  if (!p) return;

  document.getElementById('modalImg').src = p.img || '';
  document.getElementById('modalImg').alt = p.name;
  document.getElementById('modalBadge').textContent = p.badge ? p.badge.toUpperCase() : '';
  document.getElementById('modalBadge').style.display = p.badge ? 'inline-block' : 'none';
  document.getElementById('modalCategory').textContent = p.category.toUpperCase();
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalNotes').textContent = p.notes;
  document.getElementById('modalDesc').textContent = p.desc || '';
  document.getElementById('modalPrice').textContent = 'Rp ' + p.price.toLocaleString('id-ID');
  document.getElementById('modalOriginalPrice').textContent = p.originalPrice
    ? 'Rp ' + p.originalPrice.toLocaleString('id-ID') : '';
  document.getElementById('modalOriginalPrice').style.display = p.originalPrice ? 'inline' : 'none';

  // Sizes
  var sizesEl = document.getElementById('modalSizes');
  sizesEl.innerHTML = '';
  var buyBtn = document.getElementById('modalBuy');

  // Nonaktifkan tombol beli sampai size dipilih
  buyBtn.disabled = true;
  buyBtn.classList.add('btn-disabled');

  // Track harga yang dipilih
var selectedPrice = p.sizes && p.sizes.length === 1 ? p.sizes[0].price : null;

(p.sizes || []).forEach(function(size) {
  var btn = document.createElement('button');
  btn.className = 'size-btn';
  btn.textContent = size.label;
  btn.addEventListener('click', function() {
    sizesEl.querySelectorAll('.size-btn').forEach(function(b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    selectedPrice = size.price;

    // Update harga di modal
    document.getElementById('modalPrice').textContent = 'Rp ' + size.price.toLocaleString('id-ID');

    // Aktifkan tombol
    buyBtn.disabled = false;
    buyBtn.classList.remove('btn-disabled');
    addCartBtn.disabled = false;
    addCartBtn.classList.remove('btn-disabled');
  });
  sizesEl.appendChild(btn);
});

// Jika hanya 1 ukuran, langsung aktifkan
if (p.sizes && p.sizes.length === 1) {
  sizesEl.querySelector('.size-btn').classList.add('active');
  document.getElementById('modalPrice').textContent = 'Rp ' + p.sizes[0].price.toLocaleString('id-ID');
  buyBtn.disabled = false;
  buyBtn.classList.remove('btn-disabled');
  addCartBtn.disabled = false;
  addCartBtn.classList.remove('btn-disabled');
}

  var addCartBtn = document.getElementById('modalAddCart');

// Nonaktifkan + Keranjang juga jika lebih dari 1 ukuran
if (p.sizes && p.sizes.length > 1) {
  addCartBtn.disabled = true;
  addCartBtn.classList.add('btn-disabled');
} else {
  addCartBtn.disabled = false;
  addCartBtn.classList.remove('btn-disabled');
}

addCartBtn.onclick = function() {
  if (addCartBtn.disabled) return;
  addToCart(p.id, selectedPrice);
  closeModal();
};

buyBtn.onclick = function() {
  if (buyBtn.disabled) return;
  closeModal();
  openMarketModal(p.name, p.marketplace, p.id, selectedPrice);
};

  // Tombol Beli → buka marketplace modal
  buyBtn.onclick = function() {
    if (buyBtn.disabled) return;
    closeModal();
    openMarketModal(p.name, p.marketplace, p.id);
  };

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleModalClick(e) {
  if (e.target === document.getElementById('productModal')) closeModal();
}

// ─────────────────────────────────────────────
// MARKETPLACE MODAL
// ─────────────────────────────────────────────
var currentMarketProductId = null;

function openMarketModal(productName, marketplace, productId) {
  document.getElementById('marketProductName').textContent = productName;
  document.getElementById('linkShopee').href    = (marketplace && marketplace.shopee)    ? marketplace.shopee    : '#';
  document.getElementById('linkTokopedia').href = (marketplace && marketplace.tokopedia) ? marketplace.tokopedia : '#';
  document.getElementById('linkTiktok').href    = (marketplace && marketplace.tiktok)    ? marketplace.tiktok    : '#';
  currentMarketProductId = productId;
  document.getElementById('marketModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMarketModal() {
  document.getElementById('marketModal').classList.remove('open');
  document.body.style.overflow = '';
}

function buyOnWebsite() {
  if (currentMarketProductId) addToCart(currentMarketProductId);
  closeMarketModal();
}

// Event listener tombol X dan klik luar marketplace modal
window.addEventListener('load', function() {
  var closeBtn = document.getElementById('marketCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMarketModal();
    });
  }
  var overlay = document.getElementById('marketModal');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeMarketModal();
    });
  }
});

// ─────────────────────────────────────────────
// CART
// ─────────────────────────────────────────────
function addToCart(productId, selectedPrice) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  // Gunakan harga yang dipilih, fallback ke harga default
  const finalPrice = selectedPrice || product.price;

  // Cart key gabungkan id + harga supaya 10ml & 55ml dianggap item berbeda
  const cartKey = productId + '_' + finalPrice;
  const existing = cart.find(c => c.cartKey === cartKey);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, price: finalPrice, cartKey: cartKey, qty: 1 });
  }
  updateCartUI();
  showToast(product.name + " added to cart!");
}

function updateQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = "Rp " + total.toLocaleString("id-ID");

  const itemsEl = document.getElementById("cartItems");
  const emptyEl = document.getElementById("cartEmpty");

  if (!cart.length) {
    emptyEl.style.display = "flex";
    itemsEl.querySelectorAll(".cart-item").forEach(e => e.remove());
    return;
  }
  emptyEl.style.display = "none";
  itemsEl.querySelectorAll(".cart-item").forEach(e => e.remove());

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `<div class="cart-item-img">
      ${item.img
      ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:contain;padding:4px;" />`
      : bottleSVG(item.color)
      }
  </div>
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Rp ${item.price.toLocaleString("id-ID")}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">Rp ${(item.price * item.qty).toLocaleString("id-ID")}</div>
    `;
    itemsEl.appendChild(div);
  });
}

function toggleCart() {
  document.getElementById("cartOverlay").classList.toggle("open");
  document.getElementById("cartSidebar").classList.toggle("open");
}

function handleCheckout() {
  if (!cart.length) { showToast("Cart is empty!"); return; }
  
  localStorage.setItem("shem_cart", JSON.stringify(cart));

  window.location.href = "form.html";
}

// ─────────────────────────────────────────────
// INSTAGRAM FEED (LOCAL)
// ─────────────────────────────────────────────
const igPost = [
  {
    img: 'asset/post/postshem6.png',
    caption: 'Take what you need today and walk through your day with your head held high 👀',
    link: 'https://www.instagram.com/p/DYGHIJAk96J/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=='
  },
  {
    img: 'asset/post/postshem1.png',
    caption: 'SHEM Parfum from morning briefings to late evenings, a scent that stays with you, all day long ⏳✨',
    link: 'https://www.instagram.com/p/DXthbj0CR44/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },
  {
    img: 'asset/post/postshem2.png',
    caption: 'Be a pretty girl, with a pretty heart, a pretty mind, and pretty vibes 🤍',
    link: 'https://www.instagram.com/p/DXalPnkCbpE/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=='
  },
  {
    img: 'asset/post/postshem3.png',
    caption: 'Dalam rangka memeriahkan Hari Kartini, SHEM mengajak kamu ikut merayakan semangat perempuan Indonesia ✨',
    link: 'https://www.instagram.com/p/DXYx43EiV6R/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=='
  },
  {
    img: 'asset/post/postshem4.png',
    caption: 'Yuk, sempatkan waktu untuk mampir dan coba langsung koleksi Extrait de Parfum dari SHEM Parfum ✨',
    link: 'https://www.instagram.com/p/DWyTUtiice7/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=='
  },
  {
    img: 'asset/post/postshem5.png',
    caption: 'SHEM Parfum punya promo spesial untuk kamu. Pembelian 2 pcs box besar mendapatkan sajadah!',
    link: 'https://www.instagram.com/p/DV_StR8CYNA/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=='
  },
];

function loadIgFeed() {
  const grid = document.getElementById('igFeedGrid');
  if (!grid) return;
  igPost.forEach(function(post) {
    var link = post.link;
    var item = document.createElement('div');
    item.className = 'ig-feed-item';
    item.innerHTML = `
      <img src="${post.img}" alt="${post.caption}" loading="lazy"/>
      <div class="ig-feed-overlay">
        <p class="ig-feed-caption">${post.caption}</p>
      </div>
    `;
    item.addEventListener('click', function() {
      window.open(link, '_blank', 'noopener');
    });
    grid.appendChild(item);
  });
}

// ─────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
// ── Load produk dari backend ──
async function loadProducts() {
  try {
    const res  = await fetch('api/products.php');
    const data = await res.json();
    if (data.success) {
      renderProducts(data.products);
    } else {
      renderProducts(PRODUCTS_DATA); // fallback ke data lokal
    }
  } catch (err) {
    console.error('Gagal load produk:', err);
    renderProducts(PRODUCTS_DATA); // fallback ke data lokal
  }
}

loadProducts();
updateCartUI();
loadIgFeed();

// ── Cek status login di navbar ──
  var shemUser = JSON.parse(localStorage.getItem('shem_user'));
  var navLoginBtn = document.getElementById('navLoginBtn');
  if (navLoginBtn) {
    if (shemUser && shemUser.name) {
      navLoginBtn.textContent = '👤 ' + shemUser.name.split(' ')[0];
      navLoginBtn.href = 'profile.html';
    } else {
      navLoginBtn.textContent = 'Login';
      navLoginBtn.href = 'login.html';
    }
  }

/*
 * ──────────────────────────────────────────────────
 * CATATAN UNTUK BACKEND (teman lo):
 *
 * 1. Ganti PRODUCTS_DATA dengan fetch ke GET /api/products
 * 2. handleCheckout() → POST /api/orders dengan data cart
 * 3. Semua fungsi render, cart, dan filter tidak perlu diubah —
 *    cukup ganti data source di atas.
 * ──────────────────────────────────────────────────
 */