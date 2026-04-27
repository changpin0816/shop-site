// 1. 顏色與大圖切換邏輯
const radios = document.querySelectorAll('input[name="color_select"]');
const mainImg = document.getElementById('p_main');
const thumbMain = document.getElementById('thumb_main');
const colorNameDisplay = document.getElementById('color_name_display');

radios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.checked) {
            const imgPath = this.getAttribute('data-img');
            const nameStr = this.getAttribute('data-name');
            mainImg.src = 'images/' + imgPath;
            thumbMain.src = 'images/' + imgPath;
            colorNameDisplay.innerText = nameStr;
            mainImg.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    });
});

// 2. 收藏愛心點擊效果
document.querySelector('.a_wish_btn').onclick = function() {
    this.style.color = (this.style.color === 'rgb(231, 111, 81)') ? '#ccc' : '#e76f51';
};

// 3. 【修正版】購物車按鈕邏輯 - 真正寫入資料到 localStorage
document.getElementById('a_btn').onclick = function() {
    const textVal = document.getElementById('a_text').value.trim();
    const qtyVal = parseInt(document.getElementById('a_qty').value);
    const selectedColor = document.querySelector('input[name="color_select"]:checked').getAttribute('data-name');
    
    // 基本驗證
    if (textVal === "") {
        alert("請輸入刻字內容喔！");
        return; // 停止執行
    } 
    if (qtyVal < 1 || qtyVal > 5) {
        alert("購買數量須在 1 到 5 之間喔！");
        return; // 停止執行
    }

    // --- 開始寫入資料 ---
    
    // A. 建立商品物件
    const productItem = {
        name: "療癒系客製化保溫杯",
        price: 499,
        color: selectedColor,
        engraving: textVal,
        quantity: qtyVal
    };

    // B. 從 localStorage 讀取現有的購物車（若沒有則給空陣列）
    let cart = JSON.parse(localStorage.getItem('shangShuiCart')) || [];

    // C. 將新商品存入陣列
    cart.push(productItem);

    // D. 存回 localStorage
    localStorage.setItem('shangShuiCart', JSON.stringify(cart));

    // E. 彈出成功訊息並跳轉回首頁
    alert("🎉 已成功加入購物車！\n顏色：" + selectedColor + "\n刻字：" + textVal);
    
    // 跳轉回首頁的購物車區塊
    window.location.href = 'index.html#cart_section';
};