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

// 2. 購物車驗證與提示
document.getElementById('b_btn').onclick = function() {
    const textVal = document.getElementById('b_text').value;
    const qtyVal = document.getElementById('b_qty').value;
    const selectedStyle = document.querySelector('input[name="color_select"]:checked').getAttribute('data-name');
    
    if (textVal.trim() === "") {
        alert("請輸入要刻製的姓名或文字喔！");
    } else if (qtyVal < 1 || qtyVal > 10) {
        alert("購買數量請在 1 到 10 之間喔！");
    } else {
        alert(
            "🎉 已加入購物車！\n款式：" + selectedStyle + 
            "\n數量：" + qtyVal + " 個\n刻字：" + textVal
        );
    }
};