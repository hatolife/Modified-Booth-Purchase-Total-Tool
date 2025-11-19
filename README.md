# Boothの購入履歴から累計散財額を計算するツール (Chrome Extension)

お手軽鬱ボタン。Boothの購入履歴の総額を計算できます。
集計完了後にスプレッドシート等で使用できるTSVファイルがダウンロードされます。

## Original Author
- **Author**: zeruku ([@AmatsukaZeruku](https://x.com/@matsukaZeruku))
- **Original Userscript**: [Greasyfork](https://greasyfork.org/ja/scripts/479322)
- **License**: MIT

このChrome拡張機能は、上記のUserscriptをChrome Extension Manifest V3に変換したものです。

## インストール方法

1. Chrome で `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」をONにする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このフォルダ (`Booth購入金額`) を選択
5. [Booth購入履歴ページ](https://accounts.booth.pm/orders)にアクセスして使用開始

## 機能

### 基本機能
- **ページ計算**: 現在のページの購入履歴の合計金額を計算
- **全ページ計算**: すべてのページを自動で巡回して合計金額を計算
- **累計表示**: これまでの累計金額を表示（ギフト合計も含む）
- **X共有**: 計算結果をXに共有
- **比較メッセージ**: 「もしこの金額があれば○○が買えた」という比較表示

### 除外機能
- 各商品の横に表示される「除外する」ボタンで個別に除外
- `Ctrl + クリック`: すべての商品を一括除外/解除
- `Shift + E + L`: 除外設定を全てリセット

### 追加機能（このChrome Extension版で追加）
- **重複防止**: リダイレクトされた注文の重複計上を自動的に防止
- **ギフト検出**: ギフトとして購入した商品を自動検出・合計を表示

## 使い方

### ボタン配置

画面左下に以下のボタンが表示されます：

**下段（bottom: 10px）**
- **ページ計算** (赤色): 現在のページのみ計算
- **全ページ計算/自動計算停止** (青/ピンク): 全ページを自動で計算、または停止
- **累計金額をリセット** (青色): 累計金額をリセット

**上段（bottom: 60px）**
- **合計金額表示** (グレー): 累計金額を表示（クリックでギフト合計を確認）
- **Xに共有** (X青): 計算結果をXに投稿

### 基本操作

1. [Booth購入履歴ページ](https://accounts.booth.pm/orders)にアクセス
2. **ページ計算**ボタンで現在のページを計算、または**全ページ計算**で全ページを自動計算
3. 計算が完了すると、累計金額が表示されます
4. **合計金額表示**をクリックすると、ギフト合計が確認できます
5. **Xに共有**ボタンで結果をポスト

### 除外操作

- 各商品の「除外する」ボタンをクリックで個別除外
- `Ctrl + 除外ボタン`: すべての商品を一括で除外/解除
- `Shift + E + L`: 除外設定を全てリセット

## 技術的な変更点 (Userscript → Chrome Extension)

### API変換
- `GM_getValue` / `GM_setValue` → `chrome.storage.local` API に変換
- Manifest V3 形式に対応
- 非同期処理を適切に async/await で処理

### 機能追加
- **重複防止機能**: `response.url` を使用してリダイレクト後の最終URLを追跡し、`Set`で重複を防止


## License

MIT License

Original work Copyright (c) zeruku
Modified work Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
