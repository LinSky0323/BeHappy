# Project - Be-Happy 喜悅網頁製作

> ![r1](/readIMG/R1.png)

> 本專案旨在讓個人工作者，能向客戶展示作品、提供預約服務功能，並且輕鬆的管理訂單。內容包含：
> (已下將個人工作者稱為業者、其客戶稱為顧客)

1. 首頁:

- 形象頁面
- 業者端、顧客端的簡單展示
- 使用者使用指南
- 會員註冊/登入

2. 會員頁面:

- 顧客端:
  - 個人資訊
  - 預約記錄
- 業者端:
  - 個人資料
  - 建立頁面
  - 訂單管理

3. 建立給顧客的網頁:

- 簡介
- 作品展示
- 預約項目、時間、價格

## [Be-Happy 喜悅網頁製作](https://be-happy-nine.vercel.app/)

Test User : oqkqrw8ulg@expressletter.net  
Password : 123456

Credit Card : 4242-4242-4242-4242  
Date : 01/30  
CVV : 123

也可自行註冊帳密使用(註冊需驗證信箱)

## 使用技術

- 網頁以 NEXT.js 框架建立，使用 App Router
- 以 Typescript 編寫、CSS module 編寫樣式
- 使用 React-spring 實現動畫效果、parallax 實現滾動視差
- 透過 use-gesture/react 實現拖曳滑動
- 藉由 types/nodemailer 完成寄送確認信的功能
- 利用 Firebase Authentication 完成會員系統
- 將資料存於 Firebase Firestore Database
- 把上傳之圖片存於 Firebase Storage
- 於訂單的建立及修改時用 Transaction 確保資料一致性
- 上線部屬至 Vercel
- 由 GitHub 進行版本控制

## 網頁功能

### 首頁

- 可看到業者、顧客端的頁面展示，每 5 秒自動轉換，也可手動點擊轉換
  ![r2](/readIMG/R2.gif)
- 使用引導，可用拖拉換頁，也可點擊換頁
  ![r3](/readIMG/R3.gif)
- 可登入進入使用者介面
  ![r4](/readIMG/R4.gif)

### 個人頁面

1. 個人資訊(通用):

- 編輯個人資訊、照片
  ![r5](/readIMG/R5.png)
- 查看用戶等級、修改密碼
  ![r6](/readIMG/R6.png)

2. 我的預約(顧客):

- 查看未來的預約記錄、1 日前可取消預約
- 查詢過往預約記錄
  ![r7](/readIMG/R7.gif)

3. 建立網頁(業者):

- 編輯網頁資訊:
  I.網頁標題、作者
  II.自我介紹
  III.作品展示
  IV.可預約項目
  V.可預約時間
  VI.自訂部分網址
- 取得可用網址
  ![r8](/readIMG/R8.gif)

4. 訂單確認(業者):

- 依日期查詢管理顧客的預約訂單(可同意、拒絕)
- 查看過往預約記錄
  ![r9](/readIMG/R9.gif)

### 向顧客展示之網頁

- 可點擊左右查看不同類別的展示作品
- 點擊圖片可看大圖
  ![r10](/readIMG/R10.gif)
- 選取日期，能看到該日可供預約之時間
- 日期、時間、項目選取完可提交訂單(需要時長不足則無法提交)
- 確認資訊無誤後送出訂單
  ![r11](/readIMG/R11.gif)
