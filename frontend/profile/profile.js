    const USE_BACKEND = false; // ← PINDAH KE PALING ATAS (fix dari sebelumnya)

    // ── Voucher data (nanti dari backend) ──
    const MEMBER_VOUCHERS = [
    {
        code: 'WELCOME15',
        disc: '15% OFF',
        desc: 'Voucher selamat datang member baru',
        exp:  '31 Des 2026',
        used: false,
    },
    {
        code: 'SHEM10',
        disc: '10% OFF',
        desc: 'Diskon spesial member SHEM',
        exp:  '31 Des 2026',
        used: false,
    },
    {
        code: 'BDAY20',
        disc: '20% OFF',
        desc: 'Voucher ulang tahun (aktif di bulan lahirmu)',
        exp:  'Sesuai bulan lahir',
        used: false,
    },
    ];

    // ── Load user data ──
    function loadProfile() {
    var user = JSON.parse(localStorage.getItem('shem_user')) || {
        name: 'SHEM Member',
        email: '—',
        phone: '—',
        address: '—',
        dob: '—'
    };

    document.getElementById('profileAvatar').textContent = user.name ? user.name.charAt(0).toUpperCase() : '?';
    document.getElementById('profileName').textContent   = user.name  || '—';
    document.getElementById('profileEmail').textContent  = user.email || '—';

    var info = [
        { label: 'Nama Lengkap',  value: user.name    || '—', key: 'name' },
        { label: 'Tanggal Lahir', value: user.dob      || '—', key: 'dob' },
        { label: 'Email',         value: user.email    || '—', key: 'email' },
        { label: 'No. HP',        value: user.phone    || '—', key: 'phone' },
        { label: 'Alamat',        value: user.address  || '—', key: 'address' },
    ];

    var infoEl = document.getElementById('profileInfo');
    infoEl.innerHTML = info.map(function(item) {
        return '<div class="info-item"><label>' + item.label + '</label><p>' + item.value + '</p></div>';
    }).join('');
    }

    // ── Render vouchers ──
    function renderVouchers(vouchers) {
    var grid = document.getElementById('voucherGrid');
    grid.innerHTML = vouchers.map(function(v) {
        return '<div class="voucher-card ' + (v.used ? 'used' : '') + '">' +
        (v.used ? '<span class="used-stamp">Terpakai</span>' : '') +
        '<div class="voucher-disc">' + v.disc + '</div>' +
        '<div class="voucher-desc">' + v.desc + '</div>' +
        '<div class="voucher-code-row">' +
            '<span class="voucher-code">' + v.code + '</span>' +
            (!v.used ? '<button class="copy-btn" onclick="copyVoucher(\'' + v.code + '\')">📋 Salin</button>' : '') +
        '</div>' +
        '<div class="voucher-exp">Berlaku hingga: ' + v.exp + '</div>' +
        '</div>';
    }).join('');
    }

    // ── Copy voucher ──
    function copyVoucher(code) {
    navigator.clipboard.writeText(code).then(function() {
        showToast('Kode "' + code + '" berhasil disalin! 🎉');
    }).catch(function() {
        showToast('Kode voucher: ' + code);
    });
    }

    // ── Toast ──
    var toastTimer;
    function showToast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() { t.classList.remove('show'); }, 2800);
    }

    // ── Logout ──
    function handleLogout() {
    localStorage.removeItem('shem_user');
    window.location.href = 'login.html';
    }

    // ── Load vouchers ──
    function loadVouchers() {
    if (USE_BACKEND) {
        fetch('api/vouchers.php')
        .then(function(res) { return res.json(); })
        .then(function(data) {
        if (data.success) {
            renderVouchers(data.vouchers);
        } else {
            renderVouchers(MEMBER_VOUCHERS);
        }
        })
        .catch(function() {
        renderVouchers(MEMBER_VOUCHERS);
        });
    } else {
        renderVouchers(MEMBER_VOUCHERS);
    }
    }

    // ══════════════════════════════════════════════
    // EDIT PROFILE MODAL
    // ══════════════════════════════════════════════

    function openEditProfile() {
    var user = JSON.parse(localStorage.getItem('shem_user')) || {};

    document.getElementById('editName').value    = user.name    || '';
    document.getElementById('editDob').value      = user.dob      || '';
    document.getElementById('editEmail').value    = user.email    || '';
    document.getElementById('editPhone').value    = user.phone    || '';
    document.getElementById('editAddress').value  = user.address  || '';

    document.querySelectorAll('.edit-error-msg').forEach(function(e) { e.remove(); });
    document.querySelectorAll('.edit-field.error').forEach(function(e) { e.classList.remove('error'); });

    document.getElementById('editProfileOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    }

    function closeEditProfile() {
    document.getElementById('editProfileOverlay').classList.remove('open');
    document.body.style.overflow = '';
    }

    function handleEditClick(e) {
    if (e.target === document.getElementById('editProfileOverlay')) closeEditProfile();
    }

    function showEditError(inputId, msg) {
    var el = document.getElementById(inputId);
    el.classList.add('error');
    var err = document.createElement('p');
    err.className = 'edit-error-msg';
    err.textContent = msg;
    el.parentNode.appendChild(err);
    }

    function saveEditProfile() {
    document.querySelectorAll('.edit-error-msg').forEach(function(e) { e.remove(); });
    document.querySelectorAll('.edit-field.error').forEach(function(e) { e.classList.remove('error'); });

    var name    = document.getElementById('editName').value.trim();
    var dob     = document.getElementById('editDob').value;
    var email   = document.getElementById('editEmail').value.trim();
    var phone   = document.getElementById('editPhone').value.trim();
    var address = document.getElementById('editAddress').value.trim();

    var valid = true;
    if (!name)  { showEditError('editName', 'Nama wajib diisi.'); valid = false; }
    if (!email) { showEditError('editEmail', 'Email wajib diisi.'); valid = false; }
    else if (!/\S+@\S+\.\S+/.test(email)) { showEditError('editEmail', 'Format email tidak valid.'); valid = false; }
    if (!phone) { showEditError('editPhone', 'No. HP wajib diisi.'); valid = false; }

    if (!valid) return;

    var saveBtn = document.getElementById('editSaveBtn');
    saveBtn.textContent = 'Menyimpan...';
    saveBtn.disabled = true;

    var updatedUser = { name: name, dob: dob, email: email, phone: phone, address: address };

    if (USE_BACKEND) {
        fetch('api/update-profile.php', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(updatedUser)
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
        saveBtn.textContent = 'Simpan Perubahan';
        saveBtn.disabled = false;
        if (data.success) {
            localStorage.setItem('shem_user', JSON.stringify(data.user || updatedUser));
            loadProfile();
            closeEditProfile();
            showToast('Profil berhasil diperbarui! ✅');
        } else {
            showEditError('editEmail', data.message || 'Gagal menyimpan.');
        }
        })
        .catch(function() {
        saveBtn.textContent = 'Simpan Perubahan';
        saveBtn.disabled = false;
        showEditError('editEmail', 'Terjadi kesalahan. Coba lagi.');
        });
    } else {
        // Simulasi simpan — hapus kalau backend sudah siap
        setTimeout(function() {
        saveBtn.textContent = 'Simpan Perubahan';
        saveBtn.disabled = false;
        localStorage.setItem('shem_user', JSON.stringify(updatedUser));
        loadProfile();
        closeEditProfile();
        showToast('Profil berhasil diperbarui! ✅');
        }, 900);
    }
    }

    // Phone number only
    document.addEventListener('DOMContentLoaded', function() {
    var editPhone = document.getElementById('editPhone');
    if (editPhone) {
        editPhone.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    });

    // ── Init ──
    loadProfile();
    loadVouchers();