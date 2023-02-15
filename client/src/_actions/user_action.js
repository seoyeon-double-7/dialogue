import axios from "axios";
import { LOGIN_USER } from "./types";
export function loginUser(dataToSubmit) {
  const request = axios
    // 백엔드 서버 url에 dataToSubmit 데이터 보내주기
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    // redux로 옮겨주기
    type: LOGIN_USER,
    payload: request,
  };
}
