const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/key");

// application/json으로된 데이터를 가져와서 분석할수있게 하는 코드
app.use(express.json());
// application/x-www-form-urlencoded 이런식으로 된 데이터를 가져와서 분석해주는 코드
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err));

// 루트 디렉토리에 'Hello world' 출력
app.get("/", (req, res) => {
  res.send("Hello World! 안녕~");
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
