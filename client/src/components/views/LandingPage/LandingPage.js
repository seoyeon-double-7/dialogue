import React, { useEffect } from "react";
import axios from "axios";
// import { response } from "express";

function LandingPage() {
  // 랜딩 페이지 들어오자마자 실행
  // get request를 프론트로 전송
  useEffect(() => {
    // 서버에서 돌아오는 response를 콘솔창에 출력
    axios.get("/api/hello").then((response) => {
      console.log(response);
    });
  }, []);

  return <div>LandingPage</div>;
}

export default LandingPage;
