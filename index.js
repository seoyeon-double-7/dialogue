// express 모듈 가져오기
const express = require("express");

// app 만들기
const app = express();

// 포트 번호 만들기
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://seoyeon:test1234@youtubeclone.lempazh.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err));

// 루트 디렉토리에 'Hello world' 출력
app.get("/", (req, res) => {
  res.send("Hello World! 하이염");
});

// 포트에서 앱 실행하게 함
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
