"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SessionItem } from "@/types/session";

// --- Helpers ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "short",
  });
};

// Helper Function to map status to styling
const getStatusBadge = (status: SessionItem["status"]) => {
  switch (status) {
    case "charging":
      return {
        text: "Charging",
        icon: "lucide:zap", // Icon for charging
        class: "bg-emerald-100 text-emerald-700 border-emerald-200",
        ping: true,
      };
    case "completed":
      return {
        text: "Completed",
        icon: "lucide:check-circle-2", // Icon for completed
        class: "bg-blue-100 text-blue-700 border-blue-200", // Changed completed to blue for distinction
        ping: false,
      };
    case "pending":
      return {
        text: "Pending",
        icon: "lucide:hourglass", // Icon for waiting
        class: "bg-amber-100 text-amber-700 border-amber-200",
        ping: true, // Optional: A slow pulse for pending
      };
    case "stopped":
      return {
        text: "Stopped",
        icon: "lucide:square", // Icon for stopped
        class: "bg-slate-200 text-slate-700 border-slate-300",
        ping: false,
      };
    case "error":
      return {
        text: "Error",
        icon: "lucide:alert-triangle", // Icon for error
        class: "bg-rose-100 text-rose-700 border-rose-200",
        ping: false,
      };
    default:
      return {
        text: "Unknown",
        icon: "lucide:help-circle",
        class: "bg-gray-100 text-gray-500 border-gray-200",
        ping: false,
      };
  }
};

