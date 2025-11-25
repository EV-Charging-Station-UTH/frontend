"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Icon } from "@iconify/react";

// Sample data
const stationData = {
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
  chargers: [
    {
      charger_id: "dd242ad5-bb40-451b-a42a-d59311778cc8",
      name: "Charger-1",
      status: "available",
      max_power: 2.3,
      min_power: 2.3,
      max_price: 3300,
      min_price: 3300,
      connectors: [
        {
          connector_id: "02a62f11-e210-4ea9-bf4d-74db2d7117ac",
          power: 2.3,
          price: 3300,
          status: "available",
          type: "Scooter-AC",
        },
      ],
    },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "occupied":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "offline":
      return "bg-slate-100 text-slate-800 border-slate-300";
    default:
      return "bg-slate-100 text-slate-800 border-slate-300";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "available":
      return "mdi:check-circle";
    case "occupied":
      return "mdi:alert-circle";
    default:
      return "mdi:close-circle";
  }
};

export default function EVStationDetail() {
  const [selectedCharger, setSelectedCharger] = useState<any>(null);

  return (
    <main className="bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT SIDEBAR — CHARGER LIST */}
        <div className="md:col-span-1 space-y-4">
          {stationData.chargers.map((charger) => (
            <Card
              key={charger.charger_id}
              className="p-4 cursor-pointer border-slate-200 dark:border-slate-700 hover:shadow-md transition"
              onClick={() => setSelectedCharger(charger)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {charger.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {charger.min_power} - {charger.max_power} kW
                  </p>
                </div>

                <Badge className={`${getStatusColor(charger.status)} border`}>
                  <Icon
                    icon={getStatusIcon(charger.status)}
                    width={16}
                    className="mr-1"
                  />
                  {charger.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* RIGHT SIDE — STATION DETAILS */}
        <div className="md:col-span-2">
          <Card className="p-8 shadow-lg border-slate-300 dark:border-slate-800">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              {stationData.name}
            </h1>

            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-4">
              <Icon icon="mdi:map-marker" width={22} />
              {stationData.address}, {stationData.ward}
            </div>

            <Badge
              className={`px-4 py-2 mb-6 text-lg font-semibold border ${getStatusColor(
                stationData.status
              )}`}
            >
              <Icon
                icon={getStatusIcon(stationData.status)}
                width={20}
                className="mr-2"
              />
              {stationData.status}
            </Badge>

            <Separator className="my-6" />

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Power range */}
              <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="mdi:lightning-bolt" width={22} className="text-blue-600" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Power Range
                  </span>
                </div>
                <p className="text-2xl font-bold">
                  {stationData.min_power} - {stationData.max_power} kW
                </p>
              </div>

              {/* Price */}
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="mdi:currency-usd" width={22} className="text-emerald-600" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Pricing
                  </span>
                </div>
                <p className="text-2xl font-bold">
                  ₫{stationData.min_price.toLocaleString()} - ₫
                  {stationData.max_price.toLocaleString()}
                </p>
              </div>

              {/* Coordinates */}
              <div className="p-6 rounded-xl bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="mdi:map" width={22} className="text-purple-600" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Coordinates
                  </span>
                </div>
                <p className="font-mono text-lg">
                  {stationData.latitude.toFixed(4)}° <br />
                  {stationData.longitude.toFixed(4)}°
                </p>
              </div>
            </div>

            <Separator className="my-6" />
          </Card>
        </div>
      </div>

      {/* POPUP — CHARGER DETAILS / CONNECTORS */}
      <Dialog open={!!selectedCharger} onOpenChange={() => setSelectedCharger(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedCharger?.name}</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            {selectedCharger?.min_power} - {selectedCharger?.max_power} kW
          </p>

          <h3 className="font-semibold mb-2">Connectors</h3>

          <div className="space-y-3">
            {selectedCharger?.connectors?.map((c: any) => (
              <Card
                key={c.connector_id}
                className="p-4 border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{c.type}</p>
                    <p className="text-xs text-slate-500">
                      {c.power} kW — ₫{c.price.toLocaleString()}
                    </p>
                  </div>

                  <Badge className={`${getStatusColor(c.status)} border`}>
                    {c.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
