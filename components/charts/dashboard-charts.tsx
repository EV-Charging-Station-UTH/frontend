"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const energyData = [
  { hour: "00:00", kWh: 120 },
  { hour: "02:00", kWh: 90 },
  { hour: "04:00", kWh: 60 },
  { hour: "06:00", kWh: 150 },
  { hour: "08:00", kWh: 300 },
  { hour: "10:00", kWh: 450 },
  { hour: "12:00", kWh: 520 },
  { hour: "14:00", kWh: 480 },
  { hour: "16:00", kWh: 380 },
  { hour: "18:00", kWh: 320 },
  { hour: "20:00", kWh: 280 },
  { hour: "22:00", kWh: 180 },
];

const revenueData = [
  { day: "Mon", revenue: 12000 },
  { day: "Tue", revenue: 19000 },
  { day: "Wed", revenue: 15000 },
  { day: "Thu", revenue: 22000 },
  { day: "Fri", revenue: 28000 },
  { day: "Sat", revenue: 25000 },
  { day: "Sun", revenue: 18000 },
];

const statusData = [
  { name: "Online", value: 18 },
  { name: "In Use", value: 12 },
  { name: "Offline", value: 2 },
];

const COLORS = ["#10b981", "#3b82f6", "#6b7280"];

export default function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Energy Consumption (kWh)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="kWh"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Charging Points Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Daily Revenue (VND)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Session Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Average Session Time</span>
              <span className="font-semibold">45 min</span>
            </div>
            <div className="flex justify-between">
              <span>Peak Usage Hours</span>
              <span className="font-semibold">10:00 - 14:00</span>
            </div>
            <div className="flex justify-between">
              <span>Most Used Station</span>
              <span className="font-semibold">Q1 Central</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate</span>
              <span className="font-semibold text-green-600">98.2%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
