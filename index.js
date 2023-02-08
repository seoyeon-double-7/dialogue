// express 모듈 가져오기
const express = require("express");

// app 만들기
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 포트 번호 만들기
const port = 5000;

const bodyParser = require("body-parser");
const { User } = require("./models/User");

// application/json
app.use(express.json());
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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

app.post("/register", (req, res) => {
  // 회원 가입할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어줌

  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// 포트에서 앱 실행하게 함
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
