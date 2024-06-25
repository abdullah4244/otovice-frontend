import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/SignUp";
import Stripe from "./pages/Stripe";
import OrderSummary from "./pages/OrderSummary";
import ExamPartner from "./pages/LearnExamPartner/ExamPartner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SubscriptionForm from "./pages/SubscriptionForm/SubscriptionForm";
import Categories from "./pages/Categories/Categories";
import Topics from "./pages/Topics/Topics";
import Home from "./pages/Home";
import AppHeader from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProfile } from "./servives/auth";
import ForgotPasswordForm from "./pages/ForgotPassword";
import ResetPasswordForm from "./pages/ResetPassword";
import Verify from "./pages/Verify";
import ModeSelector from "./pages/Mode/ModeSelector";
import TestExamPartner from "./pages/TestExamPartner/TestExamPartner";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    const userData = JSON.parse(user);
    if (!userData.user?.planId) {
      return <Navigate to="/buy-subscription" replace />;
    }
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const evaluteUser = async () => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
         await getProfile(userData?.user?._id ?? userData?.user?.id);
      }
    } catch(error) {
      localStorage.removeItem("user");
      localStorage.removeItem("google_user");
    }
  };

  useEffect(() => {
    evaluteUser();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <GoogleOAuthProvider clientId={clientId}>
        <Router>
          <AppHeader />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/reset-password/:id"
                element={<ResetPasswordForm />}
              />
              <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/verify/:token" element={<Verify />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/exam-partner/learn/:category/:topic"
                element={
                  <ProtectedRoute>
                    <ExamPartner />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exam-partner/test/:category/:topic"
                element={
                  <ProtectedRoute>
                    <TestExamPartner />
                  </ProtectedRoute>
                }
              />
              <Route path="/buy-subscription" element={<Stripe />} />
              <Route
                path="/orderSummary/:planKey/:planId"
                element={<OrderSummary />}
              />
              <Route
                path="/subscription/:planId"
                element={<SubscriptionForm />}
              />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/:category/:mode/topics"
                element={
                  <ProtectedRoute>
                    <Topics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/:category/select-mode"
                element={
                  <ProtectedRoute>
                    <ModeSelector />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
