"use client";

import StatCard from "@/components/stat-card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar } from "recharts";

const stats = [
  { title: "Số phiên sạc đang hoạt động", value: 12, change: "+2" },
  { title: "Điểm sạc online/offline", value: "18/2", change: "+1" },
  { title: "Tổng sạc hôm nay", value: 45, change: "+5" },
  { title: "Doanh thu hôm nay", value: "12.5M", change: "+1.2M" },
];

const energyData = [
  { hour: "00:00", kWh: 10 },
  { hour: "01:00", kWh: 12 },
  // ... thêm dữ liệu
];

const revenueData = [
  { day: "Mon", revenue: 1000 },
  { day: "Tue", revenue: 1200 },
  // ... thêm dữ liệu
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Lượng kWh theo giờ</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="kWh" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Doanh thu theo ngày</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
