document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       1. KÖMƏKÇİ FUNKSİYALAR
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
       2. TÜND TEMA (əsas səhifə və detal səhifəsi ilə eyni seçim)
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
       3. "#" LİNKLƏR, ABUNƏ FORMU
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
       4. KATALOQ MEGA-MENYUSU
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
       5. AXTARIŞ PANELİ
    ============================== */

    const searchInput = $("#headerSearch input");
    const searchPanel = $("#searchPanel");

    if (searchInput && searchPanel) {
        const searchBox = $("#headerSearch");

        function openSearch() {
            if (catalogPanel && catalogPanel.classList.contains("open")) {
                catalogBtn.click();
            }
            searchPanel.classList.add("open");
        }

        function closeSearch() {
            searchPanel.classList.remove("open");
        }

        searchInput.addEventListener("focus", openSearch);
        searchInput.addEventListener("click", openSearch);

        // Yazdıqca "Ən çox axtarılan" və "Kateqoriyalar" siyahısı süzülür
        searchInput.addEventListener("input", function () {
            const q = searchInput.value.trim().toLowerCase();
            $$(".search-list li", searchPanel).forEach(function (li) {
                li.style.display = !q || li.textContent.toLowerCase().includes(q) ? "" : "none";
            });
        });

        if (catalogBtn) {
            catalogBtn.addEventListener("click", closeSearch);
        }

        document.addEventListener("click", function (e) {
            if (!searchPanel.contains(e.target) && !searchBox.contains(e.target)) closeSearch();
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeSearch();
        });
    }


    /* ==============================
       6. SƏBƏT, SEÇİLMİŞLƏR, MÜQAYİSƏ
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

    // Kartlardakı düymələr: səbətə at, ürək, müqayisə
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
            showToast("Məhsul səbətə əlavə olundu");
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

    $$(".product-card .btn-fav").forEach(function (btn) {
        btn.addEventListener("click", function () {
            showToast(toggleHeart(btn) ? "Seçilmişlərə əlavə olundu" : "Seçilmişlərdən çıxarıldı");
        });
    });

    // Müqayisə
    $$(".product-card .compare-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const on = btn.classList.toggle("active");
            showToast(on ? "Müqayisəyə əlavə olundu" : "Müqayisədən çıxarıldı");
        });
    });

    renderCart();


});