import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Protected, RedirectIfAuthenticated } from "@/components"
import {
  AuthLayout,
  DashboardLayout,
  DocumentsPage,
  HomePage,
  ImagesPage,
  LoginPage,
  OthersPage,
  SignupPage,
  VideosPage,
} from "@/pages";

const App = () => {
  return (
    <main className="bg-white">
      <Router>
        <Routes>
          <Route element={<Protected><DashboardLayout /></Protected>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/images" element={<ImagesPage />} />
            <Route path="/others" element={<OthersPage />} />
          </Route>
          <Route element={<RedirectIfAuthenticated><AuthLayout /></RedirectIfAuthenticated>}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
