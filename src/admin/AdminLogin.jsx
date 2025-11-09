import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const API_BASE = "https://webtracker-backend.vercel.app";

  async function submit(e) {
    e.preventDefault();
    setErr(null);

    try {
      const response = await axios.post(`${API_BASE}/admin/login`, {
        username,
        password,
      });

      localStorage.setItem("admin_token", response.data.token);
      navigate("/admin");
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.message ||
        "Login failed. Please try again.";
      setErr(message);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-lg font-medium mb-4">Admin Login</h3>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border px-3 py-2 rounded"
          />
        </div>
        {err && <div className="text-red-600">{err}</div>}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
