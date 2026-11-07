/* ==============================
   1. ÜMUMİ AYARLAR, YUXARI ZOLAQ, NAVIGATION
============================== */

*,
*::before,
*::after {
    box-sizing: border-box;
}

:root {
    --page-w: 82%;   /* saytın yan boşluqları: hər tərəfdən ~9% */
    --main-color: #e30613;
    --dark-color: #222;
    --text-color: #444;
    --light-color: #f7f7f7;
    --border-color: #e8e8e8;
    --topbar-h: 34px;     /* yuxarı zolağın hündürlüyü (header bunun altında yapışır) */
    --sticky-top: 120px;  /* qalereyanın yapışma məsafəsi */
    --soft-bg: #f4f4f4;   /* boz kartların fonu */
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    color: var(--dark-color);
    background-color: #fff;
    overflow-x: hidden;
}

a {
    text-decoration: none;
    color: inherit;
}

img {
    max-width: 100%;
    display: block;
}

button {
    cursor: pointer;
}

section {
    width: 100%;
}

.top-bar {
    position: sticky;
    top: 0;
    z-index: 1002;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--topbar-h);
    padding: 0 15px;
    background: var(--main-color);
    color: #fff;
    text-align: center;
    font-size: 21px;
    line-height: 1.2;
}

.top-bar a {
    color: #fff;
}

.top-bar strong {
    font-weight: 700;
}

.main-navigation {
    position: relative;
    z-index: 1001;
    background: #fff;
}

.main-navigation .container-fluid {
    width: var(--page-w);
    max-width: 1800px;
    margin: 0 auto;
    padding: 0;
}

.main-navigation .nav {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    height: 54px;
    margin-top: 0;
    padding: 0 32px;
    background: #f4f4f4;
    border-radius: 30px;
}

.main-navigation .nav-links,
.main-navigation .nav-tools {
    display: flex;
    align-items: center;
}

.main-navigation .nav-links {
    gap: 44px;
}

.main-navigation .nav-tools {
    gap: 22px;
}

.main-navigation a {
    color: #777;
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    transition: color 0.3s;
}

.main-navigation a:hover {
    color: var(--main-color);
}

.main-navigation a.active {
    color: #222;
    font-weight: 700;
}

.main-navigation .lang-toggle {
    color: #222;
    font-weight: 700;
}

.main-navigation .dropdown-menu {
    min-width: 170px;
    padding: 6px 0;
    margin-top: 14px;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.main-navigation .dropdown-item {
    display: block;
    padding: 8px 16px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
}

.main-navigation .dropdown-item:hover {
    background: #fff0f0;
    color: var(--main-color);
}

.main-navigation .theme-toggle {
    position: relative;
    width: 66px;
    height: 38px;
    padding: 0;
    background: #111;
    border: 0;
    border-radius: 20px;
}

.main-navigation .theme-toggle .theme-knob {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 50%;
}

.main-navigation .theme-toggle .bi {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #fff;
    font-size: 16px;
}

.main-navigation .nav-links a:not(.dropdown-item) {
    padding: 6px 12px;
    border-radius: 20px;
    transition: color 0.25s, background-color 0.25s;
}

.main-navigation .nav-links a:not(.dropdown-item):hover {
    color: var(--main-color);
    background: rgba(227, 6, 19, 0.08);
}

html.theme-transition *,
html.theme-transition *::before,
html.theme-transition *::after {
    transition: background-color 0.5s ease, color 0.5s ease,
                border-color 0.5s ease, box-shadow 0.5s ease !important;
}

.main-navigation a.dropdown-toggle::after,
.main-navigation .lang-toggle::after {
    content: "\F282";
    font-family: "bootstrap-icons";
    margin-left: 5px;
    border: 0;
    font-size: 11px;
    font-weight: 400;
    vertical-align: -1px;
}



/* ==============================
   2. HEADER, KATALOQ, AXTARIŞ, SƏBƏT, BİLDİRİŞ
============================== */

header {
    width: 100%;
    background: #fff;
    position: relative;
    z-index: 1000;
}

header .container-fluid {
    position: relative;
    width: var(--page-w);
    max-width: 1800px;
    margin: 0 auto;
    padding: 0;
}

header .navbar {
    padding: 26px 0 12px;
}

header .navbar-brand {
    display: flex;
    align-items: center;
    margin: 0 18px 0 0;
    padding: 0;
}

header .navbar-brand img {
    width: 62px;
    height: 62px;
}

header .header-actions {
    flex: 1;
    gap: 18px;
}

header .bi {
    font-size: 19px;
}

header .btn-catalog {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 63px;
    padding: 0 26px;
    background: #2b2b2b;
    border: 0;
    border-radius: 20px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: none;
    transition: background 0.3s;
}

header .btn-catalog:hover,
header .btn-catalog:focus,
header .btn-catalog:active,
header .btn-catalog.open {
    background: #3a3a3a;
    color: #fff;
    box-shadow: none;
}

header .btn-catalog .bi {
    font-size: 22px;
}

header .header-search {
    position: relative;
    flex: 1;
}

header .header-search input {
    width: 100%;
    height: 63px;
    padding: 0 64px 0 26px;
    background: #f4f4f4;
    border: 0;
    border-radius: 20px;
    font-size: 18px;
}

header .header-search input:focus {
    background: #efefef;
    box-shadow: none;
}

header .header-search button {
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
    padding: 6px;
    background: none;
    border: 0;
    color: #777;
}

header .header-icons {
    display: flex;
    align-items: center;
    gap: 10px;
}

header .icon-btn {
    position: relative;
    width: 62px;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f4f4f4;
    border-radius: 20px;
    color: #222;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    transition: 0.3s;
}

header .icon-btn:hover {
    background: #ffe9e9;
    color: var(--main-color);
}

header .icon-btn .bi {
    font-size: 24px;
}

header .cart-dropdown {
    min-width: 300px;
    padding: 18px;
    border: 1px solid var(--border-color);
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

header .cart-dropdown h6 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
}

header .cart-dropdown p {
    color: #777;
    font-size: 13px;
    margin: 0;
}

header {
    position: sticky;
    top: var(--topbar-h);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
}

header .navbar {
    padding: 20px 0 12px;
}

header .navbar-brand img {
    width: 50px;
    height: 50px;
}

header .btn-catalog,
header .header-search input {
    height: 50px;
    border-radius: 16px;
    font-size: 16px;
}

header .btn-catalog {
    padding: 0 22px;
}

header .icon-btn {
    width: 50px;
    height: 50px;
    border-radius: 16px;
}

header .icon-btn .bi {
    font-size: 21px;
}

.catalog-panel {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1500;
    grid-template-columns: 304px minmax(0, 1fr) 320px;
    column-gap: 24px;
    height: 640px;
    max-height: calc(100vh - 150px);
    padding: 26px 24px 26px 26px;
    background: #f4f4f4;
    border-radius: 30px;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.16);
}

