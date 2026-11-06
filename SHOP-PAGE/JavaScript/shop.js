"use strict";

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


    /* ==============================
       7. SIRALAMA, GÖRÜNÜŞ VƏ SÜZGƏC MƏNTİQİ
    ============================== */

    const grid = $("#productGrid");
    const allCards = $$(".product-card", grid);
    const emptyState = $("#emptyState");
    const resultCount = $("#resultCount");
    const applyCount = $("#applyCount");
    const pagination = $("#pagination");

    const PRICE_MIN = 2;
    const PRICE_MAX = 17000;
    const TOTAL_PRODUCTS = 833;   // real saytdakı ümumi say

    // Bütün seçimlər burada saxlanır
    const state = {
        sort: "popular",
        view: "grid",
        cat: "",
        min: PRICE_MIN,
        max: PRICE_MAX,
        brands: new Set(),
        colors: new Set()
    };

    function filtersActive() {
        return state.cat !== "" || state.brands.size > 0 || state.colors.size > 0 ||
            state.min > PRICE_MIN || state.max < PRICE_MAX;
    }

    function matches(card) {
        const d = card.dataset;
        const price = parseFloat(d.price);

        if (state.cat && d.cat !== state.cat) return false;
        if (price < state.min || price > state.max) return false;
        if (state.brands.size && !state.brands.has(d.brand)) return false;
        if (state.colors.size && !state.colors.has(d.color)) return false;
        return true;
    }

    function sortCards(list) {
        const copy = list.slice();

        if (state.sort === "discount") {
            copy.sort(function (a, b) { return b.dataset.discount - a.dataset.discount; });
        } else if (state.sort === "asc") {
            copy.sort(function (a, b) { return a.dataset.price - b.dataset.price; });
        } else if (state.sort === "desc") {
            copy.sort(function (a, b) { return b.dataset.price - a.dataset.price; });
        }
        return copy;
    }

    function render() {
        const visible = sortCards(allCards.filter(matches));

        // Sıra dəyişir, uyğun gəlməyənlər gizlənir
        visible.forEach(function (card) {
            card.hidden = false;
            grid.appendChild(card);
        });
        allCards.forEach(function (card) {
            if (visible.indexOf(card) === -1) {
                card.hidden = true;
                grid.appendChild(card);
            }
        });

        const count = filtersActive() ? visible.length : TOTAL_PRODUCTS;
        if (resultCount) resultCount.textContent = count;
        if (applyCount) applyCount.textContent = count;

        const empty = visible.length === 0;
        if (emptyState) emptyState.hidden = !empty;
        if (pagination) pagination.hidden = empty;
    }

    // Sıralama düymələri
    $$(".sort-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            state.sort = btn.dataset.sort;
            $$(".sort-btn").forEach(function (b) { b.classList.toggle("active", b === btn); });
            render();
        });
    });

    // Kart / siyahı görünüşü
    $$(".view-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            state.view = btn.dataset.view;
            $$(".view-btn").forEach(function (b) { b.classList.toggle("active", b === btn); });
            grid.classList.toggle("list-view", state.view === "list");
            try { localStorage.setItem("be_shop_view", state.view); } catch (err) { /* ignore */ }
        });
    });

    // Əvvəl seçilmiş görünüşü xatırla
    try {
        if (localStorage.getItem("be_shop_view") === "list") {
            const listBtn = $('.view-btn[data-view="list"]');
            if (listBtn) listBtn.click();
        }
    } catch (err) { /* ignore */ }


    /* ==============================
       8. FİLTERLƏR (kateqoriya, qiymət, brend, rəng)
    ============================== */

    // "Daha çox" / "Daha az"
    $$(".more-btn").forEach(function (btn) {
        const target = $(btn.dataset.more);
        const label = btn.firstChild;

        btn.addEventListener("click", function () {
            const open = target.classList.toggle("open");
            btn.classList.toggle("open", open);
            label.textContent = open ? "Daha az " : "Daha çox ";
        });
    });

    // Kateqoriya (təkini seçmək olar, təkrar basanda ləğv olur)
    $$(".filter-cat").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const same = state.cat === btn.dataset.cat;
            state.cat = same ? "" : btn.dataset.cat;
            $$(".filter-cat").forEach(function (b) {
                b.classList.toggle("active", b.dataset.cat === state.cat);
            });
            render();
        });
    });

    // Brend və rəng qutuları
    function bindChecks(selector, set) {
        $$(selector + " input").forEach(function (input) {
            input.addEventListener("change", function () {
                if (input.checked) set.add(input.value);
                else set.delete(input.value);
                render();
            });
        });
    }

    bindChecks("#brandList", state.brands);
    bindChecks("#colorList", state.colors);

    // Brend axtarışı
    const brandSearch = $("#brandSearch");
    const brandList = $("#brandList");

    if (brandSearch && brandList) {
        brandSearch.addEventListener("input", function () {
            const q = brandSearch.value.trim().toLowerCase();

            // axtarış zamanı gizli brendlər də tapılsın
            brandList.classList.toggle("searching", q !== "");

            $$(".brand-item", brandList).forEach(function (li) {
                const name = li.textContent.toLowerCase();
                li.classList.toggle("hidden", q !== "" && name.indexOf(q) === -1);
            });
        });
    }

    // Qiymət: iki sürüşdürücü + iki xana
    const priceMin = $("#priceMin");
    const priceMax = $("#priceMax");
    const rangeMin = $("#rangeMin");
    const rangeMax = $("#rangeMax");
    const rangeFill = $("#rangeFill");

    function clampNumber(value, fallback) {
        const n = parseInt(value, 10);
        return isNaN(n) ? fallback : Math.min(Math.max(n, PRICE_MIN), PRICE_MAX);
    }

    function paintRange() {
        const span = PRICE_MAX - PRICE_MIN;
        rangeFill.style.left = ((state.min - PRICE_MIN) / span * 100) + "%";
        rangeFill.style.right = (100 - (state.max - PRICE_MIN) / span * 100) + "%";
    }

    function syncPrice(from) {
        let min = clampNumber(from === "text" ? priceMin.value : rangeMin.value, PRICE_MIN);
        let max = clampNumber(from === "text" ? priceMax.value : rangeMax.value, PRICE_MAX);

        if (min > max) {
            // əlində tutduğu sürüşdürücü o birini keçməsin
            if (from === "rangeMin" || from === "text") min = max; else max = min;
        }

        state.min = min;
        state.max = max;

        if (from !== "text") {
            priceMin.value = min;
            priceMax.value = max;
        }
        rangeMin.value = min;
        rangeMax.value = max;

        paintRange();
        render();
    }

    if (priceMin && rangeMin) {
        rangeMin.addEventListener("input", function () { syncPrice("rangeMin"); });
        rangeMax.addEventListener("input", function () { syncPrice("rangeMax"); });
        priceMin.addEventListener("change", function () { syncPrice("text"); priceMin.value = state.min; });
        priceMax.addEventListener("change", function () { syncPrice("text"); priceMax.value = state.max; });
        paintRange();
    }

    // Hamısını sıfırla
    function resetFilters() {
        state.cat = "";
        state.brands.clear();
        state.colors.clear();
        state.min = PRICE_MIN;
        state.max = PRICE_MAX;

        $$(".filter-cat").forEach(function (b) { b.classList.remove("active"); });
        $$("#brandList input, #colorList input").forEach(function (i) { i.checked = false; });

        if (priceMin) {
            priceMin.value = PRICE_MIN;
            priceMax.value = PRICE_MAX;
            rangeMin.value = PRICE_MIN;
            rangeMax.value = PRICE_MAX;
            paintRange();
        }
        if (brandSearch) {
            brandSearch.value = "";
            brandSearch.dispatchEvent(new Event("input"));
        }
        render();
    }

    const filterReset = $("#filterReset");
    const emptyReset = $("#emptyReset");

    if (filterReset) filterReset.addEventListener("click", resetFilters);
    if (emptyReset) emptyReset.addEventListener("click", resetFilters);


    /* ==============================
       9. SƏHİFƏLƏMƏ VƏ TELEFONDA FİLTER PANELİ
    ============================== */

    const LAST_PAGE = 47;
    let currentPage = 1;

    // Hansı nömrələr görünsün: 1 2 3 4 5 ... 47
    function pageNumbers(page) {
        if (page <= 4) return [1, 2, 3, 4, 5, "...", LAST_PAGE];
        if (page >= LAST_PAGE - 3) return [1, "...", LAST_PAGE - 4, LAST_PAGE - 3, LAST_PAGE - 2, LAST_PAGE - 1, LAST_PAGE];
        return [1, "...", page - 1, page, page + 1, "...", LAST_PAGE];
    }

    function renderPagination() {
        if (!pagination) return;

        pagination.textContent = "";

        function makeButton(html, cls, disabled, onClick, label) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "page-btn " + cls;
            btn.innerHTML = html;
            btn.disabled = disabled;
            if (label) btn.setAttribute("aria-label", label);
            btn.addEventListener("click", onClick);
            return btn;
        }

        pagination.appendChild(makeButton('<i class="bi bi-chevron-left"></i>', "page-prev",
            currentPage === 1, function () { goToPage(currentPage - 1); }, "Əvvəlki"));

        pageNumbers(currentPage).forEach(function (n) {
            if (n === "...") {
                const dots = document.createElement("span");
                dots.className = "page-dots";
                dots.textContent = "...";
                pagination.appendChild(dots);
                return;
            }
            pagination.appendChild(makeButton(n, n === currentPage ? "active" : "", false,
                function () { goToPage(n); }));
        });

        pagination.appendChild(makeButton('<i class="bi bi-chevron-right"></i>', "page-next",
            currentPage === LAST_PAGE, function () { goToPage(currentPage + 1); }, "Növbəti"));
    }

    function goToPage(page) {
        currentPage = Math.min(Math.max(page, 1), LAST_PAGE);
        renderPagination();

        // Siyahının başına qayıt və qısa keçid effekti ver
        const top = $(".shop-head").getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo({ top: top, behavior: "smooth" });

        grid.classList.add("page-fade");
        setTimeout(function () { grid.classList.remove("page-fade"); }, 350);
    }

    renderPagination();

    // Telefon / planşetdə filter paneli yandan açılır
    const filtersPanel = $("#filters");
    const filterBackdrop = $("#filterBackdrop");

    function openFilters() {
        filtersPanel.classList.add("open");
        filterBackdrop.classList.add("show");
        document.body.classList.add("no-scroll");
    }

    function closeFilters() {
        filtersPanel.classList.remove("open");
        filterBackdrop.classList.remove("show");
        document.body.classList.remove("no-scroll");
    }

    const filterOpen = $("#filterOpen");
    if (filterOpen) filterOpen.addEventListener("click", openFilters);
    if (filterBackdrop) filterBackdrop.addEventListener("click", closeFilters);

    const filterClose = $("#filterClose");
    if (filterClose) filterClose.addEventListener("click", closeFilters);

    const filterApply = $("#filterApply");
    if (filterApply) filterApply.addEventListener("click", closeFilters);

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeFilters();
    });

    // Ekran böyüyəndə açıq qalmasın
    window.addEventListener("resize", function () {
        if (window.innerWidth > 991) closeFilters();
    });


});