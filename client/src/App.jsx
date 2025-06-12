import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Protected, RedirectIfAuthenticated } from "@/components";
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
  AudioPage,
  SharedPage,
} from "@/pages";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./features/global/globalSlice";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <main className="bg-white">
        <Routes>
          {/* Dashboard Layout */}
          <Route
            element={
              <Protected>
                <DashboardLayout />
              </Protected>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/audios" element={<AudioPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/images" element={<ImagesPage />} />
            <Route path="/shared" element={<SharedPage />} />
            <Route path="/others" element={<OthersPage />} />
          </Route>

            {/* Auth Layout */}

          <Route
            element={
              <RedirectIfAuthenticated>
                <AuthLayout />
              </RedirectIfAuthenticated>
            }
          >
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Routes>
    </main>
  );
};

export default App;
