import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { response } from "express";

function LandingPage() {
  const navigate = useNavigate();

  // 랜딩 페이지 들어오자마자 실행
  // get request를 프론트로 전송
  // useEffect(() => {
  //   // 서버에서 돌아오는 response를 콘솔창에 출력
  //   axios.get("/api/hello").then((response) => {
  //     console.log(response);
  //   });
  // }, []);

  const onClickHandler = () => {
    // 복잡하지 x 기능이므로 axios 바로 써줌
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/login");
      } else {
        alert("fail logout");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
