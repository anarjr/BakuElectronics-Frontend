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

        catalogBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (catalogPanel.classList.contains("open")) {
                closeCatalog();
            } else {
                openCatalog();
            }
        });

        // Kataloqun içindəki kateqoriyalar və linklər static qalır (kliklə dəyişmir, keçid etmir)

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
       7. SIRALAMA VƏ GÖRÜNÜŞ DÜYMƏLƏRİ (yalnız aktiv vəziyyət, məhsullar statik qalır)
    ============================== */

    $$(".sort-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            $$(".sort-btn").forEach(function (b) { b.classList.toggle("active", b === btn); });
        });
    });

    $$(".view-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            $$(".view-btn").forEach(function (b) { b.classList.toggle("active", b === btn); });
        });
    });


    /* ==============================
       8. FİLTER PANELİ (yalnız görünüş: hover, seçim, "Daha çox"; məhsullar süzülmür)
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

    // Kateqoriya: seçiləndə rəngi dəyişir, təkrar basanda ləğv olur
    $$(".filter-cat").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const wasActive = btn.classList.contains("active");
            $$(".filter-cat").forEach(function (b) { b.classList.remove("active"); });
            if (!wasActive) btn.classList.add("active");
        });
    });

    // Qiymət: sürüşdürücü ilə xanalar bir-birini izləyir (yalnız görünüş)
    const PRICE_MIN = 2;
    const PRICE_MAX = 17000;

    const priceMin = $("#priceMin");
    const priceMax = $("#priceMax");
    const rangeMin = $("#rangeMin");
    const rangeMax = $("#rangeMax");
    const rangeFill = $("#rangeFill");

    function paintRange() {
        const span = PRICE_MAX - PRICE_MIN;
        const min = parseInt(rangeMin.value, 10);
        const max = parseInt(rangeMax.value, 10);
        rangeFill.style.left = ((min - PRICE_MIN) / span * 100) + "%";
        rangeFill.style.right = (100 - (max - PRICE_MIN) / span * 100) + "%";
    }

    function syncFromRange(changed) {
        let min = parseInt(rangeMin.value, 10);
        let max = parseInt(rangeMax.value, 10);

        if (min > max) {
            if (changed === "min") min = max; else max = min;
            rangeMin.value = min;
            rangeMax.value = max;
        }
        priceMin.value = min;
        priceMax.value = max;
        paintRange();
    }

    function syncFromInputs() {
        let min = parseInt(priceMin.value, 10);
        let max = parseInt(priceMax.value, 10);

        min = isNaN(min) ? PRICE_MIN : Math.min(Math.max(min, PRICE_MIN), PRICE_MAX);
        max = isNaN(max) ? PRICE_MAX : Math.min(Math.max(max, PRICE_MIN), PRICE_MAX);
        if (min > max) min = max;

        priceMin.value = min;
        priceMax.value = max;
        rangeMin.value = min;
        rangeMax.value = max;
        paintRange();
    }

    if (priceMin && rangeMin) {
        rangeMin.addEventListener("input", function () { syncFromRange("min"); });
        rangeMax.addEventListener("input", function () { syncFromRange("max"); });
        priceMin.addEventListener("change", syncFromInputs);
        priceMax.addEventListener("change", syncFromInputs);
        paintRange();
    }

    // Sıfırla: seçimləri təmizləyir
    function resetFilters() {
        $$(".filter-cat").forEach(function (b) { b.classList.remove("active"); });
        $$("#brandList input, #colorList input").forEach(function (i) { i.checked = false; });

        if (priceMin) {
            priceMin.value = PRICE_MIN;
            priceMax.value = PRICE_MAX;
            rangeMin.value = PRICE_MIN;
            rangeMax.value = PRICE_MAX;
            paintRange();
        }
    }

    const filterReset = $("#filterReset");
    if (filterReset) filterReset.addEventListener("click", resetFilters);


    /* ==============================
       9. SƏHİFƏLƏMƏ (yalnız görünüş) VƏ TELEFONDA FİLTER PANELİ
    ============================== */

    // Səhifələmə static: yalnız aktiv düymə dəyişir, kartlar dəyişmir və səhifə sürüşmür
    const pagination = $("#pagination");
    const pageButtons = $$(".page-btn[data-page]", pagination);
    const pagePrev = $(".page-prev", pagination);
    const pageNext = $(".page-next", pagination);

    function activePageIndex() {
        return pageButtons.findIndex(function (b) { return b.classList.contains("active"); });
    }

    function setActivePage(index) {
        index = Math.min(Math.max(index, 0), pageButtons.length - 1);

        pageButtons.forEach(function (b, i) { b.classList.toggle("active", i === index); });
        pagePrev.disabled = index === 0;
        pageNext.disabled = index === pageButtons.length - 1;
    }

    pageButtons.forEach(function (btn, i) {
        btn.addEventListener("click", function () { setActivePage(i); });
    });
    pagePrev.addEventListener("click", function () { setActivePage(activePageIndex() - 1); });
    pageNext.addEventListener("click", function () { setActivePage(activePageIndex() + 1); });

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


    /* ==============================
       10. SON BAXDIQLARINIZ KARUSELİ (düymə + tutub dartmaq)
    ============================== */

    $$(".similar").forEach(function (section) {
        const simTrack = $(".similar-track", section);
        const simViewport = $(".similar-viewport", section);
        const simPrev = $(".sim-prev", section);
        const simNext = $(".sim-next", section);

        if (!simTrack || !simViewport) return;

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
    });



});