.catalog-panel.open {
    display: grid;
}

.catalog-cats {
    overflow-y: auto;
    padding-right: 22px;
    border-right: 1px solid #cfcfcf;
    scrollbar-width: thin;
}

.catalog-cat {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    margin-bottom: 4px;
    padding: 13px 14px;
    background: none;
    border: 0;
    border-radius: 16px;
    color: #222;
    font-size: 16px;
    line-height: 1.3;
    text-align: left;
    transition: background 0.2s;
}

.catalog-cat i {
    flex: 0 0 24px;
    color: #555;
    font-size: 22px;
}

.catalog-cat:hover,
.catalog-cat.active {
    background: #e4e4e4;
}

.catalog-subs {
    overflow-y: auto;
    padding: 0 10px 0 14px;
    scrollbar-width: thin;
}

.catalog-sub {
    display: none;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 30px;
    align-items: start;
}

.catalog-sub.active {
    display: grid;
}

.catalog-group {
    margin-bottom: 26px;
}

.catalog-group h6 {
    margin: 0 0 10px;
    font-size: 17px;
    font-weight: 700;
}

.catalog-group h6 a {
    color: #222;
    font-size: 17px;
    line-height: 1.4;
}

.catalog-group ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.catalog-group li a {
    display: block;
    padding: 7px 0;
    color: #777;
    font-size: 16px;
    line-height: 1.35;
    transition: color 0.2s;
}

.catalog-group a:hover {
    color: var(--main-color);
}

.catalog-promo {
    align-self: start;
    display: block;
    height: 280px;
    overflow: hidden;
    border-radius: 22px;
}

.catalog-promo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

header .icon-btn {
    position: relative;
}

header .cart-count {
    position: absolute;
    top: -6px;
    right: -6px;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--main-color);
    border-radius: 11px;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
}

header .cart-list {
    max-height: 280px;
    overflow-y: auto;
}

header .cart-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border-color);
}

header .cart-item img {
    width: 46px;
    height: 46px;
    flex: 0 0 46px;
    object-fit: contain;
}

header .cart-item-info {
    flex: 1;
    min-width: 0;
}

header .cart-item-name {
    display: block;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.3;
}

header .cart-item-info small {
    color: #777;
    font-size: 12px;
}

header .cart-item-remove {
    background: none;
    border: 0;
    color: #999;
}

header .cart-item-remove:hover {
    color: var(--main-color);
}

header .cart-item-remove .bi {
    font-size: 14px;
}

header .cart-clear {
    margin-top: 12px;
    width: 100%;
    padding: 9px;
    background: #fff0f0;
    border: 0;
    border-radius: 8px;
    color: var(--main-color);
    font-size: 13px;
    font-weight: 600;
}

.toast-msg {
    position: fixed;
    left: 50%;
    bottom: 30px;
    z-index: 4000;
    max-width: calc(100% - 30px);
    padding: 13px 22px;
    background: #222;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, 20px);
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-msg.show {
    opacity: 1;
    transform: translate(-50%, 0);
}

.search-panel {
    display: none;
    position: absolute;
    top: 100%;
    left: 18%;
    right: 18%;
    z-index: 1500;
    grid-template-columns: 1fr 1fr;
    column-gap: 14px;
    padding: 16px;
    background: #f4f4f4;
    border-radius: 0 0 26px 26px;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.16);
}

.search-panel.open {
    display: grid;
}

.search-left,
.search-products {
    padding: 18px 20px;
    background: #fff;
    border-radius: 20px;
}

.search-left {
    min-height: 100%;
}

.search-panel h6 {
    margin: 0 0 8px;
    color: #111;
    font-size: 14px;
    font-weight: 700;
}

.search-list {
    margin: 0 0 22px;
    padding: 0;
    list-style: none;
}

.search-list li {
    border-bottom: 1px solid #e6e6e6;
}

.search-list a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 0;
    color: #222;
    font-size: 14px;
}

.search-list a i {
    color: #b9b9b9;
    font-size: 12px;
}

.search-list a span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.search-list a:hover {
    color: var(--main-color);
}

.search-right {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.search-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    padding: 0 12px 0 0;
    background: #f4f4f4;
    border-radius: 12px;
    color: #222;
}

.search-item:last-child {
    margin-bottom: 0;
}

.search-thumb {
    flex: 0 0 56px;
    width: 56px;
    height: 56px;
    margin: -6px 0 -6px 4px;
    display: flex;
    background: #fff;
    border: 1px solid #ececec;
    border-radius: 10px;
}

.search-thumb img {
    width: 100%;
    height: 100%;
    padding: 5px;
    object-fit: contain;
}

.search-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 10px 0;
}

.search-info small {
    color: #8a8a8a;
    font-size: 10px;
}

.search-info b {
    overflow: hidden;
    font-size: 12px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.search-price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    white-space: nowrap;
}

.search-price s {
    color: #8a8a8a;
    font-size: 10px;
}

.search-price strong {
    font-size: 13px;
}

.search-banner {
    position: relative;
    flex: 1;
    min-height: 140px;
    display: block;
    overflow: hidden;
    background: linear-gradient(120deg, #e30613, #b8000c);
    border-radius: 20px;
    color: #fff;
}

.search-banner .sb-small {
    position: absolute;
    top: 16px;
    left: 16px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
}

.search-banner .sb-big {
    position: absolute;
    left: 14px;
    top: 34px;
    font-size: 58px;
    font-weight: 800;
    font-style: italic;
    line-height: 1;
}

.search-banner .sb-big em {
    font-size: 16px;
}

.search-banner .sb-text {
    position: absolute;
    left: 18px;
    bottom: 14px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
}

.search-banner .sb-right {
    position: absolute;
    right: 14px;
    top: 24px;
    text-align: center;
}

.search-banner .sb-right b {
    display: block;
    font-size: 58px;
    font-weight: 800;
    line-height: 1;
}

.search-banner .sb-right i {
    font-size: 9px;
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
}

header {
    box-shadow: none;
}



/* ==============================
   3. SƏHİFƏ KONTEYNERİ, BREADCRUMB, BAŞLIQ, SIRALAMA
============================== */

.page-container {
    width: var(--page-w);
    max-width: 1800px;
    margin: 0 auto;
    padding: 0;
}

.breadcrumbs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 20px 0 34px;
    color: #777;
    font-size: 12.5px;
}

.breadcrumbs a:hover {
    color: var(--main-color);
}

.breadcrumbs .bi {
    font-size: 11px;
}

.breadcrumbs span {
    color: #222;
    font-weight: 500;
}

.breadcrumbs {
    font-size: 11.5px;
}

.breadcrumbs span {
    font-weight: 700;
}


.shop-page {
    padding-bottom: 10px;
}

.shop-page .breadcrumbs {
    padding: 20px 0 14px;
}

