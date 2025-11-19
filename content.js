// ------------------------------------------------------------------------------
// このコードは以下のコードを拡張機能に移植したものです。
// 元のコード：https://greasyfork.org/ja/scripts/479322-Boothの購入履歴から累計散財額を計算するツール
//
// 元の著作権は以下の通りです。
// Copyright (c) 2025 ぜるく
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// ------------------------------------------------------------------------------

// デバッグログを有効にする場合はtrueに設定
const ENABLE_DEBUG_LOG = true;

(() => {
  // ログ収集システム
  class DebugLogger {
    static logs = [];

    static log(...args) {
      const timestamp = new Date().toISOString();
      const message = args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      const logEntry = `[${timestamp}] ${message}`;

      this.logs.push(logEntry);
      console.log(...args);

      // localStorageにも保存（ページ遷移に備える）
      if (ENABLE_DEBUG_LOG) {
        const existingLogs = JSON.parse(localStorage.getItem("booth_debug_logs") || "[]");
        existingLogs.push(logEntry);
        localStorage.setItem("booth_debug_logs", JSON.stringify(existingLogs));
      }
    }

    static clear() {
      this.logs = [];
      localStorage.removeItem("booth_debug_logs");
    }

    static download() {
      const allLogs = JSON.parse(localStorage.getItem("booth_debug_logs") || "[]");
      if (allLogs.length === 0) {
        console.log("ログがありません");
        return;
      }

      const logContent = allLogs.join('\n');
      const blob = new Blob([logContent], { type: "text/plain;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "booth_debug_log.txt");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

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

  function extractItemInfo(itemElement) {
    // itemElement自体が<a>タグの場合と、子要素に<a>タグがある場合の両方に対応
    const link = itemElement.tagName === "A" ? itemElement : itemElement.querySelector("a");
    if (!link || !link.href) {
      if (ENABLE_DEBUG_LOG) {
        DebugLogger.log("extractItemInfo: リンクが見つかりません");
        DebugLogger.log("HTML構造:", itemElement.outerHTML.substring(0, 500));
        DebugLogger.log("クラス名:", itemElement.className);
      }
      return null;
    }
    const idMatch = link.href.match(/\d+$/);
    if (!idMatch) {
      if (ENABLE_DEBUG_LOG) DebugLogger.log("extractItemInfo: IDが見つかりません。URL:", link.href);
      return null;
    }
    const itemId = idMatch[0];
    if (ExclusionManager.isExcluded(itemId)) {
      if (ENABLE_DEBUG_LOG) DebugLogger.log("extractItemInfo: 除外アイテム:", itemId);
      return null;
    }

    // 商品名を取得（新しい構造では.u-tpg-caption1に商品名がある）
    const caption1Element = link.querySelector(".u-tpg-caption1");
    const itemName = caption1Element ? caption1Element.textContent.trim() : "";

    // バリエーションを取得（商品名の中の括弧部分）
    let variation = "";
    if (itemName) {
      const m = itemName.match(/\(([^)]+)\)[^\(]*$/);
      if (m) variation = m[1];
    }

    // 購入日を取得（新しい構造では.u-tpg-caption2に「注文日時: YYYY/MM/DD HH:MM:SS」の形式）
    const caption2Element = link.querySelector(".u-tpg-caption2");
    let purchaseDate = "";
    if (caption2Element) {
      const dateText = caption2Element.textContent.trim();
      // "注文日時: " の部分を除去
      purchaseDate = dateText.replace(/^注文日時:\s*/, "");
    }

    const result = { itemId, orderId: Number(itemId), variation, itemName, purchaseDate };
    if (ENABLE_DEBUG_LOG) {
      DebugLogger.log("extractItemInfo成功:", result);
    }
    return result;
  }

  async function fetchItemPrice(orderId) {
    const url = `https://accounts.booth.pm/orders/${orderId}`;
    if (ENABLE_DEBUG_LOG) DebugLogger.log("fetchItemPrice開始:", orderId, "URL:", url);

    const res = await fetch(url, { credentials: "include" });
    if (ENABLE_DEBUG_LOG) DebugLogger.log("fetchItemPrice レスポンス:", "status:", res.status, "finalUrl:", res.url);

    if (res.status === 404) {
      if (ENABLE_DEBUG_LOG) DebugLogger.log("fetchItemPrice: 404エラー");
      return null;
    }

    const text = await res.text();
    const priceMatch = text.match(/お支払金額.*?¥\s*([\d,]+)/);
    const isGift = text.includes('<b class="u-tpg-title3">ギフト</b>');

    if (!priceMatch) {
      if (ENABLE_DEBUG_LOG) DebugLogger.log("fetchItemPrice: 価格が見つかりません");
      return null;
    }

    const price = Number(priceMatch[1].replace(/,/g, ""));
    const result = { price, isGift, finalUrl: res.url };

    if (ENABLE_DEBUG_LOG) DebugLogger.log("fetchItemPrice成功:", result);
    return result;
  }

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
      btn.style.backgroundColor = ExclusionManager.isExcluded(itemId)
        ? "#e1362e"
        : "#808080";
      btn.style.color = "#fff";
      btn.textContent = ExclusionManager.isExcluded(itemId) ? "除外解除" : "除外する";
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

  function isAggregationMode() {
    return localStorage.getItem("aggregation_mode") === "true";
  }

  function setAggregationMode(flag) {
    localStorage.setItem("aggregation_mode", flag ? "true" : "false");
  }

  function updateProgressDisplay(currentPage, maxPage, processedCount, totalCount) {
    let progressDiv = document.querySelector("#booth-progress-display");
    if (!progressDiv) {
      progressDiv = document.createElement("div");
      progressDiv.id = "booth-progress-display";
      Object.assign(progressDiv.style, {
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "15px 25px",
        fontSize: "16px",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        color: "#fff",
        border: "2px solid #fc4d50",
        borderRadius: "10px",
        zIndex: "10000",
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        fontWeight: "bold",
        textAlign: "center"
      });
      document.body.appendChild(progressDiv);
    }
    progressDiv.textContent = `集計中: ${processedCount} / ${totalCount} (ページ ${currentPage} / ${maxPage})`;
  }

  async function startAggregation() {
    const container = document.querySelector(".l-orders-index");
    if (!container) {
      alert("注文リストが見つかりません");
      if (ENABLE_DEBUG_LOG) DebugLogger.log("エラー: 注文リストが見つかりません");
      return;
    }

    const items = Array.from(container.children)
      .filter((el) => !el.classList.contains("pager"))
      .map(extractItemInfo)
      .filter(Boolean);

    if (ENABLE_DEBUG_LOG) DebugLogger.log("アイテム抽出完了。件数:", items.length);

    // ページ情報を取得
    const pager = container.querySelector(".pager");
    let maxPage = 1;
    if (pager) {
      const pageLinks = pager.querySelectorAll("a");
      for (const link of pageLinks) {
        const pn = Number(new URL(link.href).searchParams.get("page") || "1");
        if (pn > maxPage) maxPage = pn;
      }
    }
    const currentPage = Number(new URL(window.location.href).searchParams.get("page") || "1");

    if (ENABLE_DEBUG_LOG) DebugLogger.log("ページ情報:", { currentPage, maxPage });

    // 1ページあたりの最大アイテム数を取得
    const itemsPerPage = items.length;
    const totalEstimatedItems = maxPage * itemsPerPage;

    let pageTotal = 0;
    const processedOrderUrls = new Set(); // 処理済み注文詳細URLを記録

    // 既存のTSVデータを取得
    const existingData = JSON.parse(localStorage.getItem("booth_tsv_data") || "[]");
    let processedCount = existingData.length;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      try {
        const result = await fetchItemPrice(item.orderId);

        // 実際の注文URLが既に処理済みかチェック(リダイレクト対応)
        if (result && result.finalUrl && processedOrderUrls.has(result.finalUrl)) {
          if (ENABLE_DEBUG_LOG) DebugLogger.log("⏭️ スキップ(既に処理済み):", result.finalUrl);
          await new Promise((r) => setTimeout(r, 150));
          continue;
        }

        // 処理済みとして記録
        if (result && result.finalUrl) {
          processedOrderUrls.add(result.finalUrl);
        }

        if (result && result.price) {
          pageTotal += result.price;

          // TSVデータとして保存
          const tsvEntry = {
            orderId: item.orderId,
            purchaseDate: item.purchaseDate,
            itemName: item.itemName,
            variation: item.variation,
            price: result.price,
            isGift: result.isGift ? "yes" : "no"
          };
          if (ENABLE_DEBUG_LOG) DebugLogger.log("TSVエントリ追加:", tsvEntry);
          existingData.push(tsvEntry);

          processedCount++;
          // 進捗表示を更新
          updateProgressDisplay(currentPage, maxPage, processedCount, totalEstimatedItems);
        } else {
          if (ENABLE_DEBUG_LOG) DebugLogger.log("⚠️ 価格情報なし:", item.orderId);
        }
        await new Promise((r) => setTimeout(r, 150));
      } catch (error) {
        if (ENABLE_DEBUG_LOG) DebugLogger.log("エラー発生:", item.orderId, error);
      }
    }

    // TSVデータを保存
    localStorage.setItem("booth_tsv_data", JSON.stringify(existingData));
    if (ENABLE_DEBUG_LOG) DebugLogger.log("TSVデータ保存完了。件数:", existingData.length, "ページ合計:", pageTotal);

    const url = new URL(window.location.href);
    let totalSoFar = Number(url.searchParams.get("total") || "0");
    totalSoFar += pageTotal;

    url.searchParams.set("total", totalSoFar);

    if (currentPage < maxPage) {
      url.searchParams.set("page", (currentPage + 1).toString());
      window.location.href = url.href;
    } else {
      setAggregationMode(false);

      // 進捗表示を削除
      const progressDiv = document.querySelector("#booth-progress-display");
      if (progressDiv) progressDiv.remove();

      if (ENABLE_DEBUG_LOG) {
        DebugLogger.log("集計完了。合計金額:", totalSoFar);
      }

      // TSVファイルを自動ダウンロード
      generateTSV();

      // デバッグログをダウンロード
      if (ENABLE_DEBUG_LOG) {
        DebugLogger.download();
      }

      const message = getPurchaseMessage(totalSoFar);
      const tweetText = `Boothの合計購入金額は${formatYen(totalSoFar)}でした！\n${message}\n#Booth購入金額集計ツール`;
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      if (confirm(`Boothの合計購入金額は${formatYen(totalSoFar)}でした！\n${message}\nツイートしますか？`)) {
        window.open(tweetUrl, "_blank");
      }
      url.searchParams.delete("total");
      url.searchParams.set("page", "1");
      window.location.href = url.href;
    }
  }

  function generateTSV() {
    const data = JSON.parse(localStorage.getItem("booth_tsv_data") || "[]");
    if (ENABLE_DEBUG_LOG) {
      DebugLogger.log("generateTSV: TSVデータ件数:", data.length);
      DebugLogger.log("generateTSV: TSVデータ:", data);
    }

    if (data.length === 0) {
      if (ENABLE_DEBUG_LOG) DebugLogger.log("generateTSV: TSVデータが空です - ダウンロードをスキップ");
      return;
    }

    // TSVヘッダー
    const header = "orderId\tpurchaseDate\titemName\tvariation\tprice\tisGift\n";

    // TSVデータ行
    const rows = data.map(item =>
      `${item.orderId}\t${item.purchaseDate}\t${item.itemName}\t${item.variation}\t${item.price}\t${item.isGift}`
    ).join("\n");

    const tsvContent = header + rows;
    if (ENABLE_DEBUG_LOG) DebugLogger.log("generateTSV: TSV生成成功、ダウンロード開始");

    // ダウンロード
    const blob = new Blob([tsvContent], { type: "text/tab-separated-values;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "booth_purchases.tsv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (ENABLE_DEBUG_LOG) DebugLogger.log("generateTSV: ダウンロード完了");
  }

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
      // TSVデータをクリア
      localStorage.removeItem("booth_tsv_data");
      // デバッグログをクリア
      if (ENABLE_DEBUG_LOG) {
        DebugLogger.clear();
        DebugLogger.log("集計開始");
      }
      setAggregationMode(true);
      btn.disabled = true;
      btn.textContent = "集計開始…";
      startAggregation();
    });
    document.body.appendChild(btn);
  }

  addExcludeButtons();
  addStartButton();

  if (isAggregationMode()) {
    startAggregation();
  }
})();