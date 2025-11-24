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
import { StationItem } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";

const dataStations: StationItem[] = [
  {
    station_id: "a8e7b5b0-9cf5-4f24-9bc8-4981da72e662",
    name: "EV Station 01",
    address: "123 Nguyễn Trãi",
    ward: "Phường 5",
    longitude: 106.6893,
    latitude: 10.7769,
    status: "available",
    total_power: 180.0,
    min_power: 7.0,
    max_power: 60.0,
    min_price: 1500,
    max_price: 3500,
  },
  {
    station_id: "b6b333a4-0144-450c-88c6-3d2b42f8fd93",
    name: "EV Station 02",
    address: "45 Điện Biên Phủ",
    ward: "Phường 6",
    longitude: 106.7001,
    latitude: 10.779,
    status: "maintenance",
    total_power: 90.0,
    min_power: 7.0,
    max_power: 30.0,
    min_price: 1200,
    max_price: 3000,
  },
  {
    station_id: "c1f923bb-4f66-42a3-9cd4-99a0e5e303aa",
    name: "EV Station 03",
    address: "200 Lê Lợi",
    ward: "Phường 1",
    longitude: 106.7031,
    latitude: 10.7722,
    status: "charging",
    total_power: 120.0,
    min_power: 7.0,
    max_power: 60.0,
    min_price: 1800,
    max_price: 3200,
  },
  {
    station_id: "d2e5aa92-9621-4fd6-a44d-532f6d90a955",
    name: "EV Station 04",
    address: "80 Võ Thị Sáu",
    ward: "Phường 7",
    longitude: 106.6955,
    latitude: 10.7852,
    status: "available",
    total_power: 150.0,
    min_power: 7.0,
    max_power: 50.0,
    min_price: 1600,
    max_price: 3400,
  },
  {
    station_id: "e9c0f33f-0c7c-4c24-8d75-abc3bdb8e317",
    name: "EV Station 05",
    address: "12 Nguyễn Huệ",
    ward: "Phường Bến Nghé",
    longitude: 106.7059,
    latitude: 10.7729,
    status: "charging",
    total_power: 200.0,
    min_power: 7.0,
    max_power: 60.0,
    min_price: 1700,
    max_price: 3600,
  },
  {
    station_id: "f6b22931-564e-44b8-b15e-6b7f27e3caa2",
    name: "EV Station 06",
    address: "300 Pasteur",
    ward: "Phường 8",
    longitude: 106.6905,
    latitude: 10.7871,
    status: "maintenance",
    total_power: 80.0,
    min_power: 7.0,
    max_power: 22.0,
    min_price: 1300,
    max_price: 2500,
  },
  {
    station_id: "aa871d8f-3b9e-4468-91dc-8d3c7012a3f2",
    name: "EV Station 07",
    address: "50 Trần Hưng Đạo",
    ward: "Phường Cầu Kho",
    longitude: 106.689,
    latitude: 10.758,
    status: "available",
    total_power: 110.0,
    min_power: 7.0,
    max_power: 40.0,
    min_price: 1400,
    max_price: 2900,
  },
  {
    station_id: "cde4a944-6fa9-4df2-a312-2c7aaf6cbf99",
    name: "EV Station 08",
    address: "90 Hoàng Văn Thụ",
    ward: "Phường 4",
    longitude: 106.6623,
    latitude: 10.7973,
    status: "charging",
    total_power: 175.0,
    min_power: 7.0,
    max_power: 60.0,
    min_price: 1500,
    max_price: 3300,
  },
];

const statusOptions = [
  { value: "all", label: "Tất cả" },
  { value: "available", label: "Hoạt động" },
  { value: "charging ", label: "Đang sạc" },
  { value: "maintenance", label: "Bảo trì" },
];

export default function ChargingStationsPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const filteredStations = dataStations.filter((st) => {
    const matchStatus =
      filterStatus === "all" ? true : st.status === filterStatus;
    const matchSearch =
      st.name.toLowerCase().includes(search.toLowerCase()) ||
      st.station_id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Quản lý Trạm sạc</h1>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Tìm kiếm theo tên hoặc ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

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

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên trạm</TableHead>
            <TableHead>Địa chỉ</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Tổng công suất</TableHead>
            <TableHead>Khoảng giá</TableHead>
            <TableHead>Tọa độ</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredStations.map((st) => (
            <TableRow key={st.station_id}>
              <TableCell>{st.name}</TableCell>

              <TableCell>
                {st.address}, {st.ward}
              </TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    st.status === "available"
                      ? "bg-green-100 text-green-800"
                      : st.status === "charging"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {st.status === "available"
                    ? "Hoạt động"
                    : st.status === "charging"
                    ? "Đang sạc"
                    : "Bảo trì"}
                </span>
              </TableCell>

              <TableCell>{st.total_power} kW</TableCell>

              <TableCell>
                {st.min_price.toLocaleString()} –{" "}
                {st.max_price.toLocaleString()} đ/kWh
              </TableCell>

              <TableCell>
                {st.latitude}, {st.longitude}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>
                      <Icon icon="weui:more-filled" width="18" height="18" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Xem</DropdownMenuItem>
                    <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
