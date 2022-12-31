//#region 變數
const appleData = [
    {
        productName: "IPadPro",
        kv_img: ["./pic/Ipadpro/ipad-pro-model-select-gallery-1-202212.jpg", "./pic/Ipadpro/ipad-pro-model-select-gallery-2-202212.jpg", "./pic/Ipadpro/ipad-pro-finish-select-202212-12-9inch-space-gray.jpg"],
        color: [
            { RGB: "#E3E4E5", url: ["./pic/Ipadpro/ipad-pro-finish-select-202212-12-9inch-silver.jpg", "./pic/Ipadpro/ipad-pro-finish-select-202212-12-9inch-silver_AV1.jpg", "./pic/Ipadpro/ipad-pro-finish-select-202212-12-9inch-silver_AV2.jpg"] },
            { RGB: "#777579", url: ["./pic/Ipadpro/ipad-pro-finish-select-202212-12-9inch-space-gray.jpg", "./pic/Ipadpro/ipad-pro-finish-select-202212-12-9inch-space-gray_AV1.jpg", "./pic/Ipadpro/ipad-pro-finish-select-202212-12-9inch-space-gray_AV2.jpg"] }
        ],
        specification: [
            { storage: "64GB", price: "25000" },
            { storage: "128GB", price: "27000" },
            { storage: "256GB", price: "29000" },
        ]
    },
    {
        productName: "IPhone",
        kv_img: ["./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch.jpg", "./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch_AV1.jpg", "./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch_AV2.jpg", "./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch_AV3.jpg"],
        color: [
            { RGB: "#F2F4F3", url: ["./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-silver.jpg", "./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-silver_AV1.jpg", "./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-silver_AV2.jpg"] },
            { RGB: "#655C6D", url: ["./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-deeppurple.jpg", "./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-deeppurple_AV1.jpg", "./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-deeppurple_AV2.jpg"] },
            { RGB: "#F4E8CE", url: ["./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-gold.jpg", "./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-gold_AV1.jpg", "./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-gold_AV2.jpg"] },
            { RGB: "#52514F", url: ["./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-spaceblack.jpg", "./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-spaceblack_AV1.jpg", "./pic/Iphone/iphone-14-pro-finish-select-202209-6-1inch-spaceblack_AV2.jpg"] },
        ],
        specification: [
            { storage: "64GB", price: "25000" },
            { storage: "128GB", price: "27000" },
            { storage: "256GB", price: "29000" },
        ]
    },
    {
        productName: "IMac",
        kv_img: ["./pic/imac/hero_13__d1tfa5zby7e6_large_2x.jpg", "./pic/imac/hero_14_16__bux8byft94oi_large_2x.jpg"],
        color: [
            { RGB: "#888888", url: ["./pic/imac/mbp-silver-select-202206_GEO_TW.jpg"] },
            { RGB: "#AAAEB1", url: ["./pic/imac/hero_14_16__bux8byft94oi_large_2x.jpg"] }
        ],
        specification: [
            { storage: "256GB", price: "33000" },
            { storage: "512GB", price: "52000" },
            { storage: "1TB", price: "72000" },
        ]
    },
];
let pageData = [];
//#endregion
//#region DOM
const page_Btns = document.querySelectorAll('.page_btn');
const carousel = document.querySelector('.carousel');
const color_Block = document.querySelector('.color-block');
const specification_Block = document.querySelector('.specification-block');
let price, specification, colorBtns, dipslay, spec_btns;
//#endregion
//#region windowonlord
window.onload = () => {
    // UpPage("IPhone");//初始化頁面 顯示IPhone
    page_Btns.forEach(page_btn => page_btn.addEventListener('click', ChangePage));
};
//#endregion
//#region 函式
/**
 * 描述 更換產品頁面
 * @date 2022-12-30
 * @param {any} e
 * @returns {any}
 */
function ChangePage(e) {
    let pageStr = e.target.dataset.page;
    UpPage(pageStr);
}
/**
 * 描述更新頁面
 * @date 2022-12-31
 * @param {any} pageStr 輸入字串做篩選條件
 * @returns {any}
 */
function UpPage(pageStr) {
    pageData = [];
    pageData = appleData.filter(x => x.productName == pageStr);
    addCarousel(pageData[0].kv_img);
    addColorBtn(pageData[0].color);
    addSpecificationBtn(pageData[0].specification);
    getDom();
    dipslay.innerText = spec_btns[0].querySelector('.price').innerText; //顯示第一筆規格價錢
    colorBtns.forEach(colorBtn => colorBtn.addEventListener('click', function (e) {
        let colorRGBstr = e.target.dataset.colorrgb;
        colorChange(colorRGBstr, pageData);
    }));
    console.log(spec_btns);
    spec_btns.forEach(spec_btn => spec_btn.addEventListener('click', dipslay_price));
}

/**
 * 描述 投影片插入畫面
 * @date 2022-12-30
 * @param {any} pageData 
 * @returns {any}
 */
function addCarousel(pageData) {//增加投影片
    carousel.innerHTML = "";
    carousel.innerHTML = `<div class="carousel-inner"></div><button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`;
    const carousel_inner = document.querySelector('.carousel-inner');
    carousel_inner.innerHTML="";
    pageData.forEach(img => {
        let str = `<div class="carousel-item active"><img src="${img}" class="d-block w-100" alt="..."></div>`;
        carousel_inner.innerHTML += str;
    })
}
/**
 * 描述 增加color 按鈕到畫面上
 * @date 2022-12-30
 * @param {any} color 
 * @returns {any}
 */
function addColorBtn(color) {//增加顏色按鈕
    color_Block.innerHTML = '';
    color.forEach(x => {
        let str = `<button style="background-color:${x.RGB}" data-colorRGB="${x.RGB}" class="color m-1"> </button>`
        color_Block.innerHTML += str;
    })
}
/**
 * 描述 增加規格按鈕
 * @date 2022-12-30
 * @param {any} specification
 * @returns {any}
 */
function addSpecificationBtn(specification) {
    specification_Block.innerHTML = '';
    specification.forEach(x => {
        let str = `<button class="specification spec_btn mt-4 d-flex justify-content-around p-3  rounded-pill " col-12 data-nt="${x.price}">
                            <div data-nt="${x.price}" class="capacity">${x.storage}</div>
                            <div data-nt="${x.price}" class="price">NT$${x.price}</div>
                   </button>`;
        specification_Block.innerHTML += str;
    })
}
/**
 * 描述 取得動態DOM
 * @date 2022-12-30
 * @returns {any}
 */
function getDom() {
    price = document.querySelector('.price');
    colorBtns = document.querySelectorAll('.color');
    spec_btns = document.querySelectorAll('.spec_btn');
    dipslay = document.querySelector('.dipslay-price');

}
/**
 * 描述 點擊更換顏色幻燈片
 * @date 2022-12-30
 * @param {any} colorRGB 色碼
 * @param {any} pageData 
 * @returns {any}
 */
function colorChange(colorRGB, pageData) {
    let colorImg = pageData[0].color.filter(x => x.RGB == colorRGB);
    addCarousel(colorImg[0].url);
}
/**
 * 描述 選取規格顯示價錢
 * @date 2022-12-30
 * @param {any} e
 * @returns {any}
 */
function dipslay_price(e) {
    let str = e.target.dataset.nt;
    console.log(str)
    dipslay.innerText = `NT$${str}`;
}
//#endregion