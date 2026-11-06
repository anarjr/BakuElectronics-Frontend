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


});