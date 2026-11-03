"use strict"
document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       0. KÖMƏKÇİ FUNKSİYALAR
    ============================== */

    function $(selector, root) {
        return (root || document).querySelector(selector);
    }

    function $$(selector, root) {
        return Array.from((root || document).querySelectorAll(selector));
    }

    // Qiymət formatı: 39.333 → "39.33"
    function fmt(value) {
        return (Math.round(value * 100) / 100).toFixed(2);
    }

    // Aşağıda çıxan qısa bildiriş
    let toastTimer = null;

    function showToast(message) {
        let toast = $(".toast-msg");
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "toast-msg";
            toast.setAttribute("role", "status");
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        // reflow ki, animasiya yenidən işləsin
        void toast.offsetWidth;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 2200);
    }


    /* ==============================
       1. QALEREYA (şəkil dəyişmə, oxlar, sürüşdürmə)
    ============================== */

    const mainImage = $("#mainImage");
    const thumbsBox = $("#galleryThumbs");
    const thumbs = $$(".thumb", thumbsBox);
    const galleryPrev = $(".gallery-prev");
    const galleryNext = $(".gallery-next");

    let currentImage = 0;

    // Şəkillər əvvəlcədən yüklənsin ki, keçid gecikməsin
    thumbs.forEach(function (thumb) {
        const pre = new Image();
        pre.src = thumb.dataset.src;
    });

    function centerThumb(thumb) {
        const box = thumbsBox.getBoundingClientRect();
        const rect = thumb.getBoundingClientRect();
        const target = thumbsBox.scrollLeft + (rect.left - box.left) - (box.width - rect.width) / 2;
        thumbsBox.scrollTo({ left: target, behavior: "smooth" });
    }

    function showImage(index) {
        if (!mainImage || thumbs.length === 0) return;

        // sona çatanda əvvələ qayıt, əvvəldə sona get
        currentImage = (index + thumbs.length) % thumbs.length;
        const thumb = thumbs[currentImage];

        thumbs.forEach(function (t, i) {
            t.classList.toggle("active", i === currentImage);
        });
        centerThumb(thumb);

        mainImage.classList.add("fade");
        setTimeout(function () {
            mainImage.src = thumb.dataset.src;
            mainImage.alt = thumb.querySelector("img").alt;
            mainImage.classList.remove("fade");
        }, 180);
    }

    thumbs.forEach(function (thumb, index) {
        thumb.addEventListener("click", function () {
            if (index !== currentImage) showImage(index);
        });
    });

    if (galleryPrev) galleryPrev.addEventListener("click", function () { showImage(currentImage - 1); });
    if (galleryNext) galleryNext.addEventListener("click", function () { showImage(currentImage + 1); });

    // Klaviatura: ← →
    document.addEventListener("keydown", function (e) {
        const tag = (e.target.tagName || "").toLowerCase();
        if (tag === "input" || tag === "textarea") return;
        if (e.key === "ArrowLeft") showImage(currentImage - 1);
        if (e.key === "ArrowRight") showImage(currentImage + 1);
    });

    // Böyük şəkli siçan / barmaqla çəkib dəyişmək
    const mainBox = $(".gallery-main");

    if (mainBox) {
        let startX = 0;
        let down = false;

        mainBox.addEventListener("dragstart", function (e) { e.preventDefault(); });

        mainBox.addEventListener("pointerdown", function (e) {
            down = true;
            startX = e.clientX;
        });

        window.addEventListener("pointerup", function (e) {
            if (!down) return;
            down = false;
            const dx = e.clientX - startX;
            if (Math.abs(dx) > 50) showImage(currentImage + (dx < 0 ? 1 : -1));
        });

        window.addEventListener("pointercancel", function () { down = false; });
    }

    // Kiçik şəkillər zolağını siçanla dartmaq
    if (thumbsBox) {
        let dragging = false;
        let startX = 0;
        let startScroll = 0;
        let moved = false;

        thumbsBox.addEventListener("dragstart", function (e) { e.preventDefault(); });

        thumbsBox.addEventListener("mousedown", function (e) {
            dragging = true;
            moved = false;
            startX = e.pageX;
            startScroll = thumbsBox.scrollLeft;
            thumbsBox.style.scrollBehavior = "auto";
        });

        window.addEventListener("mousemove", function (e) {
            if (!dragging) return;
            const dx = e.pageX - startX;
            if (Math.abs(dx) > 5) moved = true;
            thumbsBox.scrollLeft = startScroll - dx;
        });

        window.addEventListener("mouseup", function () {
            if (!dragging) return;
            dragging = false;
            thumbsBox.style.scrollBehavior = "";
        });

        thumbsBox.addEventListener("click", function (e) {
            if (moved) {
                e.preventDefault();
                e.stopPropagation();
                moved = false;
            }
        }, true);
    }


    /* ==============================
       2. NİSYƏ KALKULYATORU
    ============================== */

    const priceCurrent = $("#priceCurrent");
    const PRICE = priceCurrent ? parseFloat(priceCurrent.textContent) : 669.99;

    const termButtons = $$(".term-btn");
    const bankTabs = $$(".bank-tab");
    const monthlyPay = $("#monthlyPay");
    const totalPrice = $("#totalPrice");
    const quickMonthly = $("#quickMonthly");
    const downInput = $("#downPayment");
    const downMinus = $("#downMinus");
    const downPlus = $("#downPlus");

    const DOWN_STEP = 50;
    let months = 18;

    // 12 aya qədər faizsizdir. Sonrakı aylar üçün artım nisbəti
    // (18 ay = 707.99 ₼ yekun qiymət, saytdakı kimi)
    function markupFor(m) {
        if (m <= 12) return 0;
        return (m - 12) * 0.0094517;
    }

    function readDown() {
        let value = parseFloat(downInput.value);
        if (isNaN(value) || value < 0) value = 0;
        const max = Math.floor(PRICE) - 1;
        if (value > max) value = max;
        return value;
    }

    function moneyHtml(value) {
        return fmt(value) + ' <i class="azn">₼</i>';
    }

    function calculate() {
        const down = readDown();
        const financed = PRICE - down;
        const withMarkup = financed * (1 + markupFor(months));
        const monthly = withMarkup / months;
        const total = down + withMarkup;

        monthlyPay.innerHTML = moneyHtml(monthly);
        totalPrice.innerHTML = moneyHtml(total);
        if (quickMonthly) quickMonthly.textContent = fmt(monthly) + " ₼ / " + months + " ay";

        downMinus.disabled = down <= 0;
        downPlus.disabled = down + DOWN_STEP > Math.floor(PRICE) - 1;
    }

    termButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            months = parseInt(btn.dataset.months, 10);
            termButtons.forEach(function (b) { b.classList.toggle("active", b === btn); });
            calculate();
        });
    });

    bankTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            bankTabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
        });
    });

    downMinus.addEventListener("click", function () {
        downInput.value = Math.max(0, readDown() - DOWN_STEP);
        calculate();
    });

    downPlus.addEventListener("click", function () {
        downInput.value = Math.min(Math.floor(PRICE) - 1, readDown() + DOWN_STEP);
        calculate();
    });

    downInput.addEventListener("input", calculate);
    downInput.addEventListener("change", function () {
        downInput.value = readDown();
        calculate();
    });

    // "Hissə-hissə ödə" kartı kalkulyatora aparır
    const installmentJump = $("#installmentJump");
    const installmentBox = $("#installment");

    if (installmentJump && installmentBox) {
        installmentJump.addEventListener("click", function () {
            installmentBox.scrollIntoView({ behavior: "smooth", block: "center" });
            installmentBox.classList.remove("pulse");
            void installmentBox.offsetWidth;
            installmentBox.classList.add("pulse");
        });
    }

    calculate();


    /* ==============================
       3. AÇILAN BLOKLAR, XÜSUSİYYƏTLƏR, RƏY FORMU
    ============================== */

    // Rəylər blokunu aç / bağla
    $$(".acc-card").forEach(function (card) {
        const head = $(".acc-head", card);
        if (!head) return;

        head.addEventListener("click", function () {
            const open = card.classList.toggle("open");
            head.setAttribute("aria-expanded", open ? "true" : "false");
        });
    });

    // "0 rəy" linki Rəylər blokunu açır
    const reviewsLink = $(".product-reviews-link");
    const reviewsCard = $("#reviewsCard");

    if (reviewsLink && reviewsCard) {
        reviewsLink.addEventListener("click", function (e) {
            e.preventDefault();
            reviewsCard.classList.add("open");
            $(".acc-head", reviewsCard).setAttribute("aria-expanded", "true");
            reviewsCard.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }

    // Xüsusiyyətlər: "Hamısını göstər"
    const specsTable = $("#specsTable");
    const specsToggle = $("#specsToggle");

    if (specsTable && specsToggle) {
        const label = $("span", specsToggle);

        specsToggle.addEventListener("click", function () {
            const open = specsTable.classList.toggle("show-all");
            specsToggle.setAttribute("aria-expanded", open ? "true" : "false");
            label.textContent = open ? "Daha az göstər" : "Hamısını göstər";
        });
    }

    // Rəy formu: ulduzlar
    const reviewForm = $("#reviewForm");
    const starInput = $("#starInput");

    if (reviewForm && starInput) {
        const starButtons = $$("button", starInput);
        let rating = 0;

        function paintStars(count) {
            starButtons.forEach(function (btn, i) {
                const on = i < count;
                btn.classList.toggle("on", on);
                const icon = $("i", btn);
                icon.classList.toggle("bi-star-fill", on);
                icon.classList.toggle("bi-star", !on);
            });
        }

        starButtons.forEach(function (btn) {
            const value = parseInt(btn.dataset.value, 10);
            btn.addEventListener("mouseenter", function () { paintStars(value); });
            btn.addEventListener("click", function () {
                rating = value;
                paintStars(rating);
            });
        });

        starInput.addEventListener("mouseleave", function () { paintStars(rating); });

        reviewForm.addEventListener("submit", function (e) {
            e.preventDefault();

            if (rating === 0) {
                showToast("Zəhmət olmasa ulduz seçin");
                return;
            }

            showToast("Rəyiniz göndərildi. Təşəkkür edirik!");
            reviewForm.reset();
            rating = 0;
            paintStars(0);
        });
    }


    /* ==============================
       4. SƏBƏT, SEÇİLMİŞLƏR, MÜQAYİSƏ, PAYLAŞ
    ============================== */

    const CART_KEY = "be_cart";
    const cartPanel = $(".cart-dropdown");
    const cartToggle = cartPanel ? $(".icon-btn", cartPanel.parentElement) : null;

    // Səbət paneli silmə düyməsinə basanda bağlanmasın
    if (cartToggle) cartToggle.setAttribute("data-bs-auto-close", "outside");

    function loadCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (err) {
            return [];
        }
    }

    function saveCart(cart) {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
        } catch (err) { /* yadda saxlamaq mümkün olmadı */ }
    }

    function renderCart() {
        if (!cartPanel) return;

        const cart = loadCart();
        const totalQty = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);

        cartPanel.textContent = "";

        const title = document.createElement("h6");
        title.textContent = "Səbətim";
        cartPanel.appendChild(title);

        if (cart.length === 0) {
            const empty = document.createElement("p");
            empty.textContent = "Sizin hal-hazırda səbətdə məhsulunuz yoxdur.";
            cartPanel.appendChild(empty);
        } else {
            const list = document.createElement("div");
            list.className = "cart-list";

            cart.forEach(function (item, index) {
                const row = document.createElement("div");
                row.className = "cart-item";

                const img = document.createElement("img");
                img.src = item.img;
                img.alt = item.name;

                const info = document.createElement("div");
                info.className = "cart-item-info";

                const name = document.createElement("span");
                name.className = "cart-item-name";
                name.textContent = item.name;

                const meta = document.createElement("small");
                meta.textContent = item.price + " × " + item.qty;

                info.appendChild(name);
                info.appendChild(meta);

                const remove = document.createElement("button");
                remove.type = "button";
                remove.className = "cart-item-remove";
                remove.setAttribute("aria-label", "Sil");
                remove.innerHTML = '<i class="bi bi-x-lg"></i>';
                remove.addEventListener("click", function () {
                    const current = loadCart();
                    current.splice(index, 1);
                    saveCart(current);
                    renderCart();
                });

                row.appendChild(img);
                row.appendChild(info);
                row.appendChild(remove);
                list.appendChild(row);
            });

            cartPanel.appendChild(list);

            const clear = document.createElement("button");
            clear.type = "button";
            clear.className = "cart-clear";
            clear.textContent = "Səbəti təmizlə";
            clear.addEventListener("click", function () {
                saveCart([]);
                renderCart();
            });
            cartPanel.appendChild(clear);
        }

        // İkonun üzərindəki say
        if (cartToggle) {
            let badge = $(".cart-count", cartToggle);
            if (totalQty > 0) {
                if (!badge) {
                    badge = document.createElement("span");
                    badge.className = "cart-count";
                    cartToggle.appendChild(badge);
                }
                badge.textContent = totalQty;
            } else if (badge) {
                badge.remove();
            }
        }
    }

    function addToCart(name, price, img) {
        const cart = loadCart();
        const existing = cart.find(function (item) { return item.name === name; });

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name: name, price: price, img: img, qty: 1 });
        }

        saveCart(cart);
        renderCart();
    }

    // Düyməyə qısa müddətli "əlavə olundu" vəziyyəti
    function flashButton(button, label, text) {
        const old = label.textContent;
        label.textContent = text;
        button.classList.add("added");
        button.disabled = true;
        setTimeout(function () {
            label.textContent = old;
            button.classList.remove("added");
            button.disabled = false;
        }, 1300);
    }

    const productName = $(".product-title").textContent.trim();

    function mainProductImage() {
        return mainImage ? mainImage.getAttribute("src") : "";
    }

    // Əsas "Səbətə əlavə et"
    const addToCartBtn = $("#addToCart");

    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", function () {
            addToCart(productName, fmt(PRICE) + " ₼", mainProductImage());
            flashButton(addToCartBtn, $("span", addToCartBtn), "Əlavə olundu ✓");
            showToast("Məhsul səbətə əlavə olundu");
        });
    }

    // Bir kliklə al: səbətə atır və paneli açır
    const oneClickBuy = $("#oneClickBuy");

    if (oneClickBuy) {
        oneClickBuy.addEventListener("click", function () {
            addToCart(productName, fmt(PRICE) + " ₼", mainProductImage());
            showToast("Sürətli sifariş: məhsul səbətə əlavə olundu");
            if (cartToggle && window.bootstrap) {
                bootstrap.Dropdown.getOrCreateInstance(cartToggle).show();
            }
        });
    }

    // Məhsulun yanında al: "+ Birlikdə al"
    $$(".buy-item").forEach(function (item) {
        const button = $(".btn-together", item);

        button.addEventListener("click", function () {
            const img = $(".buy-img img", item);
            addToCart(item.dataset.name, item.dataset.price + " ₼", img ? img.getAttribute("src") : "");
            button.classList.add("added");
            button.textContent = "Əlavə olundu ✓";
            button.disabled = true;
            showToast("Aksesuar səbətə əlavə olundu");
            setTimeout(function () {
                button.classList.remove("added");
                button.textContent = "+ Birlikdə al";
                button.disabled = false;
            }, 1300);
        });
    });

    // Oxşar məhsul kartlarındakı düymələr
    $$(".product-card .btn-cart").forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.closest(".product-card");
            const nameEl = $("h5", card);
            const priceEl = $(".price", card);
            const imgEl = $(".product-img img", card);
            if (!nameEl) return;

            addToCart(
                nameEl.textContent.trim(),
                priceEl ? priceEl.textContent.trim() : "",
                imgEl ? imgEl.getAttribute("src") : ""
            );
            flashButton(button, $("span", button), "Əlavə olundu ✓");
        });
    });

    // Seçilmişlər (ürək)
    function toggleHeart(btn) {
        const on = btn.classList.toggle("active");
        const icon = $("i", btn);
        icon.classList.toggle("bi-heart", !on);
        icon.classList.toggle("bi-heart-fill", on);
        return on;
    }

    const favBtn = $("#favBtn");

    if (favBtn) {
        favBtn.addEventListener("click", function () {
            showToast(toggleHeart(favBtn) ? "Seçilmişlərə əlavə olundu" : "Seçilmişlərdən çıxarıldı");
        });
    }

    $$(".product-card .btn-fav").forEach(function (btn) {
        btn.addEventListener("click", function () { toggleHeart(btn); });
    });

    // Müqayisə
    const compareBtn = $("#compareBtn");

    if (compareBtn) {
        compareBtn.addEventListener("click", function () {
            const on = compareBtn.classList.toggle("active");
            showToast(on ? "Müqayisəyə əlavə olundu" : "Müqayisədən çıxarıldı");
        });
    }

    $$(".product-card .compare-btn").forEach(function (btn) {
        btn.addEventListener("click", function () { btn.classList.toggle("active"); });
    });

    // Paylaş: telefonda paylaşma pəncərəsi, kompüterdə linki köçürür
    const shareBtn = $("#shareBtn");

    if (shareBtn) {
        shareBtn.addEventListener("click", function () {
            const url = window.location.href;

            if (navigator.share) {
                navigator.share({ title: productName, url: url }).catch(function () { /* ləğv edildi */ });
                return;
            }

            function copied() { showToast("Link köçürüldü"); }

            function fallbackCopy() {
                const area = document.createElement("textarea");
                area.value = url;
                document.body.appendChild(area);
                area.select();
                try {
                    document.execCommand("copy");
                    copied();
                } catch (err) {
                    showToast("Linki köçürmək alınmadı");
                }
                area.remove();
            }

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(url).then(copied).catch(fallbackCopy);
            } else {
                fallbackCopy();
            }
        });
    }

    renderCart();


    /* ==============================
       5. KATALOQ MEGA-MENYUSU
    ============================== */

    const catalogBtn = $("#catalogBtn");
    const catalogPanel = $("#catalogPanel");

    if (catalogBtn && catalogPanel) {
        const catButtons = $$(".catalog-cat", catalogPanel);
        const catSubs = $$(".catalog-sub", catalogPanel);
        const catIcon = $("i", catalogBtn);

        function openCatalog() {
            catalogPanel.classList.add("open");
            catalogBtn.classList.add("open");
            catalogBtn.setAttribute("aria-expanded", "true");
            catIcon.className = "bi bi-x-lg";
        }

        function closeCatalog() {
            catalogPanel.classList.remove("open");
            catalogBtn.classList.remove("open");
            catalogBtn.setAttribute("aria-expanded", "false");
            catIcon.className = "bi bi-grid";
        }

        function showCategory(index) {
            catButtons.forEach(function (b) {
                b.classList.toggle("active", b.dataset.cat === index);
            });
            catSubs.forEach(function (sub) {
                sub.classList.toggle("active", sub.dataset.cat === index);
            });
        }

        catalogBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (catalogPanel.classList.contains("open")) {
                closeCatalog();
            } else {
                openCatalog();
            }
        });

        catButtons.forEach(function (btn) {
            btn.addEventListener("mouseenter", function () { showCategory(btn.dataset.cat); });
            btn.addEventListener("click", function () { showCategory(btn.dataset.cat); });
        });

        // Kənara klikləyəndə və ya Esc basanda bağla
        document.addEventListener("click", function (e) {
            if (!catalogPanel.contains(e.target) && !catalogBtn.contains(e.target)) {
                closeCatalog();
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeCatalog();
        });
    }


    /* ==============================
       6. TÜND TEMA (əsas səhifədəki seçimlə eyni)
    ============================== */

    const THEME_KEY = "be_theme";

    const themeToggle = $(".theme-toggle");

    function applyTheme(theme, animate) {
        const root = document.documentElement;

        if (animate) {
            root.classList.add("theme-transition");
            setTimeout(function () { root.classList.remove("theme-transition"); }, 600);
        }

        document.body.classList.toggle("dark", theme === "dark");

        if (themeToggle) {
            const icon = $(".bi", themeToggle);
            icon.classList.toggle("bi-brightness-high", theme !== "dark");
            icon.classList.toggle("bi-moon-stars", theme === "dark");
        }

        const themeColor = $('meta[name="theme-color"]');
        if (themeColor) {
            themeColor.setAttribute("content", theme === "dark" ? "#121212" : "#ffffff");
        }
    }

    let savedTheme = "light";
    try {
        savedTheme = localStorage.getItem(THEME_KEY) || "light";
    } catch (err) { /* ignore */ }

    applyTheme(savedTheme, false);

    // Navbar-dakı gündüz / gecə düyməsi
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const next = document.body.classList.contains("dark") ? "light" : "dark";
            applyTheme(next, true);
            try {
                localStorage.setItem(THEME_KEY, next);
            } catch (err) { /* ignore */ }
        });
    }

    // Başqa səhifədə / tabda tema dəyişəndə burada da dəyişsin
    window.addEventListener("storage", function (e) {
        if (e.key === THEME_KEY && e.newValue) applyTheme(e.newValue, true);
    });


    /* ==============================
       7. "#" LİNKLƏR SƏHİFƏNİ YUXARI ATMASIN
    ============================== */

    document.addEventListener("click", function (e) {
        const link = e.target.closest("a[href]");
        if (!link) return;

        const href = link.getAttribute("href");
        if (href === "#" || href === "") e.preventDefault();
    });

    // Axtarış hələlik heç nə etmir
    const searchForm = $(".header-search");

    if (searchForm) {
        searchForm.addEventListener("submit", function (e) { e.preventDefault(); });
    }

    // Abunə formu
    const newsletterForm = $(".subscribe-form");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            showToast("Abunə olduğunuz üçün təşəkkürlər!");
            newsletterForm.reset();
        });
    }


    /* ==============================
       8. OXŞAR MƏHSULLAR KARUSELİ
    ============================== */

    const simTrack = $("#similarTrack");
    const simViewport = $(".similar-viewport");
    const simPrev = $(".sim-prev");
    const simNext = $(".sim-next");

    if (simTrack && simViewport) {
        const cards = $$(".product-card", simTrack);
        let simIndex = 0;
        let simOffset = 0;   // sürüşdürmə zamanı əlavə yerdəyişmə

        function stepWidth() {
            const gap = parseFloat(getComputedStyle(simTrack).columnGap) || 0;
            return cards[0].getBoundingClientRect().width + gap;
        }

        // Bir ekranda neçə kart görünür (CSS-dəki --per-view)
        function perView() {
            const value = parseFloat(getComputedStyle(simTrack).getPropertyValue("--per-view"));
            return value || 4;
        }

        function maxIndex() {
            return Math.max(0, Math.ceil(cards.length - perView()));
        }

        function maxShift() {
            return Math.max(0, simTrack.scrollWidth - simViewport.clientWidth);
        }

        function renderCarousel() {
            // sonuncu kartdan sonra boşluq göstərməsin
            const shift = Math.min(simIndex * stepWidth(), maxShift());
            simTrack.style.transform = "translate3d(" + (-shift + simOffset) + "px,0,0)";
            if (simPrev) simPrev.disabled = simIndex <= 0;
            if (simNext) simNext.disabled = simIndex >= maxIndex();
        }

        function goTo(index) {
            simIndex = Math.min(Math.max(index, 0), maxIndex());
            simOffset = 0;
            renderCarousel();
        }

        if (simPrev) simPrev.addEventListener("click", function () { goTo(simIndex - 1); });
        if (simNext) simNext.addEventListener("click", function () { goTo(simIndex + 1); });

        window.addEventListener("resize", function () { goTo(simIndex); });

        // Tutub dartmaq (siçan + barmaq)
        let startX = 0;
        let down = false;
        let moved = false;

        simViewport.style.touchAction = "pan-y";

        simViewport.addEventListener("dragstart", function (e) { e.preventDefault(); });

        simViewport.addEventListener("pointerdown", function (e) {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            down = true;
            moved = false;
            startX = e.clientX;
        });

        window.addEventListener("pointermove", function (e) {
            if (!down) return;
            const dx = e.clientX - startX;
            if (Math.abs(dx) > 5) {
                moved = true;
                simTrack.classList.add("dragging");
            }
            if (!moved) return;
            simOffset = dx;
            renderCarousel();
        });

        function releaseCarousel(e) {
            if (!down) return;
            down = false;
            simTrack.classList.remove("dragging");

            const dx = e.clientX - startX;
            const stepsMoved = Math.round(-dx / stepWidth());

            if (moved && stepsMoved !== 0) {
                goTo(simIndex + stepsMoved);
            } else if (moved && Math.abs(dx) > 40) {
                goTo(simIndex + (dx < 0 ? 1 : -1));
            } else {
                goTo(simIndex);
            }
        }

        window.addEventListener("pointerup", releaseCarousel);
        window.addEventListener("pointercancel", releaseCarousel);

        // Dartdıqdan sonra təsadüfən düymə basılmasın
        simViewport.addEventListener("click", function (e) {
            if (moved) {
                e.preventDefault();
                e.stopPropagation();
                moved = false;
            }
        }, true);

        renderCarousel();
    }

});