.shop-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 26px;
}

.shop-title {
    margin: 0;
    color: #222;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.25;
}

.shop-tools {
    display: flex;
    align-items: center;
    gap: 14px;
}

/* Sıralama zolağı */

.sort-bar {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 46px;
    padding: 0 12px;
    background: #f6f6f6;
    border-radius: 24px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.sort-btn {
    padding: 8px 14px;
    background: none;
    border: 0;
    border-radius: 18px;
    color: #8a8a8a;
    font-size: 13.5px;
    white-space: nowrap;
    transition: color 0.2s;
}

.sort-btn:hover {
    color: var(--main-color);
}

.sort-btn.active {
    color: #111;
    font-weight: 700;
}

/* Kart / siyahı görünüşü */

.view-toggle {
    display: flex;
    gap: 8px;
}

.view-btn {
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: 0;
    border-radius: 14px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
    color: #222;
    font-size: 19px;
    transition: background 0.2s;
}

.view-btn:hover:not(.active) {
    background: #f4f4f4;
}

.view-btn.active {
    background: #ececec;
    box-shadow: none;
}

.filter-open {
    display: none;
}


/* ==============================
   4. SOL FİLTER PANELİ
============================== */


.shop-layout {
    display: grid;
    grid-template-columns: 277px minmax(0, 1fr);
    column-gap: 33px;
    align-items: start;
}

.filters {
    position: sticky;
    top: calc(var(--sticky-top) + 10px);
    max-height: calc(100vh - var(--sticky-top) - 30px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #f6f6f6;
    border-radius: 28px;
}

.filters-top,
.filters-foot,
.filter-backdrop {
    display: none;
}

.filters-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px 12px 6px 22px;
    scrollbar-width: thin;
    scrollbar-color: #444 transparent;
}

.filters-body::-webkit-scrollbar {
    width: 4px;
}

.filters-body::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
}

.filter-block {
    margin-bottom: 30px;
    padding-right: 10px;
}

.filter-block h6 {
    margin: 0 0 16px;
    color: #111;
    font-size: 14px;
    font-weight: 700;
}

.filter-block ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

/* Kateqoriyalar */

.filter-cat {
    display: block;
    width: 100%;
    padding: 6px 0;
    background: none;
    border: 0;
    color: #222;
    font-size: 13.5px;
    text-align: left;
    transition: color 0.2s;
}

.filter-cat:hover,
.filter-cat.active {
    color: var(--main-color);
}

.filter-cat.active {
    font-weight: 700;
}

.filter-cats li.extra,
.filter-list li.extra {
    display: none;
}

.filter-cats.open li.extra,
.filter-list.open li.extra {
    display: block;
}

.more-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 8px;
    padding: 0;
    background: none;
    border: 0;
    color: #8a8a8a;
    font-size: 13px;
}

.more-btn:hover {
    color: var(--main-color);
}

.more-btn .bi {
    font-size: 10px;
    transition: transform 0.25s;
}

.more-btn.open .bi {
    transform: rotate(180deg);
}

/* Qiymət */

.price-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
}

.price-inputs input {
    width: 100%;
    height: 40px;
    padding: 0 14px;
    background: #fff;
    border: 1px solid transparent;
    border-radius: 12px;
    color: #333;
    font-size: 13px;
    outline: none;
    -moz-appearance: textfield;
}

.price-inputs input::-webkit-outer-spin-button,
.price-inputs input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.price-inputs input:focus {
    border-color: #f0a0a4;
}

.range {
    position: relative;
    height: 28px;
    margin: 22px 4px 0;
}

.range-track {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 3px;
    background: #dcdcdc;
    border-radius: 3px;
    transform: translateY(-50%);
}

.range-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    background: var(--main-color);
    border-radius: 3px;
}

.range input[type="range"] {
    position: absolute;
    top: 0;
    left: -9px;
    width: calc(100% + 18px);
    height: 28px;
    margin: 0;
    background: none;
    pointer-events: none;
    -webkit-appearance: none;
    appearance: none;
}

.range input[type="range"]::-webkit-slider-runnable-track {
    background: none;
    -webkit-appearance: none;
}

.range input[type="range"]::-moz-range-track {
    background: none;
}

.range input[type="range"]::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    background: #fff;
    border: 2px solid #f26a71;
    border-radius: 50%;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
    cursor: pointer;
    pointer-events: auto;
    -webkit-appearance: none;
}

.range input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #fff;
    border: 2px solid #f26a71;
    border-radius: 50%;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
    cursor: pointer;
    pointer-events: auto;
}

/* Brendlər və rənglər */

.filter-search {
    position: relative;
    margin-bottom: 12px;
}

.filter-search input {
    width: 100%;
    height: 38px;
    padding: 0 38px 0 14px;
    background: #fff;
    border: 1px solid transparent;
    border-radius: 12px;
    font-size: 13px;
    outline: none;
}

.filter-search input:focus {
    border-color: #f0a0a4;
}

.filter-search .bi {
    position: absolute;
    top: 50%;
    right: 13px;
    color: #777;
    font-size: 13px;
    transform: translateY(-50%);
    pointer-events: none;
}

.filter-list label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 0;
    color: #222;
    font-size: 13.5px;
    cursor: pointer;
}

.filter-list input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.filter-list .box {
    flex: 0 0 16px;
    width: 16px;
    height: 16px;
    background: #fff;
    border: 1.5px solid #b9b9b9;
    border-radius: 4px;
    transition: 0.2s;
}

.filter-list input:checked + .box {
    background: var(--main-color);
    border-color: var(--main-color);
    box-shadow: inset 0 0 0 2px #fff;
}

.filter-list label:hover .bn {
    color: var(--main-color);
}

.filter-list label:hover .box {
    border-color: var(--main-color);
}

.filter-list em {
    color: #8a8a8a;
    font-style: normal;
}

.filter-list .swatch {
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
    background: var(--c);
    border: 1px solid #cfcfcf;
    border-radius: 50%;
}

.filter-list input:checked + .swatch {
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--main-color);
}

.filter-list li.hidden {
    display: none !important;
}

.filter-list.searching li.extra {
    display: block;
}


/* ==============================
   5. MƏHSUL KARTLARI, ŞƏBƏKƏ VƏ SİYAHI GÖRÜNÜŞÜ
============================== */

.btn-fav.active i {
    color: var(--main-color);
}

.compare-btn.active {
    background: var(--main-color);
    color: #fff;
}

.product-rating-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px 22px;
    margin-bottom: 8px;
    color: #333;
    font-size: 15px;
}

.product-grid .product-card {
    flex: 0 0 calc((100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view));
    min-width: 0;
}

.product-grid .btn-cart span {
    white-space: nowrap;
}

.product-card {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 48px;
    padding: 0 25px 25px;
    background: #f4f4f4;
    border-radius: 40px;
    transition: box-shadow 0.3s;
}