// --- Main Component ---
export default function ChargingSessionsList() {
  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(null);
  const [actionType, setActionType] = useState<"start" | "stop" | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dataSession, setDataSessions] = useState<SessionItem[]>([]);

  const handleAction = (session: SessionItem, type: "start" | "stop") => {
    setSelectedSession(session);
    setActionType(type);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    console.log(
      `${actionType === "start" ? "Starting" : "Stopping"} session ${
        selectedSession?.session_id
      }`
    );
    setIsDialogOpen(false);
    setActionType(null);
    setSelectedSession(null);
  };

  useEffect(() => {
      fetch("/mocks/sessions.json")
        .then((res) => res.json())
        .then((data) => {
          setDataSessions(data);
        })
        .catch((err) => console.error(err));
    }, []);

  return (
    <div className="bg-gray-50/50 p-6 md:p-10 font-sans">
      <div className="mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Charging Sessions
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage ongoing and past charging activities.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Icon icon="lucide:download" className="w-4 h-4" /> Export
          </Button>
        </div>

        {/* Card & Table Section */}
        <Card className="border-none shadow-md overflow-hidden rounded-xl bg-white">
          <CardHeader className="bg-white border-b pb-4">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>
              A list of recent charging sessions and their details.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="w-[250px]">Station Info</TableHead>
                  <TableHead>Charger Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage & Cost</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSession.map((session) => (
                  <TableRow
                    key={session.session_id}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    {/* Station Info */}
                    <TableCell className="align-top py-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                          <Icon icon="lucide:map-pin" width="18" height="18" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {session.station_name}
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {session.station_address}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {session.station_ward}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Charger Details */}
                    <TableCell className="align-top py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon
                            icon="lucide:zap"
                            className="text-amber-500 w-4 h-4"
                          />
                          <span className="font-medium text-gray-700">
                            {session.charger_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Badge
                            variant="outline"
                            className="text-xs font-normal border-gray-300"
                          >
                            {session.connector_type}
                          </Badge>
                          <span>{session.connector_power} kW</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="align-top py-4">
                      {/* Lấy thuộc tính badge dựa trên trạng thái session */}
                      {(() => {
                        const badgeProps = getStatusBadge(session.status);

                        return (
                          <Badge
                            className={`shadow-none gap-1.5 pl-1.5 pr-2.5 py-0.5 font-medium ${badgeProps.class}`}
                            variant="secondary"
                          >
                            {/* Logic cho hiệu ứng Ping (chỉ dùng cho 'charging' và 'pending') */}
                            {badgeProps.ping && (
                              <span className="relative flex h-2 w-2">
                                <span
                                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                                    session.status === "charging"
                                      ? "bg-emerald-400"
                                      : "bg-amber-400"
                                  } opacity-75`}
                                ></span>
                                <span
                                  className={`relative inline-flex rounded-full h-2 w-2 ${
                                    session.status === "charging"
                                      ? "bg-emerald-500"
                                      : "bg-amber-500"
                                  }`}
                                ></span>
                              </span>
                            )}

                            {/* Nếu không có ping, dùng Icon thường */}
                            {!badgeProps.ping && (
                              <Icon
                                icon={badgeProps.icon}
                                className="w-3.5 h-3.5"
                              />
                            )}

                            {badgeProps.text}
                          </Badge>
                        );
                      })()}
                    </TableCell>

                    {/* Usage & Cost */}
                    <TableCell className="align-top py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                          <Icon
                            icon="lucide:battery-charging"
                            className="text-blue-500 w-4 h-4"
                          />
                          {session.energy_used}{" "}
                          <span className="text-xs text-gray-500 font-normal">
                            kWh
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(session.cost)}
                        </div>
                      </div>
                    </TableCell>

                    {/* Time */}
                    <TableCell className="align-top py-4">
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        {session.started_at && (
                          <div className="flex items-center gap-2">
                            <span className="w-12 text-xs text-gray-400 uppercase tracking-wider">
                              Start
                            </span>
                            <span className="font-mono">
                              {formatTime(session.started_at)}
                            </span>
                          </div>
                        )}
                        {session.stopped_at && (
                          <div className="flex items-center gap-2">
                            <span className="w-12 text-xs text-gray-400 uppercase tracking-wider">
                              End
                            </span>
                            <span className="font-mono">
                              {formatTime(session.stopped_at)}
                            </span>
                          </div>
                        )}
                        {/* <div className="text-xs text-gray-400 mt-1 pl-14">
                          {formatDate(session.started_at)}
                        </div> */}
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="align-top py-4 text-right pr-6">
                      <div className="flex justify-end items-center gap-2">
                        {!session.started_at && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            onClick={() => handleAction(session, "start")}
                            title="Start Session"
                          >
                            <Icon icon="lucide:play" className="w-4 h-4" />
                          </Button>
                        )}
                        {!session.stopped_at && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                            onClick={() => handleAction(session, "stop")}
                            title="Stop Session"
                          >
                            <Icon
                              icon="lucide:square"
                              className="w-4 h-4 fill-current"
                            />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Action Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden gap-0 rounded-xl">
          <DialogHeader className="p-6 pb-2 bg-linear-to-r from-gray-50 to-white border-b">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`p-2 rounded-full ${
                  actionType === "start"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-rose-100 text-rose-600"
                }`}
              >
                <Icon
                  icon={
                    actionType === "start" ? "lucide:zap" : "lucide:power-off"
                  }
                  width="20"
                  height="20"
                />
              </div>
              <DialogTitle className="text-xl">
                {actionType === "start"
                  ? "Start Charging Session?"
                  : "Stop Charging Session?"}
              </DialogTitle>
            </div>
            <DialogDescription>
              {actionType === "start"
                ? "This will initiate the charging process on the selected connector."
                : "This will terminate the current session and calculate the final cost."}
            </DialogDescription>
          </DialogHeader>

          {selectedSession && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                    Station
                  </span>
                  <p className="font-medium text-gray-900">
                    {selectedSession.station_name}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                    Charger
                  </span>
                  <p className="font-medium text-gray-900">
                    {selectedSession.charger_name}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                    Connector
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs h-5 px-1.5">
                      {selectedSession.connector_type}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                    Price
                  </span>
                  <p className="font-medium text-gray-900">
                    {formatCurrency(selectedSession.connector_price)} / kWh
                  </p>
                </div>
              </div>

              <Separator />

              <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center text-sm border">
                <span className="text-gray-500">Session ID</span>
                <span className="font-mono text-gray-700 text-xs">
                  {selectedSession.session_id.slice(0, 18)}...
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="p-6 pt-2 bg-gray-50/50">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className={`rounded-lg ${
                actionType === "start"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-rose-600 hover:bg-rose-700"
              }`}
            >
              {actionType === "start" ? "Confirm Start" : "Confirm Stop"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
