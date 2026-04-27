// 1. 切換色系與對應主圖
const b_styleRadios = document.querySelectorAll('input[name="color_select"]');
const b_mainImg = document.getElementById('p_main');
const b_thumbMain = document.getElementById('thumb_main');
const b_styleNameDisplay = document.getElementById('color_name_display');

b_styleRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            const imgPath = this.getAttribute('data-img');
            const nameStr = this.getAttribute('data-name');
            
            // 更新主圖與縮圖主圖
            b_mainImg.src = 'images/' + imgPath;
            b_thumbMain.src = 'images/' + imgPath;
            b_styleNameDisplay.innerText = nameStr;
            
            // 平滑滾動到上方看新圖
            b_mainImg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

// 2. 【修正版】購物車驗證與資料存檔
document.getElementById('b_btn').onclick = function() {
    const textVal = document.getElementById('b_text').value.trim();
    const qtyVal = parseInt(document.getElementById('b_qty').value);
    const selectedStyle = document.querySelector('input[name="color_select"]:checked').getAttribute('data-name');
    
    // 驗證邏輯
    if (textVal === "") {
        alert("請輸入要刻製的姓名或文字喔！");
        return; 
    } 
    if (qtyVal < 1 || qtyVal > 10) {
        alert("購買數量請在 1 到 10 之間喔！");
        return;
    }

    // --- 開始寫入資料 ---

    // A. 建立商品物件 (名稱請與首頁描述一致，價格設定為 350)
    const productItem = {
        name: "質感手作馬克杯",
        price: 350,
        color: selectedStyle,
        engraving: textVal,
        quantity: qtyVal
    };

    // B. 從 localStorage 讀取現有的購物車 (名稱必須是 'shangShuiCart')
    let cart = JSON.parse(localStorage.getItem('shangShuiCart')) || [];

    // C. 將馬克杯資料推入陣列
    cart.push(productItem);

    // D. 存回 localStorage
    localStorage.setItem('shangShuiCart', JSON.stringify(cart));

    // E. 提示並跳轉
    alert("🎉 已成功加入購物車！\n款式：" + selectedStyle + "\n數量：" + qtyVal + " 個\n刻字：" + textVal);
    
    // 跳轉回首頁查看合併後的購物車
    window.location.href = 'index.html#cart_section';
};