.product-card:hover {
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}

.product-img {
    position: relative;
    height: 272px;
    margin: -48px 0 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: 1px solid #ececec;
    border-radius: 30px;
}

.product-img img {
    width: 100%;
    height: 100%;
    padding: 26px;
    object-fit: contain;
}

.discount-badge {
    position: absolute;
    top: 18px;
    left: 12px;
    z-index: 2;
    padding: 7px 12px;
    background: #ec2227;
    border-radius: 14px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
}

.compare-btn {
    position: absolute;
    top: 14px;
    right: 12px;
    z-index: 2;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f6f6f6;
    border: 0;
    border-radius: 16px;
    color: #222;
    transition: 0.3s;
}

.compare-btn:hover,
.compare-btn.active,
.btn-fav.active {
    color: var(--main-color);
}

.compare-btn .bi {
    font-size: 20px;
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 8px;
    color: #666;
    font-size: 15px;
}

.product-rating span {
    display: flex;
    align-items: center;
    gap: 7px;
}

.product-rating .bi-star-fill {
    color: #ec2227;
    font-size: 17px;
}

.product-rating .bi-chat-dots-fill {
    color: #f4a5a8;
    font-size: 17px;
}

.product-card h5 {
    min-height: 46px;
    margin: 0 0 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #222;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.45;
}

.product-prices {
    display: flex;
    align-items: stretch;
    gap: 18px;
    margin-top: auto;
    margin-bottom: 18px;
}

.product-prices .price-main,
.product-prices .price-installment {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 2px;
}

.product-prices .price-installment {
    padding-left: 18px;
    border-left: 1px solid #d6d6d6;
}

.product-prices .price-installment span {
    color: #8a8a8a;
    font-size: 15px;
    line-height: 1.2;
}

.product-prices .price-installment strong,
.product-prices .price {
    color: #222;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.15;
    white-space: nowrap;
}

.old-price {
    color: #8a8a8a;
    font-size: 15px;
    line-height: 1.2;
    text-decoration: line-through;
}

.product-actions {
    display: flex;
    gap: 10px;
}

.btn-cart {
    flex: 1;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    background: #e8e8e8;
    border: 0;
    border-radius: 16px;
    color: #222;
    font-size: 16px;
    font-weight: 500;
    transition: 0.3s;
}

.btn-cart:hover {
    background: var(--main-color);
    color: #fff;
}

.btn-cart:disabled {
    opacity: 0.8;
}

.btn-fav {
    width: 54px;
    height: 54px;
    flex: 0 0 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e8e8e8;
    border: 0;
    border-radius: 16px;
    color: #222;
    transition: 0.3s;
}

.btn-fav:hover {
    color: var(--main-color);
}

.product-card .bi {
    font-size: 20px;
}

.product-card h5 {
    min-height: calc(1.4em * 2);
}

.product-grid .product-card {
    margin-top: 38px;
    padding: 0 20px 19px;
    border-radius: 36px;
}

.product-grid .product-img {
    height: 218px;
    margin: -38px 0 14px;
    border-radius: 26px;
}

.product-grid .product-img img {
    padding: 20px;
}

.product-grid .discount-badge {
    top: 14px;
    left: 10px;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 12px;
}

.product-grid .compare-btn {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 14px;
}

.product-grid .compare-btn .bi {
    font-size: 16px;
}

.product-grid .product-rating {
    gap: 14px;
    margin-bottom: 8px;
    font-size: 13px;
}

.product-grid .product-rating .bi {
    font-size: 14px;
}

.product-grid .product-card h5 {
    min-height: 40px;
    margin: 0 0 26px;
    font-size: 14px;
    line-height: 1.45;
}

.product-grid .product-prices {
    margin-bottom: 16px;
}

.product-grid .old-price {
    font-size: 13px;
}

.product-grid .product-prices .price {
    font-size: 22px;
}

.product-grid .product-actions {
    gap: 8px;
}

.product-grid .btn-cart {
    height: 45px;
    gap: 14px;
    border-radius: 13px;
    font-size: 14px;
}

.product-grid .btn-fav {
    width: 45px;
    height: 45px;
    flex: 0 0 45px;
    border-radius: 13px;
}

.product-grid .product-card .bi {
    font-size: 18px;
}

.product-grid .compare-btn .bi,
.product-grid .product-rating .bi {
    font-size: 15px;
}


.shop-products {
    min-width: 0;
}

.result-count {
    display: none;
    margin: 0 0 14px;
    color: #777;
    font-size: 14px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0 30px;
}

.product-grid .product-card {
    margin-top: 38px;
    padding: 0 20px 19px;
    border-radius: 36px;
}

.product-grid .product-img {
    height: 208px;
    margin: -38px 0 14px;
    border-radius: 26px;
}

.product-grid .product-card[hidden] {
    display: none;
}

/* "18 ayadək faizsiz kredit" dairəsi */

.credit-badge {
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 35% 30%, #f3d6c8, #dfb8a6);
    border-radius: 50%;
    color: #6b3b2a;
    line-height: 1.05;
    text-align: center;
}

.credit-badge b {
    font-size: 7px;
    font-weight: 800;
}

.card-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #555;
    font-size: 11px;
}

.product-card .card-tag .bi {
    color: #2d7be5;
    font-size: 7px;
}

.product-grid .product-rating {
    flex-wrap: wrap;
    gap: 4px 14px;
}

.product-grid .product-card h5 {
    min-height: 40px;
    margin: 0 0 22px;
    font-size: 14px;
}

.product-grid .product-prices {
    gap: 16px;
    margin-bottom: 16px;
}

.product-grid .product-prices .price,
.product-grid .product-prices .price-installment strong {
    font-size: 20px;
}

.product-grid .product-prices .price-installment {
    padding-left: 16px;
}

.product-grid .product-prices .price-installment span,
.product-grid .old-price {
    font-size: 13px;
}

/* Siyahı görünüşü */

.product-grid.list-view {
    grid-template-columns: 1fr;
    row-gap: 18px;
}

.product-grid.list-view .product-card {
    display: grid;
    grid-template-columns: 230px minmax(0, 1fr) 300px;
    grid-template-areas:
        "img rating prices"
        "img title  prices"
        "img .      actions";
    grid-template-rows: auto 1fr auto;
    column-gap: 28px;
    align-items: center;
    margin-top: 0;
    padding: 16px 24px 16px 16px;
    border-radius: 30px;
}

.product-grid.list-view .product-img {
    grid-area: img;
    grid-row: 1 / 4;
    height: 190px;
    margin: 0;
}

.product-grid.list-view .product-rating {
    grid-area: rating;
    align-self: end;
}

.product-grid.list-view .product-card h5 {
    grid-area: title;
    align-self: start;
    margin: 6px 0 0;
    font-size: 16px;
}

