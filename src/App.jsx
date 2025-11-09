import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">ISEC 603</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-sm text-slate-700 hover:underline">
              Home
            </Link>
            <Link
              to="/admin"
              className="text-sm text-slate-700 hover:underline"
            >
              Admin
            </Link>
            <Link
              to="/admin/login"
              className="text-sm text-slate-700 hover:underline"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}
