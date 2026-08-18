    // ===== SHEM Login JS =====

    const USE_BACKEND = false; // ganti true kalau backend sudah siap

    // ── Tab switching ──
    function switchTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(function(t, i) {
        t.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'register'));
    });
    document.getElementById('formLogin').classList.toggle('active', tab === 'login');
    document.getElementById('formRegister').classList.toggle('active', tab === 'register');
    document.getElementById('formForgot').classList.remove('active');
    document.getElementById('formSuccess').classList.remove('active');
    clearErrors();
    }

    function showForgot() {
    document.querySelectorAll('.auth-form').forEach(function(f) { f.classList.remove('active'); });
    document.getElementById('formForgot').classList.add('active');
    }

    function showLogin() {
    switchTab('login');
    }

    // ── Login method ──
    function switchMethod(method, btn) {
    document.querySelectorAll('.method-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('loginEmailGroup').style.display = method === 'email' ? 'block' : 'none';
    document.getElementById('loginPhoneGroup').style.display = method === 'phone' ? 'block' : 'none';
    }

    // ── Toggle password visibility ──
    function togglePassword(id, btn) {
    var input = document.getElementById(id);
    var isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    btn.style.color = isText ? '#aaa' : '#1a1612';
    }

    // ── Validation helpers ──
    function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(function(e) { e.remove(); });
    document.querySelectorAll('.form-input.error').forEach(function(e) { e.classList.remove('error'); });
    }

    function showError(inputId, msg) {
    var el = document.getElementById(inputId);
    el.classList.add('error');
    var err = document.createElement('p');
    err.className = 'error-msg';
    err.textContent = msg;
    el.parentNode.appendChild(err);
    }

    // ── Login ──
    function handleLogin() {
    clearErrors();
    var valid = true;

    var isEmail = document.querySelector('.method-btn.active').textContent.includes('Email');
    if (isEmail) {
        var email = document.getElementById('loginEmail').value.trim();
        if (!email) { showError('loginEmail', 'Email wajib diisi.'); valid = false; }
        else if (!/\S+@\S+\.\S+/.test(email)) { showError('loginEmail', 'Format email tidak valid.'); valid = false; }
    } else {
        var phone = document.getElementById('loginPhone').value.trim();
        if (!phone) { showError('loginPhone', 'No. HP wajib diisi.'); valid = false; }
    }

    var pw = document.getElementById('loginPassword').value;
    if (!pw) { showError('loginPassword', 'Password wajib diisi.'); valid = false; }

    if (!valid) return;

    var btn = document.querySelector('#formLogin .btn-submit');
    btn.textContent = 'Memproses...';
    btn.classList.add('loading');

    if (USE_BACKEND) {
        fetch('api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email:    document.getElementById('loginEmail').value.trim(),
            password: document.getElementById('loginPassword').value
        })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
        btn.textContent = 'Masuk';
        btn.classList.remove('loading');
        if (data.success) {
            localStorage.setItem('shem_user', JSON.stringify(data.user));
            window.location.href = '../profile/profile.html';
        } else {
            showError('loginPassword', data.message || 'Login gagal.');
        }
        })
        .catch(function() {
        btn.textContent = 'Masuk';
        btn.classList.remove('loading');
        showError('loginPassword', 'Terjadi kesalahan. Coba lagi.');
        });
    } else {
        // Simulasi login — hapus kalau backend sudah siap
        setTimeout(function() {
        btn.textContent = 'Masuk';
        btn.classList.remove('loading');
        window.location.href = 'profile/profile.html';
        }, 1200);
    }
    }

    // ── Register ──
    function handleRegister() {
    clearErrors();
    var valid = true;

    var name    = document.getElementById('regName').value.trim();
    var dob     = document.getElementById('regDob').value;
    var email   = document.getElementById('regEmail').value.trim();
    var phone   = document.getElementById('regPhone').value.trim();
    var address = document.getElementById('regAddress').value.trim();
    var pw      = document.getElementById('regPassword').value;
    var confirm = document.getElementById('regConfirm').value;

    if (!name)    { showError('regName',     'Nama wajib diisi.'); valid = false; }
    if (!dob)     { showError('regDob',      'Tanggal lahir wajib diisi.'); valid = false; }
    if (!email)   { showError('regEmail',    'Email wajib diisi.'); valid = false; }
    else if (!/\S+@\S+\.\S+/.test(email)) { showError('regEmail', 'Format email tidak valid.'); valid = false; }
    if (!phone)   { showError('regPhone',    'No. HP wajib diisi.'); valid = false; }
    if (!address) { showError('regAddress',  'Alamat wajib diisi.'); valid = false; }
    if (!pw)      { showError('regPassword', 'Password wajib diisi.'); valid = false; }
    else if (pw.length < 8) { showError('regPassword', 'Password minimal 8 karakter.'); valid = false; }
    if (pw !== confirm) { showError('regConfirm', 'Password tidak sama.'); valid = false; }

    if (!valid) return;

    var btn = document.querySelector('#formRegister .btn-submit');
    btn.textContent = 'Mendaftar...';
    btn.classList.add('loading');

    if (USE_BACKEND) {
        fetch('api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name, email: email, phone: phone,
            address: address, dob: dob, password: pw
        })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
        btn.textContent = 'Daftar Sekarang';
        btn.classList.remove('loading');
        if (data.success) {
            localStorage.setItem('shem_user', JSON.stringify(data.user));
            document.querySelectorAll('.auth-form').forEach(function(f) { f.classList.remove('active'); });
            document.getElementById('formSuccess').classList.add('active');
        } else {
            showError('regEmail', data.message || 'Registrasi gagal.');
        }
        })
        .catch(function() {
        btn.textContent = 'Daftar Sekarang';
        btn.classList.remove('loading');
        showError('regEmail', 'Terjadi kesalahan. Coba lagi.');
        });
    } else {
        // Simulasi register — hapus kalau backend sudah siap
        setTimeout(function() {
        btn.textContent = 'Daftar Sekarang';
        btn.classList.remove('loading');
        localStorage.setItem('shem_user', JSON.stringify({
            name: name, email: email, phone: phone, address: address, dob: dob
        }));
        document.querySelectorAll('.auth-form').forEach(function(f) { f.classList.remove('active'); });
        document.getElementById('formSuccess').classList.add('active');
        }, 1200);
    }
    }

    // ── Forgot Password ──
    function handleForgot() {
    clearErrors();
    var email = document.getElementById('forgotEmail').value.trim();
    if (!email) { showError('forgotEmail', 'Email wajib diisi.'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { showError('forgotEmail', 'Format email tidak valid.'); return; }

    var btn = document.querySelector('#formForgot .btn-submit');
    btn.textContent = 'Mengirim...';
    btn.classList.add('loading');

    if (USE_BACKEND) {
        fetch('api/forgot-password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
        btn.textContent = 'Kirim Link Reset';
        btn.classList.remove('loading');
        showSuccessForgot(email);
        })
        .catch(function() {
        btn.textContent = 'Kirim Link Reset';
        btn.classList.remove('loading');
        showError('forgotEmail', 'Terjadi kesalahan. Coba lagi.');
        });
    } else {
        // Simulasi forgot password — hapus kalau backend sudah siap
        setTimeout(function() {
        btn.textContent = 'Kirim Link Reset';
        btn.classList.remove('loading');
        showSuccessForgot(email);
        }, 1200);
    }
    }

    function showSuccessForgot(email) {
    document.getElementById('successTitle').textContent = 'Email Terkirim!';
    document.getElementById('successMsg').textContent = 'Link reset password sudah dikirim ke ' + email + '. Cek inbox atau folder spam-mu.';
    document.querySelector('#formSuccess .btn-submit').textContent = 'Kembali ke Login';
    document.querySelector('#formSuccess .btn-submit').onclick = showLogin;
    document.querySelectorAll('.auth-form').forEach(function(f) { f.classList.remove('active'); });
    document.getElementById('formSuccess').classList.add('active');
    }

    function goToProfile() {
    window.location.href = '../profile/profile.html';   
    }

    // ── Phone number only ──
    document.getElementById('regPhone').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
    });
    document.getElementById('loginPhone').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
    });