.product-grid.list-view .product-prices {
    grid-area: prices;
    align-self: end;
    margin: 0 0 14px;
}

.product-grid.list-view .product-actions {
    grid-area: actions;
}

/* Səhifə dəyişəndə keçid effekti */

.product-grid.page-fade {
    animation: pageFade 0.35s ease;
}

@keyframes pageFade {
    from { opacity: 0.3; transform: translateY(10px); }
    to { opacity: 1; transform: none; }
}

/* Boş nəticə */

.empty-state {
    padding: 60px 20px;
    text-align: center;
    color: #777;
}

.empty-state[hidden] {
    display: none;
}

.empty-state .bi {
    font-size: 40px;
    color: #c4c4c4;
}

.empty-state h4 {
    margin: 12px 0 6px;
    color: #222;
    font-size: 20px;
}

.filters-reset {
    padding: 10px 22px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 14px;
    color: #222;
    font-size: 14px;
    transition: 0.2s;
}

.filters-reset:hover {
    border-color: var(--main-color);
    color: var(--main-color);
}


/* ==============================
   6. SƏHİFƏLƏMƏ, SEO MƏTNİ, SON BAXILANLAR, FOOTER
============================== */


.pagination-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;
    margin: 44px 0 0;
}

.page-btn {
    min-width: 40px;
    height: 40px;
    padding: 0 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #fde9ea;
    border: 0;
    border-radius: 12px;
    color: #b3141a;
    font-size: 14px;
    transition: background 0.2s, color 0.2s;
}

.page-btn:hover:not(:disabled) {
    background: #f9cfd1;
}

.page-btn.active {
    background: var(--main-color);
    color: #fff;
    font-weight: 700;
}

.page-btn:disabled {
    opacity: 0.45;
    cursor: default;
}

.page-dots {
    padding: 0 6px;
    color: #b3141a;
}

.seo-text {
    margin: 64px 0 56px;
}

.seo-text h2 {
    margin: 0 0 14px;
    font-size: 21px;
    font-weight: 700;
}

.seo-text p {
    margin: 0 0 14px;
    color: #333;
    font-size: 14px;
    line-height: 1.65;
}

.seo-text a {
    font-weight: 700;
    text-decoration: underline;
}

.seo-text a:hover {
    color: var(--main-color);
}
.section-label {
    display: block;
    margin-bottom: 4px;
    color: var(--main-color);
    font-size: 15px;
}

.section-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 28px;
}

.similar {
    margin-top: 64px;
    overflow: hidden;
}

.similar-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
}

.similar-head .section-title {
    margin-bottom: 0;
    font-size: 24px;
}

.similar + .similar {
    margin-top: 56px;
}

.similar-nav {
    display: flex;
    gap: 10px;
}

.sim-arrow {
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffe3e4;
    border: 0;
    border-radius: 14px;
    color: var(--main-color);
    font-size: 16px;
    transition: background 0.2s, color 0.2s, opacity 0.2s;
}

.sim-arrow:hover {
    background: var(--main-color);
    color: #fff;
}

.sim-arrow:disabled {
    opacity: 0.45;
    cursor: default;
    background: #ffe3e4;
    color: var(--main-color);
}

.similar-viewport {
    overflow: hidden;
    padding-bottom: 6px;
}

.similar-track {
    --gap: 27px;
    --per-view: 4;
    display: flex;
    gap: var(--gap);
    will-change: transform;
    transition: transform 0.5s ease;
}

.similar-track .product-card {
    flex: 0 0 calc((100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view));
    min-width: 0;
}

.similar-track.dragging {
    transition: none;
}

.similar-track .btn-cart span {
    white-space: nowrap;
}

footer {
    margin-top: 90px;
    padding: 46px 0 32px;
    background: #f4f4f4;
    color: #222;
}

footer .footer-container {
    width: var(--page-w);
    max-width: 1800px;
    margin: 0 auto;
    padding: 0;
}

footer .footer-grid {
    display: grid;
    grid-template-columns: 41.3% 20.4% 20.4% 20.4%;
    align-items: start;
}

footer h5 {
    margin: 0 0 16px;
    color: #111;
    font-size: 15px;
    font-weight: 700;
}

footer .footer-subscribe h5 {
    margin-bottom: 22px;
}

footer ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

footer ul li {
    margin: 0 0 7px;
    line-height: 22px;
}

footer ul a {
    color: #444;
    font-size: 15px;
}

footer a:hover {
    color: var(--main-color);
}

footer .subscribe-form {
    display: flex;
    gap: 10px;
    max-width: 430px;
}

footer .subscribe-form input {
    flex: 1 1 260px;
    min-width: 0;
    height: 50px;
    padding: 0 18px;
    background: #fff;
    border: 0;
    border-radius: 12px;
    color: #222;
    font-size: 14px;
    outline: none;
}

footer .subscribe-form input::placeholder {
    color: #999;
}

footer .subscribe-form input:focus {
    box-shadow: 0 0 0 2px rgba(236, 34, 39, 0.25);
}

footer .subscribe-form button {
    flex: 0 0 auto;
    height: 50px;
    padding: 0 24px;
    background: #ec2227;
    border: 0;
    border-radius: 12px;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    transition: background 0.2s;
}

footer .subscribe-form button:hover {
    background: #c8151a;
}

footer .footer-middle {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 4px;
}

footer .social-title {
    margin: 0 0 20px;
    color: #111;
    font-size: 15px;
    font-weight: 700;
}

footer .social-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px 77px;
}

footer .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 19px;
}

footer .social-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #777;
    font-size: 19px;
    line-height: 1;
    transition: color 0.2s, transform 0.2s;
}

footer .social-links a:hover {
    color: var(--main-color);
    transform: translateY(-2px);
}

footer .footer-phone {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #222;
    font-size: 32px;
    font-weight: 700;
    line-height: 1;
}

footer .footer-phone .bi {
    font-size: 26px;
}

footer .app-links {
    display: flex;
    align-items: center;
    gap: 16px;
}

footer .app-links img {
    width: auto;
    height: 38px;
}

footer .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px 20px;
    margin-top: 35px;
    padding-top: 30px;
    border-top: 1px solid #dcdcdc;
}

footer .footer-bottom p {
    margin: 0;
    color: #111;
    font-size: 16px;
}

footer .footer-bottom strong {
    font-weight: 700;
}

footer .privacy-link {
    color: #111;
    font-size: 16px;
    text-decoration: underline;
}

.chat-fab {
    position: fixed;
    right: 32px;
    bottom: 32px;
    width: 74px;
    height: 74px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--main-color);
    border: 0;
    border-radius: 50%;
    box-shadow: 0 8px 24px rgba(227, 6, 19, 0.4);
    color: #fff;
    font-size: 32px;
    z-index: 1100;
    transition: 0.3s;
}

.chat-fab:hover {
    transform: scale(1.06);
}

