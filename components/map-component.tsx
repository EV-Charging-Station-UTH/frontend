"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { StationItem } from "@/types/station";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const map = useMap();

  useEffect(() => {
    map.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true,
      watch: false,
    });

    map.on("locationfound", (e) => {
      setPosition(e.latlng);
    });

    map.on("locationerror", (err) => {
      console.error("Location error:", err.message);
    });
  }, [map]);

  if (!position) return null;

  return (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

// Custom icons for different station statuses
const createCustomIcon = (status: StationItem["status"]) => {
  const color =
    status === "available"
      ? "#10b981"
      : status === "charging"
      ? "#3b82f6"
      : "#ef4444";

  return new L.DivIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 10px;
      ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `,
    className: "custom-marker",
    iconSize: [30, 30],
    iconAnchor: [12, 12],
  });
};

interface MapComponentProps {
  stations: StationItem[];
  selectedStation: StationItem | null;
  onStationSelect: (station: StationItem) => void;
}

// Component to handle map view changes when selectedStation changes
function MapController({
  selectedStation,
}: {
  selectedStation: StationItem | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedStation) {
      map.setView([selectedStation.latitude, selectedStation.longitude], 15, {
        animate: true,
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [selectedStation, map]);

  return null;
}

export default function MapComponent({
  stations,
  selectedStation,
  onStationSelect,
}: MapComponentProps) {
  const mapRef = useRef<L.Map>(null);

  // Default center (Ho Chi Minh City)
  const defaultCenter: [number, number] = [10.776, 106.7];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController selectedStation={selectedStation} />
      <LocationMarker />
      {stations.map((station) => (
        <Marker
          key={station.station_id}
          position={[station.latitude, station.longitude]}
          icon={createCustomIcon(station.status)}
          eventHandlers={{
            click: () => {
              onStationSelect(station);
            },
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-sm mb-2">{station.name}</h3>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span
                    className={
                      station.status === "available"
                        ? "text-green-600"
                        : station.status === "charging"
                        ? "text-blue-600"
                        : "text-red-600"
                    }
                  >
                    {station.status === "available"
                      ? "Available"
                      : station.status === "charging"
                      ? "Charging"
                      : "Maintenance"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span>
                    {station.min_price}đ - {station.max_price}đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Charger:</span>
                  <span>
                    {station.chargers.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>
                    {station.latitude.toFixed(4)},{" "}
                    {station.longitude.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
