
"use strict"

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
    ============================== */

    const searchForm = document.querySelector(".header-search");

    if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const value = searchForm.querySelector("input").value.trim();
            if (!value) return;
            window.open(
                "https://www.bakuelectronics.az/axtaris-neticesi?name=" + encodeURIComponent(value),
                "_blank"
            );
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

    document.querySelectorAll(".product-card .btn").forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.closest(".product-card");
            const nameEl = card.querySelector("h5, h3");
            const priceEl = card.querySelector(".price");
            const imgEl = card.querySelector("img");

            if (!nameEl) return;

            const name = nameEl.textContent.trim();
            const price = priceEl
                ? priceEl.firstChild.textContent.trim()
                : "";
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
            const oldText = button.textContent;
            button.textContent = "Əlavə olundu ✓";
            button.disabled = true;
            setTimeout(function () {
                button.textContent = oldText;
                button.disabled = false;
            }, 1200);
        });
    });

    renderCart();