.similar-track .product-card {
    margin-top: 38px;
    padding: 0 20px 19px;
    border-radius: 36px;
}

.similar-track .product-img {
    height: 218px;
    margin: -38px 0 14px;
    border-radius: 26px;
}

.similar-track .product-img img {
    padding: 20px;
}

.similar-track .discount-badge {
    top: 14px;
    left: 10px;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 12px;
}

.similar-track .compare-btn {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 14px;
}

.similar-track .compare-btn .bi {
    font-size: 16px;
}

.similar-track .product-rating {
    gap: 14px;
    margin-bottom: 8px;
    font-size: 13px;
}

.similar-track .product-rating .bi {
    font-size: 14px;
}

.similar-track .product-card h5 {
    min-height: 40px;
    margin: 0 0 26px;
    font-size: 14px;
    line-height: 1.45;
}

.similar-track .product-prices {
    margin-bottom: 16px;
}

.similar-track .old-price {
    font-size: 13px;
}

.similar-track .product-prices .price {
    font-size: 22px;
}

.similar-track .product-actions {
    gap: 8px;
}

.similar-track .btn-cart {
    height: 45px;
    gap: 14px;
    border-radius: 13px;
    font-size: 14px;
}

.similar-track .btn-fav {
    width: 45px;
    height: 45px;
    flex: 0 0 45px;
    border-radius: 13px;
}

.similar-track .product-card .bi {
    font-size: 18px;
}

.similar-track .compare-btn .bi,
.similar-track .product-rating .bi {
    font-size: 15px;
}

.sim-arrow {
    width: 45px;
    height: 45px;
    border-radius: 13px;
}

.similar-head {
    margin-bottom: 18px;
}



/* ==============================
   7. TÜND TEMA
============================== */

body.dark .catalog-panel {
    background: #1e1e1e;
}

body.dark .catalog-cats {
    border-right-color: #3a3a3a;
}

body.dark .catalog-cat,
body.dark .catalog-group h6 a {
    color: #eee;
}

body.dark .catalog-cat i {
    color: #bbb;
}

body.dark .catalog-cat:hover,
body.dark .catalog-cat.active {
    background: #2d2d2d;
}

body.dark .catalog-group li a {
    color: #aaa;
}

body.dark {
    --dark-color: #f1f1f1;
    --light-color: #1e1e1e;
    --border-color: #303030;
    --soft-bg: #242424;
    background-color: #121212;
    color: #f1f1f1;
}

body.dark header {
    background: #121212;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08);
}

body.dark header .header-search input,
body.dark header .icon-btn {
    background: #242424;
    color: #eee;
}

body.dark header .header-search input::placeholder {
    color: #888;
}

body.dark header .header-search button {
    color: #aaa;
}

body.dark .dropdown-menu,
body.dark .cart-dropdown {
    background: #1e1e1e;
    border-color: #303030;
    color: #eee;
}

body.dark .cart-dropdown p {
    color: #aaa;
}

body.dark .top-bar {
    background: #b30510;
}

body.dark .main-navigation {
    background: #121212;
}

body.dark .main-navigation .nav {
    background: #242424;
    color: #eee;
}

body.dark .main-navigation a {
    color: #aaa;
}

body.dark .main-navigation a.active,
body.dark .main-navigation .lang-toggle {
    color: #fff;
}

body.dark .main-navigation .nav-links a:not(.dropdown-item):hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.14);
}

body.dark .main-navigation .theme-toggle {
    background: #f1f1f1;
}

body.dark .main-navigation .theme-toggle .theme-knob {
    left: 32px;
    background: #111;
}

body.dark .main-navigation .theme-toggle .bi {
    right: auto;
    left: 10px;
    color: #111;
}

body.dark .dropdown-item,
body.dark .main-navigation .dropdown-item {
    color: #eee;
}

body.dark .dropdown-item:hover,
body.dark .main-navigation .dropdown-item:hover {
    background: #2d2d2d;
}

body.dark .breadcrumbs {
    color: #999;
}

body.dark .breadcrumbs span {
    color: #eee;
}

body.dark .section-title {
    color: #f1f1f1;
}

body.dark .product-rating-row {
    color: #9a9a9a;
}

body.dark .sim-arrow,
body.dark .sim-arrow:disabled {
    background: #3a1a1c;
}

body.dark .sim-arrow:hover {
    background: var(--main-color);
}

body.dark .product-card {
    background: #1e1e1e;
}

body.dark .product-card:hover {
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.5);
}

body.dark .product-img {
    background: #2a2a2a;
    border-color: #3a3a3a;
}

body.dark .compare-btn {
    background: #f1f1f1;
    color: #222;
}

body.dark .product-card h5,
body.dark .product-prices .price,
body.dark .product-prices .price-installment strong {
    color: #f1f1f1;
}

body.dark .product-rating,
body.dark .old-price,
body.dark .product-prices .price-installment span {
    color: #9a9a9a;
}

body.dark .product-prices .price-installment {
    border-left-color: #3a3a3a;
}

body.dark .btn-cart,
body.dark .btn-fav {
    background: #2e2e2e;
    color: #eee;
}

body.dark .btn-cart:hover {
    background: var(--main-color);
    color: #fff;
}

body.dark .btn-fav:hover,
body.dark .btn-fav.active {
    color: var(--main-color);
}

body.dark footer {
    background: #171717;
    color: #eee;
}

body.dark footer h5,
body.dark footer strong,
body.dark footer .social-title,
body.dark footer .footer-phone,
body.dark footer .footer-subscribe h5 {
    color: #fff;
}

body.dark footer p,
body.dark footer a,
body.dark footer ul a {
    color: #aaa;
}

body.dark footer .footer-bottom p,
body.dark footer .privacy-link {
    color: #ddd;
}

body.dark footer a:hover,
body.dark footer .footer-phone:hover {
    color: #fff;
}

body.dark footer .footer-bottom {
    border-color: #333;
}

body.dark footer .subscribe-form input {
    background: #262626;
    color: #fff;
}

body.dark footer .subscribe-form input::placeholder {
    color: #888;
}

body.dark footer .subscribe-form button {
    color: #fff;
}

body.dark footer .social-links a {
    color: #888;
}

body.dark footer .social-links a:hover {
    color: #fff;
}

body.dark header .cart-item-info small {
    color: #aaa;
}

body.dark header .cart-clear {
    background: #3a1a1c;
}

body.dark .toast-msg {
    background: #f1f1f1;
    color: #111;
}

body.dark .search-panel {
    background: #1b1b1b;
}

body.dark .search-left,
body.dark .search-products {
    background: #262626;
}

body.dark .search-panel h6,
body.dark .search-item,
body.dark .search-list a {
    color: #eee;
}

body.dark .search-item {
    background: #1f1f1f;
}

body.dark .search-thumb {
    background: #fff;
    border-color: #333;
}

