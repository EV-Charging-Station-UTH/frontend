"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Zap, Maximize2 } from "lucide-react";
import dynamic from "next/dynamic";
import { StationItem } from "@/types/station";

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
  const [selectedStation, setSelectedStation] = useState<StationItem | null>(
    null
  );
  const [dataStations, setDataStations] = useState<StationItem[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  useEffect(() => {
    fetch("/mocks/stations.json")
      .then((res) => res.json())
      .then((data) => {
        setDataStations(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Map View</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{dataStations.length} charging stations</span>
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
                {dataStations.map((station) => (
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
                stations={dataStations}
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
