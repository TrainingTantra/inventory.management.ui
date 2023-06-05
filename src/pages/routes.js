import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./main/Home";
import NotFound from "./NotFound";
import LoginPage from "./main/Login";
import SignupPage from "./main/Signup";
import Dashboard from "./internal/Dashboard";
import Components from "./internal/Components";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import User from "./internal/User/User";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/components" element={<Components />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
