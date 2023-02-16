import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* auth가 landing을 감싸줌 */}
          <Route exact path="/" element={Auth(LandingPage, null, true)} />
          <Route exact path="/login" element={Auth(LoginPage, false)} />
          <Route exact path="/register" element={Auth(RegisterPage, false)} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
