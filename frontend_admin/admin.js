// ===== SHEM Admin Dashboard =====

    const USE_BACKEND = false; // ganti true kalau backend sudah siap // Midtrans hanya boleh dipanggil oleh backend karena Server Key bersifat rahasia. // Endpoint backend yang disiapkan: GET api/admin/midtrans/overview.php

    // Harga otomatis per ukuran — sumber tunggal kebenaran harga
    const SIZE_PRICES = { '10ml': 100000, '55ml': 350000 };

    // Harga produk = harga terendah dari ukuran yang dipilih (dipakai untuk revenue/kalkulasi)
    function priceForSizes(sizes) {
    var prices = (sizes || []).map(function (s) { return SIZE_PRICES[s]; }).filter(function (x) { return x != null; });
    if (!prices.length) return 0;
    return Math.min.apply(null, prices);
    }

    // Tampilan harga untuk tabel — rentang kalau lebih dari satu ukuran
    function priceDisplay(sizes) {
    var prices = (sizes || []).map(function (s) { return SIZE_PRICES[s]; })
        .filter(function (x) { return x != null; })
        .sort(function (a, b) { return a - b; });
    if (!prices.length) return '—';
    if (prices.length === 1) return formatRp(prices[0]);
    return formatRp(prices[0]) + ' – ' + formatRp(prices[prices.length - 1]);
    }

    // ══════════════════════════════════════════════
    // DEMO LOGIN (sementara, sebelum backend lu jadi)
    // ══════════════════════════════════════════════
    const DEMO_ADMIN = { email: 'shemparfum@gmail.com', password: 'admin123' };

    function toggleAdminPw() {
    var input = document.getElementById('adminPassword');
    input.type = input.type === 'password' ? 'text' : 'password';
    }

    function handleAdminLogin() {
    var email = document.getElementById('adminEmail').value.trim();
    var pw    = document.getElementById('adminPassword').value;
    var errEl = document.getElementById('adminLoginError');
    var btn   = document.getElementById('adminLoginBtn');

    errEl.textContent = '';

    if (!email || !pw) {
        errEl.textContent = 'Email dan password wajib diisi.';
        return;
    }

    btn.textContent = 'Memproses...';
    btn.disabled = true;

    if (USE_BACKEND) {
        fetch('api/admin/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: pw })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            btn.textContent = 'Masuk';
            btn.disabled = false;
            if (data.success) {
            sessionStorage.setItem('shem_admin', JSON.stringify(data.admin));
            enterDashboard();
            } else {
            errEl.textContent = data.message || 'Email atau password salah.';
            }
        })
        .catch(function () {
            btn.textContent = 'Masuk';
            btn.disabled = false;
            errEl.textContent = 'Terjadi kesalahan. Coba lagi.';
        });
    } else {
        // Demo login lokal — hapus kalau backend lu udeh jadi
        setTimeout(function () {
        btn.textContent = 'Masuk';
        btn.disabled = false;
        if (email === DEMO_ADMIN.email && pw === DEMO_ADMIN.password) {
            sessionStorage.setItem('shem_admin', JSON.stringify({ email: email }));
            enterDashboard();
        } else {
            errEl.textContent = 'Email atau password salah. (Demo: ' + DEMO_ADMIN.email + ' / ' + DEMO_ADMIN.password + ')';
        }
        }, 700);
    }
    }

    function enterDashboard() {
    document.getElementById('loginGate').style.display = 'none';
    document.getElementById('adminContainer').style.display = 'flex';
    loadAllData();
    }

    function checkAdminSession() {
    var admin = sessionStorage.getItem('shem_admin');
    if (admin) {
        enterDashboard();
    }
    }

    // Enter key submits login
    document.addEventListener('DOMContentLoaded', function () {
    var pwField = document.getElementById('adminPassword');
    if (pwField) {
        pwField.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') handleAdminLogin();
        });
    }
    checkAdminSession();
    });

    // ══════════════════════════════════════════════
    // DATA STORE (in-memory, fallback kalau belum ada backend dari lu)
    // ══════════════════════════════════════════════

    let ADMIN_PRODUCTS = [
    { id: 1, name: 'VELVET BLOOM',      category: 'floral',   price: 350000, badge: null,  img: 'asset/product/velvetbloom.png',     notes: 'Soft · Sweet · Irresistible', desc: '', sizes: ['55ml'] },
    { id: 2, name: 'TOBACCO ROYALE',    category: 'woody',    price: 350000, badge: 'new', img: 'asset/product/tobaccoroyale.png',   notes: 'Warm · Sweet · Powerful', desc: '', sizes: ['55ml'] },
    { id: 3, name: 'GREEN ENCHANTMENT', category: 'fresh',    price: 350000, badge: null,  img: 'asset/product/greenenchantment.png',notes: 'Clean · Fresh · Powerful', desc: '', sizes: ['55ml'] },
    { id: 4, name: 'SCENT OF AMBITION', category: 'oriental', price: 350000, badge: 'new', img: 'asset/product/scentofambition.png', notes: 'Oud · Rose · Patchouli', desc: '', sizes: ['55ml'] },
    { id: 5, name: 'SERENITY',          category: 'woody',    price: 100000, badge: null,  img: 'asset/hehehe.png',                  notes: 'Fresh · Calm · Soft', desc: '', sizes: ['10ml', '55ml'] },
    ];

    let ADMIN_ORDERS = [
    { id: 'SHEM-001', customer: 'Ezra Wijaya Tama',    items: [{ name: 'Peace of Mind', qty: 1 }],                          total: 350000, payment: 'QRIS', status: 'paid',    address: 'Jl. Melati No. 12, RT 03/RW 05, Kel. Sukamaju, Kec. Cilandak, Jakarta Selatan, DKI Jakarta 12430' },
    { id: 'SHEM-002', customer: 'Naya Putri',     items: [{ name: 'Velvet Bloom', qty: 2 }],                           total: 700000, payment: 'Bank', status: 'pending', address: 'Jl. Kenanga No. 45, Perumahan Griya Asri Blok C2, Kec. Depok, Kota Depok, Jawa Barat 16411' },
    { id: 'SHEM-003', customer: 'Raka Aditya',     items: [{ name: 'Serenity (10ml)', qty: 1 }],                       total: 100000, payment: 'QRIS', status: 'paid',    address: 'Jl. Anggrek Raya No. 8, RT 01/RW 09, Kel. Tembalang, Kec. Tembalang, Kota Semarang, Jawa Tengah 50275' },
    { id: 'SHEM-004', customer: 'Vina Salsabila', items: [{ name: 'Tobacco Royale', qty: 1 }],                         total: 350000, payment: 'Bank', status: 'failed',  address: 'Jl. Cempaka No. 20, Komplek Bumi Indah, Kec. Klojen, Kota Malang, Jawa Timur 65111' },
    ];

    // Kunci localStorage yang dipakai bersama oleh admin.js dan voucher.html
    const CUSTOMERS_STORAGE_KEY = 'shem_admin_customers';

    let DEFAULT_CUSTOMERS = [
    { id: 1, name: 'Ezra Wijaya Tama', email: 'ezrawijaya106@gmail.com', phone: '088214553358', joined: '12 Jun 2026', voucher: null },
    { id: 2, name: 'Naya Putri',       email: 'naya.putri@gmail.com',    phone: '081234567890', joined: '10 Jun 2026', voucher: null },
    { id: 3, name: 'Raka Aditya',      email: 'raka.aditya@gmail.com',   phone: '085678901234', joined: '05 Jun 2026', voucher: null },
    ];

    // Baca member dari localStorage kalau ada; kalau belum, pakai default trs simpan
    // Biar voucher.html (halamanny kepisah) selalu punya data yang sama.
    function loadCustomers() {
    try {
        var saved = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(DEFAULT_CUSTOMERS));
    return DEFAULT_CUSTOMERS;
    }

    function saveCustomers() {
    localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(ADMIN_CUSTOMERS));
    }

    let ADMIN_CUSTOMERS = loadCustomers();

    let ADMIN_REVIEWS = [
    { id: 1, customer: 'Piyann837', product: 'Velvet Bloom',   rating: 5, comment: 'Segar dan tahan lama, untuk dipakai daily enak banget.', reply: null, hidden: false },
    { id: 2, customer: 'Salsa_22',  product: 'Peace of Mind',  rating: 4, comment: 'Wanginya soft, cocok buat kerja.', reply: null, hidden: false },
    { id: 3, customer: 'mrizky.k',  product: 'Tobacco Royale', rating: 5, comment: 'Maskulin banget, jadi favorit!', reply: null, hidden: false },
    ];

    // ══════════════════════════════════════════════
    // RENDER: DASHBOARD
    // ══════════════════════════════════════════════

    function renderDashboard() {
    document.getElementById('statProduk').textContent  = ADMIN_PRODUCTS.length;
    document.getElementById('statOrder').textContent   = ADMIN_ORDERS.length;
    document.getElementById('statRevenue').textContent = formatRp(
        ADMIN_ORDERS.filter(function (o) { return o.status === 'paid'; })
        .reduce(function (s, o) { return s + o.total; }, 0)
    );
    document.getElementById('statPending').textContent = ADMIN_ORDERS.filter(function (o) { return o.status === 'pending'; }).length;

    // Produk Terbaru = 5 produk yang paling baru ditambahkan (urutan terbaru dulu)
    var latest = ADMIN_PRODUCTS.slice(-5).reverse();
    var tbody = document.getElementById('dashboardProductTable');
    tbody.innerHTML = latest.map(function (p) {
        return '<tr>' +
        '<td><div class="prod-cell"><img class="prod-thumb" src="' + escapeHtml(p.img) + '" onerror="this.style.display=\'none\'"/>' + escapeHtml(p.name) + '</div></td>' +
        '<td>' + capitalize(p.category) + '</td>' +
        '<td>' + priceDisplay(p.sizes) + '</td>' +
        '<td><span class="pill active">Aktif</span></td>' +
        '</tr>';
    }).join('');
    }

    // ══════════════════════════════════════════════
    // RENDER + CRUD: PRODUK
    // ══════════════════════════════════════════════

    function renderProduk() {
    var searchInput = document.getElementById('produkSearch');
    var keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var filtered = keyword
        ? ADMIN_PRODUCTS.filter(function (p) { return p.name.toLowerCase().indexOf(keyword) !== -1; })
        : ADMIN_PRODUCTS;

    document.getElementById('produkCount').textContent = filtered.length;

    var tbody = document.getElementById('produkTable');

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--mid);padding:24px 0;">Produk tidak ditemukan.</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(function (p) {
        var badgeHtml = p.badge
        ? '<span class="pill ' + p.badge + '">' + p.badge.toUpperCase() + '</span>'
        : '<span class="pill none">—</span>';

        return '<tr>' +
        '<td><div class="prod-cell"><img class="prod-thumb" src="' + escapeHtml(p.img) + '" onerror="this.style.display=\'none\'"/>' + escapeHtml(p.name) + '</div></td>' +
        '<td>' + capitalize(p.category) + '</td>' +
        '<td>' + priceDisplay(p.sizes) + '</td>' +
        '<td>' + (p.sizes || []).join(', ') + '</td>' +
        '<td>' + badgeHtml + '</td>' +
        '<td><div class="row-actions">' +
            '<button class="icon-btn" title="Edit" onclick="editProduct(' + p.id + ')">✏️</button>' +
            '<button class="icon-btn delete" title="Hapus" onclick="deleteProduct(' + p.id + ')">🗑️</button>' +
        '</div></td>' +
        '</tr>';
    }).join('');
    }

    var editingProductId = null;

    function openProductModal() {
    editingProductId = null;
    document.getElementById('productModalTitle').textContent = 'Tambah Produk';
    document.getElementById('pf_name').value     = '';
    document.getElementById('pf_category').value = 'fresh';
    document.getElementById('pf_badge').value    = '';
    document.getElementById('pf_notes').value    = '';
    document.getElementById('pf_desc').value     = '';
    document.getElementById('pf_img').value      = '';
    document.getElementById('uploadPreview').innerHTML =
        '<span class="upload-icon">📷</span>' +
        '<p class="upload-text">Klik untuk upload gambar</p>' +
        '<p class="upload-sub">JPG, PNG, WEBP — Max 10MB</p>';
    document.getElementById('pf_size10').checked = false;
    document.getElementById('pf_size55').checked = true;
    updateSizePricePreview();
    document.getElementById('productFormError').textContent = '';

    document.getElementById('productModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    }

    function editProduct(id) {
    var p = ADMIN_PRODUCTS.find(function (x) { return x.id === id; });
    if (!p) return;

    editingProductId = id;
    document.getElementById('productModalTitle').textContent = 'Edit Produk';
    document.getElementById('pf_name').value     = p.name;
    document.getElementById('pf_category').value = p.category;
    document.getElementById('pf_badge').value    = p.badge || '';
    document.getElementById('pf_notes').value    = p.notes || '';
    document.getElementById('pf_desc').value     = p.desc || '';
    document.getElementById('pf_img').value      = p.img || '';
    document.getElementById('pf_size10').checked = (p.sizes || []).indexOf('10ml') !== -1;
    document.getElementById('pf_size55').checked = (p.sizes || []).indexOf('55ml') !== -1;
    document.getElementById('productFormError').textContent = '';

    // Tampilkan preview gambar lama kalau ada
    var uploadPreview = document.getElementById('uploadPreview');
    if (p.img) {
        uploadPreview.innerHTML =
        '<img src="' + p.img + '" alt="Preview" style="max-height:120px;object-fit:contain;border-radius:6px;margin-bottom:6px;" />' +
        '<p class="upload-text" style="margin-top:4px;">Gambar saat ini</p>' +
        '<button class="upload-change-btn" onclick="event.stopPropagation(); document.getElementById(\'pf_img_file\').click()">Ganti Gambar</button>';
    } else {
        uploadPreview.innerHTML =
        '<span class="upload-icon">📷</span>' +
        '<p class="upload-text">Klik untuk upload gambar</p>' +
        '<p class="upload-sub">JPG, PNG, WEBP — Max 10MB</p>';
    }
    updateSizePricePreview();

    document.getElementById('productModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    }

    function closeProductModal() {
    document.getElementById('productModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    }

    function handleProductModalClick(e) {
    if (e.target === document.getElementById('productModalOverlay')) closeProductModal();
    }

    function saveProduct() {
    var name     = document.getElementById('pf_name').value.trim();
    var category = document.getElementById('pf_category').value;
    var badge    = document.getElementById('pf_badge').value || null;
    var notes    = document.getElementById('pf_notes').value.trim();
    var desc     = document.getElementById('pf_desc').value.trim();
    var img      = document.getElementById('pf_img').value.trim();
    var sizes    = [];
    if (document.getElementById('pf_size10').checked) sizes.push('10ml');
    if (document.getElementById('pf_size55').checked) sizes.push('55ml');

    var errEl = document.getElementById('productFormError');
    errEl.textContent = '';

    if (!name)              { errEl.textContent = 'Nama produk wajib diisi.'; return; }
    if (sizes.length === 0) { errEl.textContent = 'Pilih minimal 1 ukuran.'; return; }

    // Harga dihitung otomatis dari ukuran yang dipilih — tidak diisi manual lagi
    var price = priceForSizes(sizes);

    var saveBtn = document.getElementById('productSaveBtn');
    saveBtn.textContent = 'Menyimpan...';
    saveBtn.disabled = true;

    var productData = {
        id: editingProductId || Date.now(),
        name: name, category: category, price: price, badge: badge,
        notes: notes, desc: desc, img: img || 'asset/hehehe.png', sizes: sizes
    };

    if (USE_BACKEND) {
        var url    = editingProductId ? 'api/admin/products.php?id=' + editingProductId : 'api/admin/products.php';
        var method = editingProductId ? 'PUT' : 'POST';

        fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            saveBtn.textContent = 'Simpan Produk';
            saveBtn.disabled = false;
            if (data.success) {
            applyProductSave(productData);
            } else {
            errEl.textContent = data.message || 'Gagal menyimpan produk.';
            }
        })
        .catch(function () {
            saveBtn.textContent = 'Simpan Produk';
            saveBtn.disabled = false;
            errEl.textContent = 'Terjadi kesalahan. Coba lagi.';
        });
    } else {
        // Simulasi simpan lokal — hapus kalau backend sudah siap
        setTimeout(function () {
        saveBtn.textContent = 'Simpan Produk';
        saveBtn.disabled = false;
        applyProductSave(productData);
        }, 500);
    }
    }

    function applyProductSave(productData) {
    if (editingProductId) {
        var idx = ADMIN_PRODUCTS.findIndex(function (p) { return p.id === editingProductId; });
        if (idx !== -1) ADMIN_PRODUCTS[idx] = productData;
        showToast('Produk "' + productData.name + '" berhasil diperbarui ✅');
    } else {
        ADMIN_PRODUCTS.push(productData);
        showToast('Produk "' + productData.name + '" berhasil ditambahkan ✅');
    }
    closeProductModal();
    renderProduk();
    renderDashboard();
    }

    function deleteProduct(id) {
    var p = ADMIN_PRODUCTS.find(function (x) { return x.id === id; });
    if (!p) return;
    if (!confirm('Hapus produk "' + p.name + '"?')) return;

    if (USE_BACKEND) {
        fetch('api/admin/products.php?id=' + id, { method: 'DELETE' })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) applyProductDelete(id, p.name);
            else showToast('Gagal menghapus produk.');
        })
        .catch(function () { showToast('Terjadi kesalahan saat menghapus.'); });
    } else {
        applyProductDelete(id, p.name);
    }
    }

    function applyProductDelete(id, name) {
    ADMIN_PRODUCTS = ADMIN_PRODUCTS.filter(function (p) { return p.id !== id; });
    showToast('Produk "' + name + '" dihapus.');
    renderProduk();
    renderDashboard();
    }

    // ── Upload Gambar Produk ──
    function handleImageUpload(event) {
    var file = event.target.files[0];
    if (!file) return;

    // Validasi ukuran max 10MB
    if (file.size > 10 * 1024 * 1024) {
        showToast('Ukuran gambar maksimal 10MB!');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        var base64 = e.target.result;

        // Simpan base64 ke hidden input
        document.getElementById('pf_img').value = base64;

        // Tampilkan preview
        var preview = document.getElementById('uploadPreview');
        preview.innerHTML =
        '<img src="' + base64 + '" alt="Preview" />' +
        '<p class="upload-text" style="margin-top:4px;">' + file.name + '</p>' +
        '<button class="upload-change-btn" onclick="event.stopPropagation(); document.getElementById(\'pf_img_file\').click()">Ganti Gambar</button>';
    };
    reader.readAsDataURL(file);
    }

    // ── Preview Ukuran & Harga otomatis ──
    function updateSizePricePreview() {
    var selected = [];
    if (document.getElementById('pf_size10').checked) selected.push('10ml — ' + formatRp(SIZE_PRICES['10ml']));
    if (document.getElementById('pf_size55').checked) selected.push('55ml — ' + formatRp(SIZE_PRICES['55ml']));

    var preview = document.getElementById('sizePricePreview');
    if (selected.length > 0) {
        preview.textContent = '✅ Harga otomatis: ' + selected.join(' · ');
        preview.style.color = 'var(--green, #2d7a3a)';
    } else {
        preview.textContent = '⚠️ Pilih minimal 1 ukuran.';
        preview.style.color = '#c0392b';
    }
    }

    // ══════════════════════════════════════════════
    // RENDER + DETAIL: PESANAN / TRANSAKSI
    // ══════════════════════════════════════════════

    function connectMidtrans() {
    showToast(USE_BACKEND ? 'Midtrans terhubung melalui backend.' : 'Koneksi Midtrans menunggu endpoint backend.');
    }

    function fetchMidtransOrders() {
    var button = document.querySelector('[onclick="fetchMidtransOrders()"]');
    if (!USE_BACKEND) {
        showToast('Mode lokal aktif. Backend lu sediain endpoint pesanan dr Midtrans.');
        return;
    }
    if (button) { button.disabled = true; button.textContent = 'Menarik...'; }
    fetch('api/admin/midtrans/orders.php', { credentials: 'include' })
        .then(function (res) { if (!res.ok) throw new Error('Request failed'); return res.json(); })
        .then(function (data) {
        if (!data.success || !Array.isArray(data.orders)) throw new Error('Invalid response');
        ADMIN_ORDERS = data.orders;
        renderPesanan();
        showToast('Pesanan dari Midtrans berhasil dimuat.');
        })
        .catch(function () { showToast('Pesanan Midtrans gagal dimuat.'); })
        .finally(function () {
        if (button) { button.disabled = false; button.textContent = 'Tarik dari Midtrans'; }
        });
    }

    function renderPesanan() {
    var filter = document.getElementById('orderFilter') ? document.getElementById('orderFilter').value : 'all';
    var filtered = filter === 'all' ? ADMIN_ORDERS : ADMIN_ORDERS.filter(function (o) { return o.status === filter; });

    document.getElementById('pesananCount').textContent = filtered.length;
    document.getElementById('ordPaid').textContent    = ADMIN_ORDERS.filter(function (o) { return o.status === 'paid'; }).length;
    document.getElementById('ordPending').textContent = ADMIN_ORDERS.filter(function (o) { return o.status === 'pending'; }).length;
    document.getElementById('ordFailed').textContent  = ADMIN_ORDERS.filter(function (o) { return o.status === 'failed'; }).length;

    var statusLabel = { paid: 'Lunas', pending: 'Menunggu', failed: 'Gagal' };

    var tbody = document.getElementById('pesananTable');
    tbody.innerHTML = filtered.map(function (o) {
        var itemsText = o.items.map(function (i) { return escapeHtml(i.name) + ' x' + i.qty; }).join(', ');
        var addrText = o.address
        ? '<span class="addr-cell" title="' + escapeHtml(o.address) + '">' + escapeHtml(o.address) + '</span>'
        : '<span class="addr-cell empty">—</span>';
        return '<tr>' +
        '<td>' + escapeHtml(o.id) + '</td>' +
        '<td>' + escapeHtml(o.customer) + '</td>' +
        '<td>' + itemsText + '</td>' +
        '<td>' + addrText + '</td>' +
        '<td>' + formatRp(o.total) + '</td>' +
        '<td>' + escapeHtml(o.payment) + '</td>' +
        '<td><span class="pill ' + o.status + '">' + statusLabel[o.status] + '</span></td>' +
        '<td><button class="icon-btn" title="Lihat detail" onclick="viewOrder(\'' + o.id + '\')">👁️</button></td>' +
        '</tr>';
    }).join('');
    }

    function viewOrder(orderId) {
    var o = ADMIN_ORDERS.find(function (x) { return x.id === orderId; });
    if (!o) return;

    var statusLabel = { paid: 'Lunas', pending: 'Menunggu', failed: 'Gagal' };
    var itemsHtml = o.items.map(function (i) {
        return '<div class="order-detail-row"><span>' + escapeHtml(i.name) + '</span><span>x' + i.qty + '</span></div>';
    }).join('');

    var addressHtml = o.address
    ? '<div class="order-address-box"><span class="order-address-label">📍 Alamat Pengiriman</span><p class="order-address-text">' + escapeHtml(o.address) + '</p></div>'
    : '<div class="order-address-box"><span class="order-address-label">📍 Alamat Pengiriman</span><p class="order-address-text" style="color:#aaa;">Alamat belum dicantumkan.</p></div>';

    document.getElementById('orderDetailContent').innerHTML =
        '<div class="order-detail-row"><span>ID Order</span><span>' + escapeHtml(o.id) + '</span></div>' +
        '<div class="order-detail-row"><span>Pelanggan</span><span>' + escapeHtml(o.customer) + '</span></div>' +
        itemsHtml +
        '<div class="order-detail-row"><span>Pembayaran</span><span>' + escapeHtml(o.payment) + '</span></div>' +
        '<div class="order-detail-row"><span>Total</span><span>' + formatRp(o.total) + '</span></div>' +
        addressHtml +
        '<div class="order-detail-row"><span>Status saat ini</span><span><span class="pill ' + o.status + '">' + statusLabel[o.status] + '</span></span></div>' +
        '<select class="order-status-select" id="orderStatusSelect">' +
        '<option value="pending" ' + (o.status === 'pending' ? 'selected' : '') + '>Menunggu</option>' +
        '<option value="paid" '    + (o.status === 'paid'    ? 'selected' : '') + '>Lunas</option>' +
        '<option value="failed" '  + (o.status === 'failed'  ? 'selected' : '') + '>Gagal</option>' +
        '</select>' +
        '<button class="admin-save-btn" style="margin-top:12px;" onclick="updateOrderStatus(\'' + o.id + '\')">Update Status</button>';

    document.getElementById('orderModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    }

    function updateOrderStatus(orderId) {
    var newStatus = document.getElementById('orderStatusSelect').value;
    var o = ADMIN_ORDERS.find(function (x) { return x.id === orderId; });
    if (!o) return;

    if (USE_BACKEND) {
        fetch('api/admin/orders.php?id=' + orderId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
            o.status = newStatus;
            closeOrderModal();
            renderPesanan();
            renderDashboard();
            showToast('Status order ' + orderId + ' diperbarui ✅');
            } else {
            showToast('Gagal memperbarui status.');
            }
        })
        .catch(function () { showToast('Terjadi kesalahan.'); });
    } else {
        o.status = newStatus;
        closeOrderModal();
        renderPesanan();
        renderDashboard();
        showToast('Status order ' + orderId + ' diperbarui ✅');
    }
    }

    function closeOrderModal() {
    document.getElementById('orderModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
    }

    function handleOrderModalClick(e) {
    if (e.target === document.getElementById('orderModalOverlay')) closeOrderModal();
    }

    // ══════════════════════════════════════════════
    // RENDER: MEMBER + VOUCHER
    // ══════════════════════════════════════════════

    function genVoucherCode() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var code = 'SHEM-';
    for (var i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
    }

    function renderPelanggan() {
    var searchInput = document.getElementById('pelangganSearch');
    var keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var filtered = keyword
        ? ADMIN_CUSTOMERS.filter(function (c) {
            return c.name.toLowerCase().indexOf(keyword) !== -1 ||
                c.email.toLowerCase().indexOf(keyword) !== -1 ||
                c.phone.toLowerCase().indexOf(keyword) !== -1;
        })
        : ADMIN_CUSTOMERS;

    document.getElementById('pelangganCount').textContent = filtered.length;
    var tbody = document.getElementById('pelangganTable');

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--mid);padding:24px 0;">Member tidak ditemukan.</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(function (c) {
        var voucherCell = c.voucher
        ? '<span class="pill new">' + escapeHtml(c.voucher.code) + ' · ' + Number(c.voucher.discount) + '%</span>' +
            '<button class="icon-btn delete" style="margin-left:6px;" title="Hapus voucher" onclick="removeVoucher(' + c.id + ')">🗑️</button>'
        : '<button class="icon-btn" style="width:auto;padding:0 12px;font-size:12px;" title="Beri voucher" onclick="openVoucherPage(' + c.id + ')">🎁 Beri Voucher</button>';

        return '<tr>' +
        '<td>' + escapeHtml(c.name) + '</td>' +
        '<td>' + escapeHtml(c.email) + '</td>' +
        '<td>' + escapeHtml(c.phone) + '</td>' +
        '<td>' + escapeHtml(c.joined) + '</td>' +
        '<td>' + voucherCell + '</td>' +
        '<td><button class="icon-btn" title="Lihat riwayat order" onclick="viewCustomerHistory(' + c.id + ')">📜</button></td>' +
        '</tr>';

    }).join('');
    }

    function openVoucherPage(customerId) {
    window.location.href = 'voucher.html?customer_id=' + encodeURIComponent(customerId);
    }

    function giveVoucher(customerId) {

    var c = ADMIN_CUSTOMERS.find(function (x) { return x.id === customerId; });
    if (!c) return;

    var input = prompt('Besar diskon voucher (%) untuk member "' + c.name + '":', c.voucher ? c.voucher.discount : '10');
    if (input === null) return; // dibatalkan

    var disc = parseInt(input, 10);
    if (!disc || disc <= 0 || disc > 100) {
        showToast('Diskon harus berupa angka 1–100%.');
        return;
    }

    function apply() {
        c.voucher = { code: c.voucher ? c.voucher.code : genVoucherCode(), discount: disc };
        saveCustomers();
        renderPelanggan();
        showToast('Voucher ' + c.voucher.code + ' (' + disc + '%) diberikan ke ' + c.name + ' 🎁');
    }

    if (USE_BACKEND) {
        fetch('api/admin/vouchers.php?customer_id=' + customerId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discount: disc })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
            c.voucher = data.voucher || { code: genVoucherCode(), discount: disc };
            saveCustomers();
            renderPelanggan();
            showToast('Voucher ' + c.voucher.code + ' (' + disc + '%) diberikan ke ' + c.name + ' 🎁');
            } else {
            showToast('Gagal membuat voucher.');
            }
        })
        .catch(function () { showToast('Terjadi kesalahan.'); });
    } else {
        apply();
    }
    }

    function removeVoucher(customerId) {
    var c = ADMIN_CUSTOMERS.find(function (x) { return x.id === customerId; });
    if (!c || !c.voucher) return;
    if (!confirm('Hapus voucher ' + c.voucher.code + ' milik ' + c.name + '?')) return;

    function apply() {
        c.voucher = null;
        saveCustomers();
        renderPelanggan();
        showToast('Voucher dihapus.');
    }

    if (USE_BACKEND) {
        fetch('api/admin/vouchers.php?customer_id=' + customerId, { method: 'DELETE' })
        .then(function (res) { return res.json(); })
        .then(function (data) { if (data.success) apply(); else showToast('Gagal menghapus voucher.'); })
        .catch(function () { showToast('Terjadi kesalahan.'); });
    } else {
        apply();
    }
    }

    function viewCustomerHistory(customerId) {
    var c = ADMIN_CUSTOMERS.find(function (x) { return x.id === customerId; });
    if (!c) return;

    var orders = ADMIN_ORDERS.filter(function (o) { return o.customer === c.name; });
    var statusLabel = { paid: 'Lunas', pending: 'Menunggu', failed: 'Gagal' };

    var historyHtml = orders.length
        ? orders.map(function (o) {
        var itemsText = o.items.map(function (i) { return escapeHtml(i.name) + ' x' + i.qty; }).join(', ');
        return '<div class="order-detail-row"><span>' + escapeHtml(o.id) + ' — ' + itemsText + '</span><span>' + formatRp(o.total) + ' · <span class="pill ' + o.status + '">' + statusLabel[o.status] + '</span></span></div>';
        }).join('')
        : '<p style="font-size:13px;color:var(--mid);padding:10px 0;">Belum ada riwayat order.</p>';

    var voucherHtml = c.voucher
        ? '<div class="order-detail-row"><span>Voucher</span><span><span class="pill new">' + escapeHtml(c.voucher.code) + ' · ' + Number(c.voucher.discount) + '%</span></span></div>'
        : '<div class="order-detail-row"><span>Voucher</span><span>Belum ada</span></div>';

    document.getElementById('orderDetailContent').innerHTML =
        '<div class="order-detail-row"><span>Nama</span><span>' + escapeHtml(c.name) + '</span></div>' +
        '<div class="order-detail-row"><span>Email</span><span>' + escapeHtml(c.email) + '</span></div>' +
        '<div class="order-detail-row"><span>Bergabung</span><span>' + escapeHtml(c.joined) + '</span></div>' +
        voucherHtml +
        '<p style="font-size:12px;font-weight:500;margin-top:14px;margin-bottom:6px;color:var(--mid);text-transform:uppercase;letter-spacing:0.5px;">Riwayat Order</p>' +
        historyHtml;

    document.getElementById('orderModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    }

    // ══════════════════════════════════════════════
    // RENDER: REVIEW
    // ══════════════════════════════════════════════

    function renderReview() {
    document.getElementById('reviewCount').textContent = ADMIN_REVIEWS.length;
    var tbody = document.getElementById('reviewTable');
    tbody.innerHTML = ADMIN_REVIEWS.map(function (r) {
        var stars = '★★★★★☆☆☆☆☆'.slice(5 - r.rating, 10 - r.rating);
        var hiddenPill = r.hidden ? '<span class="pill none">Disembunyikan</span>' : '<span class="pill active">Tampil</span>';
        var replyHtml = r.reply
        ? '<div style="margin-top:6px;font-size:12px;color:var(--gold);">↳ Balasan admin: ' + escapeHtml(r.reply) + '</div>'
        : '';

        return '<tr>' +
        '<td>' + escapeHtml(r.customer) + '</td>' +
        '<td>' + escapeHtml(r.product) + '</td>' +
        '<td><span class="stars">' + stars + '</span></td>' +
        '<td>' + escapeHtml(r.comment) + replyHtml + '</td>' +
        '<td>' + hiddenPill + '</td>' +
        '<td><div class="row-actions">' +
            '<button class="icon-btn" title="Balas review" onclick="openReplyReview(' + r.id + ')">💬</button>' +
            '<button class="icon-btn" title="' + (r.hidden ? 'Tampilkan' : 'Sembunyikan') + '" onclick="toggleHideReview(' + r.id + ')">' + (r.hidden ? '👁️' : '🙈') + '</button>' +
            '<button class="icon-btn delete" title="Hapus" onclick="deleteReview(' + r.id + ')">🗑️</button>' +
        '</div></td>' +
        '</tr>';
    }).join('');
    }

    function openReplyReview(reviewId) {
    var r = ADMIN_REVIEWS.find(function (x) { return x.id === reviewId; });
    if (!r) return;

    var reply = prompt('Balas review dari "' + r.customer + '":\n\n"' + r.comment + '"', r.reply || '');
    if (reply === null) return; // dibatalkan

    function apply() {
        r.reply = reply.trim() || null;
        renderReview();
        showToast('Balasan untuk review "' + r.customer + '" disimpan ✅');
    }

    if (USE_BACKEND) {
        fetch('api/admin/reviews.php?id=' + reviewId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: reply.trim() })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) { if (data.success) apply(); else showToast('Gagal menyimpan balasan.'); })
        .catch(function () { showToast('Terjadi kesalahan.'); });
    } else {
        apply();
    }
    }

    function toggleHideReview(reviewId) {
    var r = ADMIN_REVIEWS.find(function (x) { return x.id === reviewId; });
    if (!r) return;

    function apply() {
        r.hidden = !r.hidden;
        renderReview();
        showToast(r.hidden ? 'Review disembunyikan dari publik.' : 'Review ditampilkan kembali.');
    }

    if (USE_BACKEND) {
        fetch('api/admin/reviews.php?id=' + reviewId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hidden: !r.hidden })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) { if (data.success) apply(); else showToast('Gagal memperbarui review.'); })
        .catch(function () { showToast('Terjadi kesalahan.'); });
    } else {
        apply();
    }
    }

    function deleteReview(reviewId) {
    var r = ADMIN_REVIEWS.find(function (x) { return x.id === reviewId; });
    if (!r) return;
    if (!confirm('Hapus review dari "' + r.customer + '"?')) return;

    function apply() {
        ADMIN_REVIEWS = ADMIN_REVIEWS.filter(function (x) { return x.id !== reviewId; });
        renderReview();
        showToast('Review dihapus.');
    }

    if (USE_BACKEND) {
        fetch('api/admin/reviews.php?id=' + reviewId, { method: 'DELETE' })
        .then(function (res) { return res.json(); })
        .then(function (data) { if (data.success) apply(); else showToast('Gagal menghapus review.'); })
        .catch(function () { showToast('Terjadi kesalahan.'); });
    } else {
        apply();
    }
    }

    // ══════════════════════════════════════════════
    // HELPERS
    // ══════════════════════════════════════════════

    function formatRp(amount) { return 'Rp ' + amount.toLocaleString('id-ID'); }
    function capitalize(str)  { return str.charAt(0).toUpperCase() + str.slice(1); }

    // Escape data sebelum dimasukkan ke innerHTML — wajib dipakai untuk semua
    // teks yang bukan berasal dari kode kita sendiri (nama produk, nama/email
    // member, komentar review, alamat, dll), supaya nggak bisa disusupi HTML/script.
    function escapeHtml(str) {
    return String(str === null || str === undefined ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    var toastTimer;
    function showToast(msg) {
    var t = document.getElementById('adminToast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
    }

    // ── Logout ──
    function handleAdminLogout() {
    if (!confirm('Keluar dari admin panel?')) return;
    sessionStorage.removeItem('shem_admin');
    document.getElementById('adminContainer').style.display = 'none';
    document.getElementById('loginGate').style.display = 'flex';
    document.getElementById('adminEmail').value = '';
    document.getElementById('adminPassword').value = '';
    }

    var logoutBtnEl = document.getElementById('logoutBtn');
    if (logoutBtnEl) {
    logoutBtnEl.addEventListener('click', handleAdminLogout);
    }

      // ══════════════════════════════════════════════
    // SIDEBAR NAVIGATION
    // ══════════════════════════════════════════════
    function goToPage(pageName) {
    document.querySelectorAll('.page').forEach(function (page) {
        page.classList.toggle('active', page.id === 'page-' + pageName);
    });
    document.querySelectorAll('#sidebarMenu li').forEach(function (item) {
        item.classList.toggle('active', item.getAttribute('data-page') === pageName);
    });
    if (pageName === 'produk') renderProduk();
    if (pageName === 'pesanan') renderPesanan();
    if (pageName === 'pelanggan') renderPelanggan();
    if (pageName === 'review') renderReview();
    if (pageName === 'pengaturan') renderSettings();
    }

    // ══════════════════════════════════════════════
    // MOBILE SIDEBAR (hamburger drawer)
    // ══════════════════════════════════════════════
    function openMobileSidebar() {
    var sidebar = document.getElementById('sidebarEl');
    var overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('open');
    }

    function closeMobileSidebar() {
    var sidebar = document.getElementById('sidebarEl');
    var overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    }

    document.addEventListener('DOMContentLoaded', function () {
    var menuBtn = document.getElementById('mobileMenuBtn');
    var overlay = document.getElementById('sidebarOverlay');
    if (menuBtn) menuBtn.addEventListener('click', openMobileSidebar);
    if (overlay) overlay.addEventListener('click', closeMobileSidebar);
    });

    document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebarMenu');
    if (!sidebar) return;
    sidebar.addEventListener('click', function (event) {
        var item = event.target.closest('li[data-page]');
        if (item) {
        goToPage(item.getAttribute('data-page'));
        closeMobileSidebar(); // biar drawer otomatis nutup abis pilih menu di HP
        }
    });
    });

    function loadAllData() {
    renderDashboard();
    renderProduk();
    renderPesanan();
    renderPelanggan();
    renderReview();
    renderSettings();
    }

    // Saat admin balik ke admin.html dari voucher.html (tombol Kembali atau tombol
    // back browser), tarik ulang data member dari localStorage biar voucher yang
    // baru dibuat langsung kelihatan tanpa perlu login ulang.
    window.addEventListener('pageshow', function () {
    var container = document.getElementById('adminContainer');
    if (container && container.style.display !== 'none') {
        ADMIN_CUSTOMERS = loadCustomers();
        renderPelanggan();
    }
    });
