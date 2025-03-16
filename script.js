// 合計金額を管理する変数
let total = 0;

//追加したデータをローカルストレージに保存する関数
const saveData = () => {
    let items = [];
    document.querySelectorAll("#shoppingList li").forEach(li => {
        let text = li.firstChild.textContent;
        let price = Number(text.split(" - ")[1]);
        items.push({name: text.split(" - ")[0], price: price});
    });
    localStorage.setItem("shoppingData", JSON.stringify(items));
    localStorage.setItem("totalPrice", total);
}

//追加ボタンの機能を追加
document.getElementById("addItem").addEventListener("click", () => {
//商品名と価格を取得
    let itemName = document.getElementById("itemName").value;
    let itemPrice = Math.floor(Number(document.getElementById("itemPrice").value));
//空の入力は追加しない
    if (itemName === "" || itemPrice === "") {
        alert("商品名と価格を入力してください！");
        return;
    }
//マイナス値を許容しない（価格）
    if (itemPrice < 0) {
        alert("価格は１円以上にしてください！");
        return;
    }
//新しいli要素を作成
    let li = document.createElement("li");
    li.innerHTML = `${itemName} - ${itemPrice}円`;
//リストに追加
    document.getElementById("shoppingList").appendChild(li);
//合計金額を更新
    total += itemPrice;
    document.getElementById("totalPrice").textContent = total;
//入力欄をクリア
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
//削除ボタンを作成
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", () => {
        total -= itemPrice;
        document.getElementById("totalPrice").textContent = total;
        li.remove();
    });
//li に削除ボタンを追加
    li.appendChild(deleteButton);
//データを保存
    saveData();
});

