import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import VisitorAccordion from "../components/Accordian";

const API_BASE = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/admin/dashboard", {
          params: { hours: 24 },
        });

        const d = response.data;

        const lineData = (d.eventsPerHour || []).map((e) => ({
          time: new Date(e.ts).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          count: e.count,
        }));

        const barData = (d.topPages || []).map((p) => ({
          page: p._id || "(none)",
          count: p.count,
        }));

        setData({ ...d, lineData, barData });
      } catch (error) {
        const message =
          error.response?.data?.error ||
          error.message ||
          "Failed to load dashboard";
        setErr(message);
      }
    };

    fetchDashboard();
  }, []);

  if (err)
    return (
      <div className="text-red-600 p-4">Please login to view the dashboard</div>
    );
  if (!data) return <div className="text-gray-600 p-4">Loading...</div>;

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-3 text-gray-800">
            Events (last 24h)
          </h4>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart
                data={data.lineData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#E17F31"
                  strokeWidth={2}
                  dot={{ fill: "#E17F31", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-3 text-gray-800">
            Top Pages
          </h4>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart
                data={data.barData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="page"
                  tick={{ fontSize: 12 }}
                  angle={-30}
                  textAnchor="end"
                  height={70}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                  }}
                />
                <Bar dataKey="count" fill="#E17F31" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 text-gray-800">Summary</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium">Total events:</span>{" "}
            <span className="font-mono">{data.totalEvents}</span>
          </div>
          <div>
            <span className="font-medium">Unique visitors:</span>{" "}
            <span className="font-mono">{data.uniqueVisitors}</span>
          </div>
        </div>
        <h5 className="mt-5 font-semibold text-md text-gray-700">
          Recent Visitors
        </h5>
        <ul className="mt-3 space-y-2 text-sm max-h-60 overflow-y-auto">
          {data.recentVisitors.map((v) => (
            <li
              key={v.visitorId}
              className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 rounded"
            >
              <code className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
                {v.visitorId.slice(0, 12)}...
              </code>
              <span className="text-gray-600">
                {new Date(v.lastSeen).toLocaleString()}
              </span>
              <span className="ml-auto font-medium text-orange-600">
                {v.eventsCount} events
              </span>
            </li>
          ))}
        </ul>
        <VisitorAccordion />
      </div>
    </div>
  );
}
