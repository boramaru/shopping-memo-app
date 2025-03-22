//変数の定義----------------------------------------------------------------------------------------------------

// 合計金額を管理する変数
let total = 0;

//関数の定義----------------------------------------------------------------------------------------------------

//追加したデータをローカルストレージに保存する関数
const saveData = () => {
    let items = [];
    document.querySelectorAll("#shoppingList li").forEach((li) => {
        let text = li.firstChild.textContent;
        let price = Number(text.split(" - ")[1].replace("円",""));
        items.push({name: text.split(" - ")[0], price: price});
    });
    localStorage.setItem("shoppingData", JSON.stringify(items));
    localStorage.setItem("totalPrice", total);
}

//ページを開いたときにデータを復元する関数
const loadData = () => {
    let savedItems = JSON.parse(localStorage.getItem("shoppingData"));
    let savedTotal = localStorage.getItem("totalPrice");

    if (savedItems) {
        savedItems.forEach((item) => addItemToList(item.name, item.price, false));
    }

    if (savedTotal) {
        total = Number(savedTotal);
        document.getElementById("totalPrice").textContent = total;
    }
}

// **リストにアイテムを追加する関数**
const addItemToList = (name, price, save = true) => {
    let li = document.createElement("li");
    li.innerHTML = `${name} - ${price}円 `;

    document.getElementById("shoppingList").appendChild(li);
}

//商品情報の追加の関数
const itemAdd = () => {
    
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
    
    //個別削除ボタンを追加
    let itemDelete = document.createElement("button");
    itemDelete.textContent = "削除";
    itemDelete.addEventListener("click", () => {
        li.remove();
        total -= itemPrice;
        document.getElementById("totalPrice").textContent = total;
        saveData();
    });

    li.appendChild(itemDelete);

    document.getElementById("shoppingList").appendChild(li);

    //合計金額を更新
    total += itemPrice;
    document.getElementById("totalPrice").textContent = total;
    
    //入力欄をクリア
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
}

//商品情報を一括削除する関数
const itemDelete = () => {
    let list = document.getElementById("shoppingList");

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    total = 0;
    document.getElementById("totalPrice").textContent = total;

    localStorage.removeItem("shoppingData");
    localStorage.removeItem("totalPrice");
}

//保存したデータをCSV出力する関数
const exportCSV = () => {
    let savedItems = JSON.parse(localStorage.getItem("shoppingData"));
    if (!savedItems || savedItems === 0) {
        alert("データがありません！");
        return;
    }

    let csvContent = "商品名,価格\n";
    savedItems.forEach(item => {
        csvContent += `${item.name},${item.price}\n`;
    });

    let blob = new Blob([csvContent], {type: "text/csv"});

    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "shopping-List.csv";
    a.click();
}


//機能の追加----------------------------------------------------------------------------------------------------

//ページを開いたときにデータを復元
window.addEventListener("load", loadData);

//追加ボタンの機能を追加
document.getElementById("addItem").addEventListener("click", itemAdd);

//削除ボタンの機能を追加
document.getElementById("deleteItem").addEventListener("click", itemDelete);

//データを保存
document.getElementById("save").addEventListener("click", saveData);

//出力ボタンの機能を追加
document.getElementById("export").addEventListener("click", exportCSV);