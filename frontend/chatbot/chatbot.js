    // ===== SHEM Chatbot =====

    const CHATBOT_FAQ = [
    // ── Produk ──
    {
        keywords: ['varian', 'produk', 'parfum apa', 'koleksi', 'jenis'],
        answer: '🌸 SHEM Parfum tersedia dalam beberapa varian:\n\n• Peace of Mind — Fresh\n• Velvet Bloom — Floral\n• Tobacco Royale — Woody\n• Green Enchantment — Fresh\n• Scent of Ambition — Oriental\n• Spread Love — Floral\n• Wooded Nectar — Woody\n• Freesia Lagoon — Fresh\n• Energique Breeze — Fresh\n• Spice of the Sea — Woody\n\nKunjungi halaman Collection untuk lihat semua! 😊'
    },
    {
        keywords: ['harga', 'berapa', 'cost', 'price'],
        answer: '💰 Harga SHEM Parfum:\n\n• 10ml → Rp 100.000\n• 55ml → Rp 350.000\n\nSemua varian tersedia dalam kedua ukuran.'
    },
    {
        keywords: ['bahan', 'ingredient', 'kandungan', 'aman', 'halal'],
        answer: '✅ SHEM Parfum menggunakan bahan-bahan berkualitas tinggi yang aman digunakan. Untuk info lebih lengkap tentang kandungan spesifik tiap varian, silakan hubungi kami via WhatsApp ya!'
    },
    {
        keywords: ['tahan', 'longevity', 'lama', 'ketahanan'],
        answer: '⏳ SHEM Parfum adalah Extrait de Parfum dengan konsentrasi tinggi. Ketahanan wangi bisa mencapai 6–12 jam tergantung jenis kulit dan aktivitas.'
    },
    {
        keywords: ['ukuran', 'size', 'ml', '10ml', '55ml'],
        answer: '📦 SHEM Parfum tersedia dalam 2 ukuran:\n\n• 10ml — Rp 100.000 (travel size, cocok untuk dicoba)\n• 55ml — Rp 350.000 (full size)'
    },

    // ── Pengiriman ──
    {
        keywords: ['kirim', 'pengiriman', 'ongkir', 'ekspedisi', 'delivery', 'shipping'],
        answer: '🚚 Kami melayani pengiriman ke seluruh Indonesia!\n\n• Regular (3–5 hari): Rp 15.000\n• Express (1–2 hari): Rp 35.000\n\nOngkir dihitung otomatis saat checkout.'
    },
    {
        keywords: ['estimasi', 'kapan sampai', 'lama kirim', 'berapa hari'],
        answer: '📅 Estimasi pengiriman:\n\n• Regular: 3–5 hari kerja\n• Express: 1–2 hari kerja\n\nPengiriman dilakukan setelah pembayaran dikonfirmasi.'
    },
    {
        keywords: ['area', 'wilayah', 'kota', 'luar kota', 'luar jawa'],
        answer: '📍 SHEM Parfum melayani pengiriman ke seluruh wilayah Indonesia, termasuk luar Jawa, bahkan luar negeri. Ongkir menyesuaikan lokasi tujuan.'
    },
    {
        keywords: ['resi', 'tracking', 'lacak', 'nomor resi'],
        answer: '🔍 Nomor resi pengiriman akan dikirimkan via WhatsApp setelah pesanan diproses. Biasanya dalam 1x24 jam setelah pembayaran dikonfirmasi.'
    },

    // ── Cara Order & Pembayaran ──
    {
        keywords: ['cara order', 'cara beli', 'bagaimana beli', 'pesan', 'order'],
        answer: '🛍️ Cara order di website SHEM:\n\n1. Pilih produk di halaman Collection\n2. Klik produk → pilih ukuran\n3. Klik "+ Keranjang" atau "Beli"\n4. Isi form pengiriman\n5. Pilih metode pembayaran\n6. Klik "Place Order"\n\nBisa juga order langsung via Shopee, Tokopedia, atau TikTok Shop!'
    },
    {
        keywords: ['bayar', 'pembayaran', 'payment', 'transfer', 'qris'],
        answer: '💳 Metode pembayaran yang tersedia:\n\n• QRIS — scan & bayar langsung\n• Transfer Bank\n\nPembayaran diproses via Midtrans yang aman & terenkripsi. 🔒'
    },
    {
        keywords: ['midtrans', 'payment gateway', 'aman', 'keamanan'],
        answer: '🔒 Pembayaran di SHEM menggunakan Midtrans — payment gateway terpercaya di Indonesia. Data transaksimu aman dan terenkripsi.'
    },
    {
        keywords: ['marketplace', 'shopee', 'tokopedia', 'tiktok', 'shop'],
        answer: '🛒 SHEM Parfum juga tersedia di:\n\n• Shopee: SHEM Extrait de Parfum\n• Tokopedia: SHEM EXTRAIT DE PARFUM\n• TikTok Shop: @shem.parfum\n'
    },
    {
        keywords: ['refund', 'retur', 'return', 'kembalikan', 'tukar'],
        answer: '↩️ Untuk pertanyaan retur/refund, silakan hubungi kami via WhatsApp atau email di shem.parfum@gmail.com. Tim kami siap membantu!'
    },
    {
        keywords: ['whatsapp', 'wa', 'kontak', 'hubungi', 'contact'],
        answer: '📱 Hubungi kami:\n\n• WhatsApp: +62 813-2261-796\n• Email: shem.parfum@gmail.com\n• Instagram: @shem.parfum\n\nKami siap membantu kamu! 😊'
    },
    ];

    const FALLBACK = '🤔 Maaf, saya belum bisa menjawab pertanyaan itu.\n\nCoba tanyakan tentang:\n• Produk & harga\n• Pengiriman\n• Cara order & pembayaran\n\nAtau hubungi kami langsung via WhatsApp ya! 😊';

    const GREETINGS = ['halo', 'hai', 'hi', 'hello', 'selamat', 'pagi', 'siang', 'malam', 'sore'];

    // ── Build UI ──
    function buildChatbot() {
    const html = `
        <div class="cb-wrapper" id="cbWrapper">

        <!-- Toggle Button -->
        <button class="cb-toggle" id="cbToggle" aria-label="Open chat">
            <svg class="cb-icon-chat" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <svg class="cb-icon-close" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none;">
            <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
            <span class="cb-badge" id="cbBadge">1</span>
        </button>
        

        <!-- Chat Box -->
        <div class="cb-box" id="cbBox">
            <div class="cb-header">
            <div class="cb-header-info">
                '<div class="cb-avatar"><img src="asset/shem.png" alt="SHEM" style="width:100%;height:100%;object-fit:contain;border-radius:50%;padding:4px;" /></div>'
                <div>
                <div class="cb-name">SHEM Assistant</div>
                <div class="cb-status">● Online</div>
                </div>
            </div>
            <button class="cb-close" id="cbClose">✕</button>
            </div>

            <div class="cb-messages" id="cbMessages"></div>

            <div class="cb-quick" id="cbQuick">
            <button class="cb-quick-btn" onclick="cbQuickAsk('Varian apa saja?')">Varian apa saja?</button>
            <button class="cb-quick-btn" onclick="cbQuickAsk('Berapa harganya?')">Berapa harganya?</button>
            <button class="cb-quick-btn" onclick="cbQuickAsk('Cara order?')">Cara order?</button>
            <button class="cb-quick-btn" onclick="cbQuickAsk('Info pengiriman')">Info pengiriman</button>
            <button class="cb-quick-btn" onclick="cbQuickAsk('Metode pembayaran')">Metode pembayaran</button>
            <button class="cb-quick-btn" onclick="cbQuickAsk('Hubungi kami')">Hubungi kami</button>
            </div>

            <div class="cb-input-row">
            <input class="cb-input" id="cbInput" type="text" placeholder="Ketik pertanyaanmu..." autocomplete="off" />
            <button class="cb-send" id="cbSend">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="m22 2-7 20-4-9-9-4 20-7z"/>
                </svg>
            </button>
            </div>
        </div>

        </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div.firstElementChild);

    // Events
    document.getElementById('cbToggle').addEventListener('click', toggleChat);
    document.getElementById('cbClose').addEventListener('click', closeChat);
    document.getElementById('cbSend').addEventListener('click', sendMessage);
    document.getElementById('cbInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') sendMessage();
    });

    // Welcome message
    setTimeout(function() {
        addBotMessage('Halo! Selamat datang di SHEM Parfum 🌸\n\nAda yang bisa saya bantu? Pilih topik di bawah atau ketik pertanyaanmu!');
    }, 500);
    }

    // ── Toggle ──
    var chatOpen = false;

    function toggleChat() {
    chatOpen ? closeChat() : openChat();
    }

    function openChat() {
    chatOpen = true;
    document.getElementById('cbBox').classList.add('open');
    document.getElementById('cbIcon_chat') ;
    document.querySelector('.cb-icon-chat').style.display = 'none';
    document.querySelector('.cb-icon-close').style.display = 'block';
    document.getElementById('cbBadge').style.display = 'none';
    document.getElementById('cbInput').focus();
    }

    function closeChat() {
    chatOpen = false;
    document.getElementById('cbBox').classList.remove('open');
    document.querySelector('.cb-icon-chat').style.display = 'block';
    document.querySelector('.cb-icon-close').style.display = 'none';
    }

    // ── Messages ──
    function addBotMessage(text) {
    const msgs = document.getElementById('cbMessages');
    const div = document.createElement('div');
    div.className = 'cb-msg cb-msg-bot';
    div.innerHTML = '<div class="cb-bubble">' + text.replace(/\n/g, '<br/>') + '</div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    }

    function addUserMessage(text) {
    const msgs = document.getElementById('cbMessages');
    const div = document.createElement('div');
    div.className = 'cb-msg cb-msg-user';
    div.innerHTML = '<div class="cb-bubble">' + text + '</div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    }

    function addTyping() {
    const msgs = document.getElementById('cbMessages');
    const div = document.createElement('div');
    div.className = 'cb-msg cb-msg-bot cb-typing-wrap';
    div.id = 'cbTyping';
    div.innerHTML = '<div class="cb-bubble cb-typing"><span></span><span></span><span></span></div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    }

    function removeTyping() {
    const t = document.getElementById('cbTyping');
    if (t) t.remove();
    }

    // ── Send ──
    function sendMessage() {
    const input = document.getElementById('cbInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addUserMessage(text);
    processMessage(text);
    }

    function cbQuickAsk(text) {
    addUserMessage(text);
    processMessage(text);
    }

    function processMessage(text) {
    addTyping();
    setTimeout(function() {
        removeTyping();
        const reply = getReply(text.toLowerCase());
        addBotMessage(reply);
    }, 800);
    }

    function getReply(text) {
    // Greeting
    for (var i = 0; i < GREETINGS.length; i++) {
        if (text.includes(GREETINGS[i])) {
        return 'Halo! Selamat datang di SHEM Parfum 😊\nAda yang bisa saya bantu?';
        }
    }

    // Terima kasih
    if (text.includes('terima kasih') || text.includes('makasih') || text.includes('thanks')) {
        return 'Sama-sama! Senang bisa membantu 😊\nJangan ragu untuk bertanya lagi ya!';
    }

    // FAQ matching
    for (var j = 0; j < CHATBOT_FAQ.length; j++) {
        var faq = CHATBOT_FAQ[j];
        for (var k = 0; k < faq.keywords.length; k++) {
        if (text.includes(faq.keywords[k])) {
            return faq.answer;
        }
        }
    }

    return FALLBACK;
    }

    // ── Init ──
    if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildChatbot);
    } else {
    buildChatbot();
    }