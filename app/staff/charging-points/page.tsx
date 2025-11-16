"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockChargingPoints = [
  {
    id: "CP-01",
    status: "in-use",
    power: 60,
    session: "SE-2024-001",
    startedAt: "2024-02-10T10:01",
  },
  {
    id: "CP-02",
    status: "available",
    power: 30,
    session: null,
    startedAt: null,
  },
  { id: "CP-03", status: "offline", power: 30, session: null, startedAt: null },
];

const statusOptions = [
  { value: "all", label: "Tất cả" },
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "in-use", label: "Đang sử dụng" },
];

export default function ChargingPointsPage() {
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredPoints = mockChargingPoints.filter((point) => {
    if (filterStatus === "all") return true;
    return point.status === filterStatus;
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Quản lý Điểm sạc</h1>
      <div className="flex items-center space-x-4">
        <Input placeholder="Tìm kiếm theo ID..." className="max-w-sm" />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Công suất</TableHead>
            <TableHead>Phiên hiện tại</TableHead>
            <TableHead>Bắt đầu</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPoints.map((point) => (
            <TableRow key={point.id}>
              <TableCell>{point.id}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    point.status === "in-use"
                      ? "bg-yellow-100 text-yellow-800"
                      : point.status === "available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {point.status === "in-use"
                    ? "Đang sử dụng"
                    : point.status === "available"
                    ? "Sẵn sàng"
                    : "Offline"}
                </span>
              </TableCell>
              <TableCell>{point.power} kW</TableCell>
              <TableCell>{point.session || "-"}</TableCell>
              <TableCell>
                {point.startedAt
                  ? new Date(point.startedAt).toLocaleString()
                  : "-"}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  {point.status === "in-use" ? "Dừng" : "Bắt đầu"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