body.dark .search-list li {
    border-color: #3a3a3a;
}

body.dark .similar-track .compare-btn {
    background: #2a2a2a;
    color: #eee;
}


/* Yeni səhifənin elementləri */

body.dark .shop-title,
body.dark .seo-text h2,
body.dark .filter-block h6,
body.dark .empty-state h4 {
    color: #f1f1f1;
}

body.dark .sort-bar {
    background: #1e1e1e;
    box-shadow: none;
}

body.dark .sort-btn {
    color: #999;
}

body.dark .sort-btn.active {
    color: #fff;
}

body.dark .view-btn {
    background: #1e1e1e;
    box-shadow: none;
    color: #eee;
}

body.dark .view-btn.active {
    background: #333;
}

body.dark .filters {
    background: #1b1b1b;
}

body.dark .filter-cat,
body.dark .filter-list label {
    color: #ddd;
}

body.dark .price-inputs input,
body.dark .filter-search input {
    background: #2a2a2a;
    color: #eee;
}

body.dark .filter-search .bi {
    color: #999;
}

body.dark .filter-list .box {
    background: #2a2a2a;
    border-color: #555;
}

body.dark .filter-list input:checked + .box {
    background: var(--main-color);
    border-color: var(--main-color);
    box-shadow: inset 0 0 0 2px #1b1b1b;
}

body.dark .filter-list input:checked + .swatch {
    box-shadow: 0 0 0 2px #1b1b1b, 0 0 0 4px var(--main-color);
}

body.dark .range-track {
    background: #444;
}

body.dark .range input[type="range"]::-webkit-slider-thumb {
    background: #1b1b1b;
}

body.dark .filters-body {
    scrollbar-color: #888 transparent;
}

body.dark .filters-reset {
    background: #2a2a2a;
    border-color: #444;
    color: #eee;
}

body.dark .page-btn {
    background: #2a1a1b;
    color: #ff8f94;
}

body.dark .page-btn.active {
    background: var(--main-color);
    color: #fff;
}

body.dark .page-dots {
    color: #ff8f94;
}

body.dark .seo-text p,
body.dark .card-tag,
body.dark .result-count {
    color: #bbb;
}

body.dark .more-btn,
body.dark .filter-list em {
    color: #999;
}

body.dark .product-grid .product-card .compare-btn {
    background: #2a2a2a;
    color: #eee;
}


/* ==============================
   8. RESPONSIVE (planşet və mobil)
============================== */

@media (max-width: 991px) {
    .catalog-panel {
            grid-template-columns: 1fr;
            height: auto;
            max-height: calc(100vh - 130px);
            padding: 16px;
            overflow-y: auto;
            border-radius: 22px;
        }

    .catalog-cats {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            padding: 0 0 12px;
            margin-bottom: 14px;
            border-right: 0;
            border-bottom: 1px solid #cfcfcf;
        }

    .catalog-cat {
            flex: 0 0 auto;
            width: auto;
            margin: 0;
            padding: 10px 14px;
            font-size: 14px;
            white-space: nowrap;
        }

    .catalog-subs {
            overflow: visible;
            padding: 0;
        }

    .catalog-sub {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 18px;
        }

    .catalog-promo {
            display: none;
        }

}

@media (max-width: 576px) {
    .catalog-sub {
            grid-template-columns: 1fr;
        }

}

@media (max-width: 991px) {
    :root {
            --page-w: 100%;
            --topbar-h: 28px;
        }

    .top-bar {
            font-size: 14px;
        }

    .page-container {
            padding: 0 15px;
        }

    header .container-fluid {
            padding: 0 15px;
        }

    header .navbar {
            padding: 10px 0;
        }

    header .navbar-brand img {
            width: 46px;
            height: 46px;
        }

    header .navbar-collapse {
            padding: 15px 0 0;
        }

    header .header-actions {
            gap: 12px;
        }

    header .cart-dropdown {
            min-width: 100%;
        }

    .main-navigation .container-fluid {
            padding: 0 15px;
        }

    .main-navigation .nav {
            height: auto;
            padding: 12px 20px;
            border-radius: 22px;
            overflow-x: auto;
            gap: 22px;
        }

    .main-navigation .nav-links {
            gap: 24px;
        }

    .similar-track {
            --gap: 24px;
            --per-view: 3;
        }

    footer {
            margin-top: 60px;
            padding: 40px 0 25px;
        }

    footer .footer-container {
            padding: 0 15px;
        }

    footer .footer-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 30px 20px;
        }

    footer .footer-subscribe {
            grid-column: 1 / -1;
        }

    .chat-fab {
            right: 20px;
            bottom: 20px;
            width: 64px;
            height: 64px;
            font-size: 26px;
        }

}

@media (max-width: 576px) {
    :root {
            --topbar-h: 26px;
        }

    .top-bar {
            padding: 0 8px;
            font-size: 11px;
        }

    .page-container {
            padding: 0 12px;
        }

    header .container-fluid {
            padding: 0 12px;
        }

    header .navbar-brand img {
            width: 42px;
            height: 42px;
        }

    header .btn-catalog,
    header .header-search input {
            height: 48px;
            border-radius: 14px;
        }

    header .icon-btn {
            width: 48px;
            height: 48px;
            border-radius: 14px;
        }

    .main-navigation .container-fluid {
            padding: 0 12px;
        }

    .main-navigation .nav {
            padding: 12px 18px;
            gap: 18px;
        }

    .main-navigation .nav-tools {
            display: none;
        }

    .main-navigation a {
            font-size: 13px;
        }

    .breadcrumbs {
            flex-wrap: nowrap;
            padding: 14px 0 12px;
            overflow-x: auto;
            white-space: nowrap;
            scrollbar-width: none;
        }

    .breadcrumbs::-webkit-scrollbar {
            display: none;
        }

    .similar {
            margin-top: 44px;
        }

    .similar-head .section-title {
            font-size: 20px;
        }

    .sim-arrow {
            width: 40px;
            height: 40px;
        }

    .similar-track {
            --gap: 16px;
            --per-view: 1.25;
        }

    .section-title {
            font-size: 22px;
        }

    footer {
            margin-top: 45px;
            padding: 32px 0 20px;
        }

    footer .footer-container {
            padding: 0 12px;
        }

    footer .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 26px 16px;
        }

    footer .footer-subscribe h5 {
            font-size: 16px;
        }

    footer ul a {
            font-size: 14px;
        }

    footer .subscribe-form {
            max-width: none;
        }

    footer .subscribe-form button {
            padding: 0 20px;
        }

    footer .social-links {
            gap: 14px 20px;
        }

    footer .social-links a {
            font-size: 22px;
        }

    footer .footer-phone {
            font-size: 28px;
        }

    footer .footer-middle {
            flex-direction: column;
            align-items: flex-start;
            margin-top: 26px;
        }

    footer .social-row {
            gap: 14px 40px;
        }

    footer .app-links img {
            height: 36px;
        }

    footer .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            margin-top: 26px;
            padding-top: 22px;
        }

    footer .footer-bottom p,
    footer .privacy-link {
            font-size: 14px;
        }

    .chat-fab {
            right: 14px;
            bottom: 14px;
            width: 56px;
            height: 56px;
            font-size: 22px;
        }

}

