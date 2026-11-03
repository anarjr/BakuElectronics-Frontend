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

});