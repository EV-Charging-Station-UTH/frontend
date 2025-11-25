"use client";

import { useEffect, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { StationItem } from "@/types/station";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const statusOptions = [
  { value: "all", label: "Tất cả" },
  { value: "available", label: "Hoạt động" },
  { value: "charging ", label: "Đang sạc" },
  { value: "maintenance", label: "Bảo trì" },
];

export default function ChargingStationsPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [dataStations, setDataStations] = useState<StationItem[]>([]);
  const [openReport, setOpenReport] = useState(false);
  const [selectedStation, setSelectedStation] = useState<StationItem | null>(
    null
  );
  const router = useRouter()

  const [report, setReport] = useState({
    issueType: "",
    description: "",
    severity: "low",
  });

  const openReportModal = (station: StationItem) => {
    setSelectedStation(station);
    setOpenReport(true);
  };

  const filteredStations = dataStations.filter((st) => {
    const matchStatus =
      filterStatus === "all" ? true : st.status === filterStatus;
    const matchSearch =
      st.name.toLowerCase().includes(search.toLowerCase()) ||
      st.station_id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const submitReport = async () => {
    if (!selectedStation) return;

    const payload = {
      stationId: selectedStation.station_id,
      reportedBy: "00000000-0000-0000-0000-000000000001", // Tạm fix
      issueType: report.issueType,
      description: report.description,
      severity: report.severity,
      reportedAt: new Date(),
    };

    await fetch("/api/maintenance-report", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    setOpenReport(false);
  };

  useEffect(() => {
    fetch("/mocks/stations.json")
      .then((res) => res.json())
      .then((data) => {
        setDataStations(data);
      })
      .catch((err) => console.error(err));
  }, []);

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
            <TableHead>Bộ sạc</TableHead>
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
              <TableCell>{st.chargers.length}</TableCell>
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
                    <DropdownMenuItem onClick={() => router.push(`/staff/charging-points/${st.station_id}`)}>Xem</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openReportModal(st)}>
                      Báo cáo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openReport} onOpenChange={setOpenReport}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Báo cáo trạm sạc</DialogTitle>
            <DialogDescription>
              Gửi báo cáo sự cố cho trạm:{" "}
              <span className="font-medium">{selectedStation?.name}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium">Loại lỗi</label>
              <Input
                placeholder="Ví dụ: cổng sạc lỗi, mất điện..."
                value={report.issueType}
                onChange={(e) =>
                  setReport({ ...report, issueType: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Mô tả</label>
              <textarea
                className="w-full border rounded-md p-2 text-sm"
                rows={4}
                value={report.description}
                onChange={(e) =>
                  setReport({ ...report, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Mức độ vấn đề</label>
              <Select
                value={report.severity}
                onValueChange={(v) => setReport({ ...report, severity: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn mức độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Thấp</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="high">Cao</SelectItem>
                  <SelectItem value="critical">Nguy hiểm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenReport(false)}>
              Hủy
            </Button>
            <Button onClick={submitReport}>Gửi báo cáo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
