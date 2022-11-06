import React from "react";
import { Routes, Route } from "react-router";

// pages
import DashboardPage from "./Pages/DashboardPage";
import MyCourses from "./Pages/MyCourses";
import LoginPage from "./Pages/LoginPage";
import Setup from "./Pages/Setup";

// -- end pages
import "./index.css";
import "./tailwind.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/MyCourses" element={<MyCourses />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/setup" element={<Setup />} />
    </Routes>
  );
}
