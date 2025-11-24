"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Zap, Maximize2 } from "lucide-react";
import dynamic from "next/dynamic";
import { StationItem } from "@/types";

// Dynamically import the map component
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] rounded-lg bg-muted flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading map...</p>
      </div>
    </div>
  ),
});

// Cập nhật mockDataStations với trạng thái "charging"
const mockDataStations: StationItem[] = [
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

// Map trạng thái sang badge
const statusMap = {
  available: {
    label: "Available",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  maintenance: {
    label: "Maintenance",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  charging: {
    label: "Charging",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
};

export default function MapPage() {
  const [selectedStation, setSelectedStation] = useState<
    (typeof mockDataStations)[0] | null
  >(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Map View</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{mockDataStations.length} charging stations</span>
          </div>
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            <Maximize2 className="h-4 w-4 mr-2" />
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${isFullscreen ? "" : "lg:grid-cols-4"}`}>
        {!isFullscreen && (
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Stations List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {mockDataStations.map((station) => (
                  <div
                    key={station.station_id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedStation?.station_id === station.station_id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : ""
                    }`}
                    onClick={() => setSelectedStation(station)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{station.name}</h3>
                      {/* <Badge className={statusMap[station.status].color}>
                        {statusMap[station.status].label}
                      </Badge> */}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        <span>{station.total_power} kW</span>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {station.latitude.toFixed(3)},{" "}
                      {station.longitude.toFixed(3)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className={isFullscreen ? "" : "lg:col-span-3"}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Charging Stations Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`rounded-lg overflow-hidden border ${
                isFullscreen ? "h-[calc(100vh-200px)]" : "h-[600px]"
              }`}
            >
              <MapComponent
                stations={mockDataStations}
                selectedStation={selectedStation}
                onStationSelect={setSelectedStation}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
