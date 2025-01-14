// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthLayout, HomePage, LoginPage, SignupPage } from "@/pages";

const App = () => {
  return (
    <main className="bg-white">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
