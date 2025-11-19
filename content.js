(() => {
  const priceMessages = [
    [114381200000000, "日本の国家予算をまかなえていました！"],
    [23760000000000, "イーロン・マスクよりお金持ちでした！"],
    [9000000000000, "映画「シン・ゴジラ」の被害額を一人で賠償できました！"],
    [1652283360000, "Google社の時価総額を超えていました！"],
    [1510160000000, "Discordを買収できていたかもしれません！"],
    [639000000000, "映画「名探偵コナン 紺青の拳」の被害額を一人で賠償できました！"],
    [395000000000, "イージス艦を一隻買えました！"],
    [90804000000, "マインクラフトの金ブロック1個が買えました！"],
    [1250000000, "VRChatの推定時価総額を超えていました！"],
    [1208280000, "GTA5のバイク「オプレッサー MkⅡ」を1台買えました！"],
    [332277000, "GTA5の潜水艦「コサトカ」を1艇買えました！"],
    [143600000, "首都圏の新築マンション1戸が買えました！"],
    [53200000, "USJの夜間貸し切りが出来ました！"],
    [8920000, "新車のベルファイアが買えました！"],
    [7336000, "エンジニアの平均年収を超えていました！"],
    [6116279, "コンビニ1軒の全商品を購入できていました！"],
    [5000000, "クロマグロ1尾が買えました！"],
    [4610000, "サラリーマンの平均年収を超えていました！"],
    [3214800, "東京大学理Ⅲの1年の学費をまかなえていました！"],
    [2750000, "新型プリウスの新車が買えました！"],
    [2361000, "40人規模の結婚式を挙げられました！相手は付属しません"],
    [1548000, "中古車1台が買えました！"],
    [1500000, "ゲーセンのmaimai筐体が買えました！"],
    [1386000, "GeeScorpion(超高級ゲーミングチェア)が買えました！"],
    [1180872, "ペッパーくんが一人買えました！"],
    [1111400, "大学生の1年の生活費をまかなえていました！"],
    [1000000, "ゲーセンの太鼓の達人の新筐体が買えました！"],
    [940000, "ゲーセンにあるポップンミュージックの旧筐体が買えました！"],
    [917540, "鹿児島駅前から札幌駅前までタクシーで移動できました！"],
    [800000, "ゲーセンのダンエボの筐体が買えました！"],
    [770000, "Valorantの全スキンが買えました！"],
    [650000, "ゲーセンのProject Divaの筐体が買えました！"],
    [588450, "超ハイスペックゲーミングパソコンが1台買えました！"],
    [540000, "公園にある4人乗りブランコが買えました！"],
    [493450, "大阪駅前から青森駅までタクシーで移動できました！"],
    [460000, "公園にあるジャングルジムが買えました！"],
    [400000, "Valve Index VRフルキット + ハイスペックゲーミングパソコンが買えました！"],
    [359777, "Nvidia Quadro RTX 5000が買えました！"],
    [319800, "Nvidia RTX 4090が買えました！"],
    [310000, "公園にある2人乗りブランコが買えました！"],
    [280000, "公園にあるうんていが買えました！"],
    [250000, "4泊6日ハワイ旅行ができました！"],
    [219800, "iPhone 15 Pro Max 512GBが買えました！"],
    [198000, "iMacを1台買えました！"],
    [165980, "Valve Index VRフルキットが買えました！"],
    [159800, "iPhone 15 Pro 128GBが買えました！"],
    [150000, "公園にある鉄棒が1欄買えました！"],
    [149000, "キングサイズのベッドが買えました！"],
    [139800, "iPhone 15 Plusが買えました！"],
    [124800, "iPad Pro 11インチが買えました！"],
    [104000, "東京都の平均家賃1ヶ月分をまかなえました！"],
    [96800, "Meta Quest 3 512GBが買えました！"],
    [82800, "Valve Index HMDが買えました！"],
    [74800, "Meta Quest 3 128GBが買えました！"],
    [53900, "Meta Quest 2 256GBが買えました！"],
    [49000, "PICO 4が買えました！"],
    [47300, "Meta Quest 2 128GBが買えました！"],
    [38410, "一人暮らしの一ヶ月の食費がまかなえました！"],
    [32890, "Yogibo Maxが買えました！"],
    [17490, "ジェラピケのパジャマが買えました！"],
    [9100, "カイジの月給を超えていました！"],
    [7900, "ディズニーランドで1日遊べていました！"],
    [5368, "焼肉食べ放題に行けました！"],
    [4748, "モンエナ355mlが24本買えました！"],
    [3905, "ストゼロ500mlが24本買えました！"],
    [1999, "ダイの大冒険が買えました！"],
    [1500, "VRChat Plusに1ヶ月加入できました！"],
    [1280, "YouTube Premiumに1ヶ月加入できました！"],
    [700, "スタバのフラペチーノが飲めました！"],
    [300, "ファミマのアイスコーヒーLサイズが飲めました！"],
    [220, "ファミチキが1個買えました！"],
    [100, "ボールペンが1本買えました！"],
    [20, "もやしが1袋買えました！"],
    [3, "レジ袋Mサイズ1枚しか買えませんでした......"]
  ];

  function formatYen(amount) {
    return amount.toLocaleString() + "円";
  }

  function getPurchaseMessage(total) {
    for (const [threshold, message] of priceMessages) {
      if (total >= threshold) return message;
    }
    return "";
  }

  // ----------------------------
  // ★ 集計データの管理（追加部分）
  // ----------------------------
  const aggregatedItems = JSON.parse(localStorage.getItem("aggregated_items") || "[]");

  function saveAggregatedItems() {
    localStorage.setItem("aggregated_items", JSON.stringify(aggregatedItems));
  }

  function clearAggregatedItems() {
    localStorage.removeItem("aggregated_items");
  }

  // ----------------------------
  // 除外設定
  // ----------------------------
  class ExclusionManager {
    static getExcludedIds() {
      return JSON.parse(localStorage.getItem("exclude_item_ids") || "[]");
    }
    static setExcludedIds(ids) {
      localStorage.setItem("exclude_item_ids", JSON.stringify(ids));
    }
    static isExcluded(id) {
      return this.getExcludedIds().includes(id);
    }
    static toggleExclude(id) {
      const ids = this.getExcludedIds();
      if (ids.includes(id)) {
        this.setExcludedIds(ids.filter((v) => v !== id));
      } else {
        ids.push(id);
        this.setExcludedIds(ids);
      }
    }
  }

  // ----------------------------
  // 商品情報の抽出
  // ----------------------------
  function extractItemInfo(itemElement) {
    if (!itemElement.href) return null;
    const idMatch = itemElement.href.match(/\d+$/);
    if (!idMatch) return null;
    const itemId = idMatch[0];
    if (ExclusionManager.isExcluded(itemId)) return null;

    const caption = itemElement.querySelector(".u-tpg-caption1");
    let variation = null;
    if (caption) {
      const m = caption.innerText.match(/\(([^)]+)\)[^\(]*$/);
      if (m) variation = m[1];
    }
    return { itemId, orderId: Number(itemId), variation };
  }

  // ----------------------------
  // 注文ページから価格取得
  // ----------------------------
  async function fetchItemPrice(orderId) {
    const url = `https://accounts.booth.pm/orders/${orderId}`;
    const res = await fetch(url, { credentials: "include" });
    if (res.status === 404) return null;

    const text = await res.text();
    const priceMatch = text.match(/お支払金額.*?¥\s*([\d,]+)/);
    const isGift = text.includes('<b class="u-tpg-title3">ギフト</b>');

    if (!priceMatch) return null;

    const price = Number(priceMatch[1].replace(/,/g, ""));
    return { price, isGift };
  }

  // ----------------------------
  // 除外ボタンを付与
  // ----------------------------
  function addExcludeButtons() {
    const container = document.querySelector(".l-orders-index");
    if (!container) return;

    for (const item of container.children) {
      if (item.classList.contains("pager")) continue;
      if (item.querySelector(".exclude-btn")) continue;

      const link = item.querySelector("a");
      if (!link) continue;
      const idMatch = link.href.match(/\d+$/);
      if (!idMatch) continue;

      const itemId = idMatch[0];
      const btn = document.createElement("button");
      btn.className = "exclude-btn";
      btn.style.marginLeft = "8px";
      btn.style.fontSize = "10px";
      btn.style.padding = "4px 6px";
      btn.style.cursor = "pointer";

      const excluded = ExclusionManager.isExcluded(itemId);
      btn.style.backgroundColor = excluded ? "#e1362e" : "#808080";
      btn.style.color = "#fff";
      btn.textContent = excluded ? "除外解除" : "除外する";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        ExclusionManager.toggleExclude(itemId);
        window.location.reload();
      });

      if (item.firstChild) {
        item.firstChild.appendChild(btn);
      }
    }
  }

  // ----------------------------
  // 集計モード管理
  // ----------------------------
  function isAggregationMode() {
    return localStorage.getItem("aggregation_mode") === "true";
  }

  function setAggregationMode(flag) {
    localStorage.setItem("aggregation_mode", flag ? "true" : "false");
  }


  // ----------------------------
  // 集計処理本体
  // ----------------------------
  async function startAggregation() {
    const container = document.querySelector(".l-orders-index");
    if (!container) {
      alert("注文リストが見つかりません");
      return;
    }

    // 商品リンク群を取得
    const items = Array.from(container.children)
      .filter((el) => !el.classList.contains("pager"))
      .map(extractItemInfo)
      .filter(Boolean);

    let pageTotal = 0;

    // --- 1件ずつ価格取得 ---
    for (const item of items) {
      try {
        const result = await fetchItemPrice(item.orderId);
        if (result && result.price) {
          pageTotal += result.price;

          // ★ TSV 出力のためにデータを保存
          aggregatedItems.push({
            orderId: item.orderId,
            variation: item.variation || "",
            price: result.price,
            isGift: result.isGift ? "yes" : "no",
          });
          saveAggregatedItems();
        }

        // アクセス負荷対策
        await new Promise((r) => setTimeout(r, 150));
      } catch (e) {
        console.warn("Error fetching price:", e);
      }
    }

    // --- ページを進める ---
    const url = new URL(window.location.href);
    let totalSoFar = Number(url.searchParams.get("total") || "0");
    totalSoFar += pageTotal;

    url.searchParams.set("total", totalSoFar);

    // ページ数を調べる
    const pager = container.querySelector(".pager");
    let maxPage = 1;

    if (pager) {
      const pageLinks = pager.querySelectorAll("a");
      for (const link of pageLinks) {
        const pn = Number(new URL(link.href).searchParams.get("page") || "1");
        if (pn > maxPage) maxPage = pn;
      }
    }

    const currentPage = Number(url.searchParams.get("page") || "1");

    // --- 次のページへ ---
    if (currentPage < maxPage) {
      url.searchParams.set("page", (currentPage + 1).toString());
      window.location.href = url.href;
      return;
    }

    // --- 最終ページ ---
    setAggregationMode(false);

    // ----------------------------
    // ★ TSV を生成してダウンロード
    // ----------------------------
    const header = ["orderId", "variation", "price", "isGift"].join("\t");
    const body = aggregatedItems
      .map((v) => [v.orderId, v.variation, v.price, v.isGift].join("\t"))
      .join("\n");

    const tsv = header + "\n" + body;

    const blob = new Blob([tsv], { type: "text/tab-separated-values" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "booth_purchase_history.tsv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    // 一時データを消す
    clearAggregatedItems();

    // 元々のメッセージ + Tweet 処理
    const message = getPurchaseMessage(totalSoFar);
    const tweetText = `Boothの合計購入金額は${formatYen(totalSoFar)}でした！\n${message}\n#Booth購入金額集計ツール`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    if (confirm(`Boothの合計購入金額は${formatYen(totalSoFar)}でした！\n${message}\nツイートしますか？`)) {
      window.open(tweetUrl, "_blank");
    }

    // URL パラメータ初期化
    url.searchParams.delete("total");
    url.searchParams.set("page", "1");
    window.location.href = url.href;
  }

  // ----------------------------
  // 集計開始ボタンを設置
  // ----------------------------
  function addStartButton() {
    if (document.querySelector("#booth-total-start-btn")) return;

    const btn = document.createElement("button");
    btn.id = "booth-total-start-btn";
    btn.textContent = "金額集計";

    Object.assign(btn.style, {
      position: "fixed",
      bottom: "20px",
      left: "20px",
      padding: "10px 15px",
      fontSize: "14px",
      backgroundColor: "#fc4d50",
      color: "#fff",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      zIndex: "9999",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    });

    btn.addEventListener("click", () => {
      setAggregationMode(true);
      btn.disabled = true;
      btn.textContent = "集計開始…";
      startAggregation();
    });

    document.body.appendChild(btn);
  }

  // ----------------------------
  // 初期処理
  // ----------------------------
  addExcludeButtons();
  addStartButton();

  // 集計モードで再読み込みされた場合、自動再開
  if (isAggregationMode()) {
    startAggregation();
  }
})();
