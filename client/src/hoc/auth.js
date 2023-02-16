import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function f(SpecificComponent, option, adminRoute = null) {
  // option
  // null(아무나 출입 가능한 페이지)
  // true(로그인한 유저만 출입가능한 페이지)
  // false(로그인한 유저는 출입불가능한 페이지)

  function AuthenticationCheck(props) {
    // request로 백엔드에서 상태 가져오기
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(`${response.payload.name}님 안녕하세요`);
        console.log(response);
      });
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
