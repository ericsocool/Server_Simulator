//import express from "express";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.json());  // ← 這段是關鍵

let lastPostedData: string | null = null; // 全域變數，用來儲存最近的資料

// 📩 POST 接收資料並轉成字串儲存
app.post("/api/verifyTxn", (req, res) => {
  console.log("📥 收到 POST 資料：", req.body);

  // 儲存為 JSON 字串
  lastPostedData = JSON.stringify(req.body);

  res.json({ status: "✅ 資料已儲存", data: lastPostedData });
});

//app.use(bodyParser.json());

// 📤 GET 提供最近的資料
app.get("/api/TxnMsg", (req, res) => {
  if (lastPostedData) {
    const responseData = JSON.parse(lastPostedData); // 先解析
    console.log("📤 App 已經 GET 資料，內容如下：", lastPostedData);  // ✅ 在 Terminal 顯示
    lastPostedData = null; // ✅ 立即清除，確保只可讀一次
    res.json(responseData);
    //res.type("text/plain").send(lastPostedData); // 傳純文字
  } else {
    res.status(404).send("❌ 尚未收到任何資料");
  }
});

// 🚀 啟動 server
app.listen(port, () => {
  console.log(`🚀 模擬 Server 運行中：http://localhost:${port}`);
});