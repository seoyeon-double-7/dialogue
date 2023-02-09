const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

// application/json으로된 데이터를 가져와서 분석할수있게 하는 코드
app.use(express.json());
// application/x-www-form-urlencoded 이런식으로 된 데이터를 가져와서 분석해주는 코드
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.post("/api/users/login", (req, res) => {
  // 요청된 이메일틀 데이터베이스에서 있는지 찾아보기
  // findOne() : 요소를 찾는 몽고DB 메소드
  User.findOne({ email: req.body.email }, (err, user) => {
    // 이메일에 해당하는 유저가 없으면
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      // isMatch가 없으면 비번이 틀림
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      // 비밀번호까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        // status(400)->에러
        if (err) return res.status(400).send(err);

        // 토큰을 저장(쿠키, 로컬스토리지)
        // status(200)->성공
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// 포트에서 앱 실행하게 함
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
