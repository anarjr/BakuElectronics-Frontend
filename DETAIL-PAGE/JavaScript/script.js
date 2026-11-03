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

});