@media (max-width: 991.98px) {
    .search-panel {
            left: 0;
            right: 0;
        }

}

@media (max-width: 575.98px) {
    .search-panel {
            grid-template-columns: 1fr;
            padding: 10px;
        }

    .search-banner {
            min-height: 120px;
        }

    .similar-track .product-img {
            height: 200px;
        }

}

@media (min-width: 992px) {
    .main-navigation .nav {
            height: 45px;
            gap: 20px;
            padding: 0 21px 0 14px;
            border-radius: 24px;
        }

    .main-navigation .nav-links {
            gap: 11px;
        }

    .main-navigation .nav-tools {
            gap: 20px;
        }

    .main-navigation a {
            font-size: 14px;
        }

    .main-navigation .nav-links a:not(.dropdown-item) {
            padding: 5px 12px;
        }

    .main-navigation .theme-toggle {
            width: 50px;
            height: 28px;
            border-radius: 16px;
        }

    .main-navigation .theme-toggle .theme-knob {
            top: 3px;
            left: 3px;
            width: 22px;
            height: 22px;
        }

    .main-navigation .theme-toggle .bi {
            right: 8px;
            font-size: 12px;
        }

    body.dark .main-navigation .theme-toggle {
            background: #161616;
        }

    body.dark .main-navigation .theme-toggle .theme-knob {
            left: 25px;
            background: #fff;
        }

    body.dark .main-navigation .theme-toggle .bi {
            left: 8px;
            color: #ddd;
        }

    header .header-actions {
            gap: 15px;
        }

    header .btn-catalog {
            gap: 6px;
            padding: 0 20px;
            font-size: 17.5px;
        }

    header .header-icons {
            gap: 8px;
        }

}


/* ----- Planşet (≤ 991px) ----- */

@media (max-width: 991.98px) {

    .shop-head {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }

    .shop-title {
        font-size: 22px;
    }

    .shop-tools {
        gap: 10px;
    }

    .sort-bar {
        flex: 1;
        min-width: 0;
        overflow-x: auto;
        scrollbar-width: none;
    }

    .sort-bar::-webkit-scrollbar {
        display: none;
    }

    .filter-open {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: 46px;
        padding: 0 18px;
        background: #f6f6f6;
        border: 0;
        border-radius: 16px;
        color: #222;
        font-size: 14px;
        font-weight: 700;
    }

    .shop-layout {
        display: block;
    }

    .result-count {
        display: block;
    }

    /* Filter paneli yandan açılır */

    .filter-backdrop {
        position: fixed;
        inset: 0;
        z-index: 2000;
        display: block;
        background: rgba(0, 0, 0, 0.45);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
    }

    .filter-backdrop.show {
        opacity: 1;
        pointer-events: auto;
    }

    .filters {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 2001;
        width: min(340px, 88vw);
        max-height: none;
        border-radius: 0 28px 28px 0;
        transform: translateX(-102%);
        transition: transform 0.3s ease;
    }

    .filters.open {
        transform: none;
    }

    .filters-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 20px 6px;
        font-size: 18px;
    }

    .filters-close {
        width: 38px;
        height: 38px;
        background: #fff;
        border: 0;
        border-radius: 12px;
    }

    .filters-foot {
        display: flex;
        gap: 10px;
        padding: 14px 20px 18px;
        border-top: 1px solid #e3e3e3;
    }

    .filters-foot .filters-reset {
        flex: 0 0 auto;
    }

    .filters-apply {
        flex: 1;
        height: 44px;
        background: var(--main-color);
        border: 0;
        border-radius: 14px;
        color: #fff;
        font-weight: 700;
    }

    body.no-scroll {
        overflow: hidden;
    }

    .product-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0 20px;
    }

    .product-grid.list-view .product-card {
        grid-template-columns: 180px minmax(0, 1fr);
        grid-template-areas:
            "img rating"
            "img title"
            "img prices"
            "img actions";
        grid-template-rows: auto auto auto auto;
    }

    .product-grid.list-view .product-img {
        grid-row: 1 / 5;
        height: 160px;
    }

    .seo-text {
        margin: 48px 0 40px;
    }
}

/* ----- Mobil (≤ 576px) ----- */

@media (max-width: 575.98px) {

    .shop-title {
        font-size: 20px;
    }

    .view-toggle {
        display: none;
    }

    .shop-head {
        margin-bottom: 18px;
    }

    .product-grid {
        gap: 0 10px;
    }

    .product-grid .product-card {
        margin-top: 30px;
        padding: 0 10px 12px;
        border-radius: 24px;
    }

    .product-grid .product-img {
        height: 140px;
        margin: -30px 0 10px;
        border-radius: 18px;
    }

    .product-grid .product-img img {
        padding: 10px;
    }

    .product-grid .compare-btn {
        top: 6px;
        right: 6px;
        width: 30px;
        height: 30px;
        border-radius: 10px;
    }

    .product-grid .discount-badge {
        top: 8px;
        left: 6px;
        padding: 3px 7px;
        font-size: 10px;
    }

    .credit-badge {
        left: 6px;
        bottom: 6px;
        width: 38px;
        height: 38px;
    }

    .credit-badge b {
        font-size: 5.5px;
    }

    .product-grid .product-rating {
        gap: 2px 8px;
        font-size: 11px;
    }

    .product-grid .product-rating .card-tag {
        display: none;
    }

    .product-grid .product-card h5 {
        min-height: 34px;
        margin-bottom: 12px;
        font-size: 12px;
    }

    .product-grid .product-prices .price-installment {
        display: none;
    }

    .product-grid .product-prices .price {
        font-size: 16px;
    }

    .product-grid .old-price {
        font-size: 11px;
    }

    .product-grid .product-prices {
        margin-bottom: 10px;
    }

    .product-grid .btn-cart {
        height: 36px;
        gap: 6px;
        padding: 0 4px;
        font-size: 11px;
    }

    .product-grid .btn-cart .bi {
        display: none;
    }

    .product-grid .btn-fav {
        width: 36px;
        height: 36px;
        flex: 0 0 36px;
        border-radius: 11px;
    }

    .product-grid .product-actions {
        gap: 6px;
    }

    .pagination-bar {
        gap: 4px;
        margin-top: 30px;
    }

    .page-btn {
        min-width: 34px;
        height: 34px;
        border-radius: 10px;
        font-size: 13px;
    }

    .seo-text h2 {
        font-size: 18px;
    }

    .seo-text p {
        font-size: 13px;
    }
}