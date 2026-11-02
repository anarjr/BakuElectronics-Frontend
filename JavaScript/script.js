document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       1. KAMPANİYA TABLARI (filtr)
    ============================== */

    const tabButtons = document.querySelectorAll(".campaign-tabs button");
    const campaignProducts = document.querySelectorAll(".campaign-product");

    tabButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const category = button.dataset.category;

            tabButtons.forEach(function (b) {
                b.classList.remove("active");
            });
            button.classList.add("active");

            campaignProducts.forEach(function (product) {
                const show = category === "all" || product.dataset.category === category;
                product.classList.toggle("hidden", !show);
            });
        });
    });


    /* ==============================
       2. AXTARIŞ
       (hələlik heç nə etmir, yalnız görünüşdür)
    ============================== */

    const searchForm = document.querySelector(".header-search");

    if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
        });
    }


    /* ==============================
       3. SƏBƏT (localStorage)
    ============================== */

    const CART_KEY = "be_cart";
    const cartPanel = document.querySelector(".cart-dropdown");
    const cartToggle = cartPanel ? cartPanel.parentElement.querySelector(".icon-btn") : null;

    // Səbət paneli bağlanmasın (silmə düyməsinə basanda)
    if (cartToggle) {
        cartToggle.setAttribute("data-bs-auto-close", "outside");
    }

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

        // Başlıq
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
            let badge = cartToggle.querySelector(".cart-count");
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

    document.querySelectorAll(".product-card .btn-cart").forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.closest(".product-card");
            const nameEl = card.querySelector("h5");
            const priceEl = card.querySelector(".price");
            const imgEl = card.querySelector(".product-img img");
            const label = button.querySelector("span");

            if (!nameEl) return;

            const name = nameEl.textContent.trim();
            const price = priceEl ? priceEl.textContent.trim() : "";
            const img = imgEl ? imgEl.getAttribute("src") : "";

            const cart = loadCart();
            const existing = cart.find(function (item) { return item.name === name; });

            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ name: name, price: price, img: img, qty: 1 });
            }

            saveCart(cart);
            renderCart();

            // Qısa təsdiq
            if (label) {
                const oldText = label.textContent;
                label.textContent = "Əlavə olundu ✓";
                button.disabled = true;
                setTimeout(function () {
                    label.textContent = oldText;
                    button.disabled = false;
                }, 1200);
            }
        });
    });

    // Seçilmişlər (ürək) və müqayisə düymələri
    document.querySelectorAll(".btn-fav").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const on = btn.classList.toggle("active");
            const icon = btn.querySelector("i");
            icon.classList.toggle("bi-heart", !on);
            icon.classList.toggle("bi-heart-fill", on);
        });
    });

    document.querySelectorAll(".compare-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            btn.classList.toggle("active");
        });
    });

    renderCart();


    /* ==============================
       4. TÜND TEMA
    ============================== */

    const THEME_KEY = "be_theme";
    const themeToggle = document.querySelector(".theme-toggle");

    function applyTheme(theme, animate) {
        if (animate) {
            const root = document.documentElement;
            root.classList.add("theme-transition");
            clearTimeout(applyTheme.timer);
            applyTheme.timer = setTimeout(function () {
                root.classList.remove("theme-transition");
            }, 600);
        }
        document.body.classList.toggle("dark", theme === "dark");

        if (themeToggle) {
            const icon = themeToggle.querySelector(".bi");
            icon.classList.toggle("bi-brightness-high", theme !== "dark");
            icon.classList.toggle("bi-moon-stars", theme === "dark");
        }

        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) {
            themeColor.setAttribute("content", theme === "dark" ? "#121212" : "#ffffff");
        }
    }

    let savedTheme = "light";
    try {
        savedTheme = localStorage.getItem(THEME_KEY) || "light";
    } catch (err) { /* ignore */ }

    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const next = document.body.classList.contains("dark") ? "light" : "dark";
            applyTheme(next, true);
            try {
                localStorage.setItem(THEME_KEY, next);
            } catch (err) { /* ignore */ }
        });
    }


    /* ==============================
       5. ABUNƏ FORMU
    ============================== */

    const newsletter = document.querySelector(".newsletter form");

    if (newsletter) {
        newsletter.addEventListener("submit", function (e) {
            e.preventDefault();

            const input = newsletter.querySelector("input");
            const button = newsletter.querySelector("button");

            if (!input.value.trim()) return;

            input.value = "";
            button.textContent = "Abunə oldunuz ✓";
            button.disabled = true;

            setTimeout(function () {
                button.textContent = "Abunə ol";
                button.disabled = false;
            }, 2500);
        });
    }


    /* ==============================
       6. ÇAT DÜYMƏSİ
    ============================== */

    const chat = document.querySelector(".chat-fab");

    if (chat) {
        chat.addEventListener("click", function () {
            window.open("https://t.me/baku_electronics", "_blank");
        });
    }


    /* ==============================
       6b. LİNKLƏR (səhifədən çıxarmasın)
       false etsəniz, saytın öz linkləri yenidən işləyər.
    ============================== */

    const BLOCK_SITE_LINKS = true;

    document.addEventListener("click", function (e) {
        const link = e.target.closest("a[href]");
        if (!link) return;

        const href = link.getAttribute("href");

        // "#" linkləri səhifəni yuxarı atmasın
        if (href === "#" || href === "") {
            e.preventDefault();
            return;
        }

        if (!BLOCK_SITE_LINKS) return;

        // bakuelectronics.az-a gedən linklər bloklanır
        try {
            const host = new URL(link.href, window.location.href).hostname;
            if (host === "bakuelectronics.az" || host.endsWith(".bakuelectronics.az")) {
                e.preventDefault();
            }
        } catch (err) { /* ignore */ }
    });


    /* ==============================
       6c. KATALOQ MEGA-MENYUSU
    ============================== */

    const catalogBtn = document.getElementById("catalogBtn");
    const catalogPanel = document.getElementById("catalogPanel");

    if (catalogBtn && catalogPanel) {
        const catButtons = catalogPanel.querySelectorAll(".catalog-cat");
        const catSubs = catalogPanel.querySelectorAll(".catalog-sub");
        const catIcon = catalogBtn.querySelector("i");
        const catLabel = catalogBtn.querySelector("span");

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
       6d. VİDEO SLAYDERİ (oxlar + sürüşdürmə)
    ============================== */

    const videoSlider = document.querySelector(".video-slider");
    const videoPrev = document.querySelector(".slider-prev");
    const videoNext = document.querySelector(".slider-next");

    if (videoSlider) {
        function videoStep() {
            const card = videoSlider.querySelector(".video-card");
            if (!card) return 300;
            const gap = parseFloat(getComputedStyle(videoSlider).columnGap) || 0;
            return card.getBoundingClientRect().width + gap;
        }

        function updateVideoArrows() {
            const max = videoSlider.scrollWidth - videoSlider.clientWidth - 2;
            if (videoPrev) videoPrev.disabled = videoSlider.scrollLeft <= 2;
            if (videoNext) videoNext.disabled = videoSlider.scrollLeft >= max;
        }

        if (videoPrev) {
            videoPrev.addEventListener("click", function () {
                videoSlider.scrollBy({ left: -videoStep(), behavior: "smooth" });
            });
        }

        if (videoNext) {
            videoNext.addEventListener("click", function () {
                videoSlider.scrollBy({ left: videoStep(), behavior: "smooth" });
            });
        }

        videoSlider.addEventListener("scroll", updateVideoArrows, { passive: true });
        window.addEventListener("resize", updateVideoArrows);
        updateVideoArrows();

        // Siçanla sürüşdürmək
        let dragStartX = 0;
        let dragStartScroll = 0;
        let dragging = false;
        let moved = false;

        // Brauzerin öz şəkil/link sürükləməsi qarşısı alınsın
        videoSlider.addEventListener("dragstart", function (e) { e.preventDefault(); });

        videoSlider.addEventListener("mousedown", function (e) {
            e.preventDefault();
            videoSlider.classList.add("dragging");
            dragging = true;
            moved = false;
            dragStartX = e.pageX;
            dragStartScroll = videoSlider.scrollLeft;
        });

        window.addEventListener("mousemove", function (e) {
            if (!dragging) return;
            const dx = e.pageX - dragStartX;
            if (Math.abs(dx) > 5) moved = true;
            videoSlider.style.scrollSnapType = "none";
            videoSlider.scrollLeft = dragStartScroll - dx;
        });

        window.addEventListener("mouseup", function () {
            if (!dragging) return;
            dragging = false;
            videoSlider.classList.remove("dragging");
            videoSlider.style.scrollSnapType = "";
        });

        // Sürüşdürmədən sonra təsadüfən video açılmasın
        videoSlider.addEventListener("click", function (e) {
            if (moved) {
                e.preventDefault();
                moved = false;
            }
        }, true);
    }


    /* ==============================
       7. VİDEO BAŞLIQLARI (YouTube-dan avtomatik)
    ============================== */

    document.querySelectorAll(".video-card").forEach(function (card) {
        const id = card.dataset.id;
        const title = card.querySelector("h5");
        if (!id || !title) return;

        fetch("https://www.youtube.com/oembed?format=json&url=" +
            encodeURIComponent("https://www.youtube.com/watch?v=" + id))
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.title) title.textContent = data.title;
            })
            .catch(function () { /* internet yoxdursa standart yazı qalır */ });
    });


    /* ==============================
       8. BRENDLƏR (sonsuz sürüşən zolaq)
    ============================== */

    const brandsTrack = document.querySelector(".brands-track");

    if (brandsTrack) {
        // Şəkil yoxdursa, brend adını yazı ilə göstər
        function brandFallback(img) {
            const span = document.createElement("span");
            span.className = "brand-name";
            span.textContent = img.alt;
            img.replaceWith(span);
        }

        // Zolağı kəsilməz etmək üçün siyahını təkrarla
        Array.from(brandsTrack.children).forEach(function (item) {
            const copy = item.cloneNode(true);
            copy.setAttribute("aria-hidden", "true");
            copy.setAttribute("tabindex", "-1");
            brandsTrack.appendChild(copy);
        });

        brandsTrack.querySelectorAll("img").forEach(function (img) {
            if (img.complete && img.naturalWidth === 0) {
                brandFallback(img);
            } else {
                img.addEventListener("error", function () { brandFallback(img); }, { once: true });
            }
        });

        // Avtomatik sürüşmə + əllə tutub dartmaq
        const brandsBox = brandsTrack.parentElement;
        const SPEED = 40;            // px / saniyə
        let pos = 0;                 // cari yerdəyişmə (mənfi)
        let hovering = false;
        let grabbing = false;
        let brandMoved = false;
        let startX = 0;
        let startPos = 0;
        let last = performance.now();

        function half() {
            const gap = parseFloat(getComputedStyle(brandsTrack).columnGap) || 0;
            return (brandsTrack.scrollWidth + gap) / 2;
        }

        function wrap() {
            const h = half();
            if (!h) return;
            while (pos <= -h) pos += h;
            while (pos > 0) pos -= h;
        }

        function frame(now) {
            const dt = Math.min((now - last) / 1000, 0.1);
            last = now;
            if (!hovering && !grabbing) pos -= SPEED * dt;
            wrap();
            brandsTrack.style.transform = "translate3d(" + pos + "px,0,0)";
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);

        brandsBox.addEventListener("mouseenter", function () { hovering = true; });
        brandsBox.addEventListener("mouseleave", function () { hovering = false; });
        brandsBox.addEventListener("dragstart", function (e) { e.preventDefault(); });

        brandsBox.addEventListener("pointerdown", function (e) {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            grabbing = true;
            brandMoved = false;
            startX = e.clientX;
            startPos = pos;
            brandsBox.classList.add("dragging");
            brandsBox.setPointerCapture(e.pointerId);
        });

        brandsBox.addEventListener("pointermove", function (e) {
            if (!grabbing) return;
            const dx = e.clientX - startX;
            if (Math.abs(dx) > 5) brandMoved = true;
            pos = startPos + dx;
        });

        function release(e) {
            if (!grabbing) return;
            grabbing = false;
            brandsBox.classList.remove("dragging");
            if (brandsBox.hasPointerCapture(e.pointerId)) brandsBox.releasePointerCapture(e.pointerId);
        }
        brandsBox.addEventListener("pointerup", release);
        brandsBox.addEventListener("pointercancel", release);

        brandsBox.addEventListener("click", function (e) {
            if (brandMoved) {
                e.preventDefault();
                e.stopPropagation();
                brandMoved = false;
            }
        }, true);
    }


});