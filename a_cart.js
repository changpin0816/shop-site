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

// 3. 購物車按鈕邏輯
document.getElementById('a_btn').onclick = function() {
    const textVal = document.getElementById('a_text').value;
    const qtyVal = document.getElementById('a_qty').value;
    const selectedColor = document.querySelector('input[name="color_select"]:checked').getAttribute('data-name');
    
    if (textVal.trim() === "") {
        alert("請輸入刻字內容喔！");
    } else if (qtyVal < 1 || qtyVal > 5) {
        alert("購買數量須在 1 到 5 之間喔！");
    } else {
        alert("🎉 已加入購物車！\n顏色：" + selectedColor + "\n數量：" + qtyVal + " 個\n刻字：" + textVal);
    }
};