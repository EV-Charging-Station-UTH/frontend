"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, MoreHorizontal, Download } from "lucide-react";
import { Payment } from "@/types";

const mockPayments: Payment[] = [
  {
    id: "PAY-001",
    sessionId: "SE-2024-001",
    amount: 150000,
    status: "completed",
    createdAt: "2024-02-10T10:45:00Z",
    userId: "USER-001",
    stationId: "ST-01",
  },
  {
    id: "PAY-002",
    sessionId: "SE-2024-002",
    amount: 200000,
    status: "pending",
    createdAt: "2024-02-10T11:30:00Z",
    userId: "USER-002",
    stationId: "ST-02",
  },
  {
    id: "PAY-003",
    sessionId: "SE-2024-003",
    amount: 120000,
    status: "failed",
    createdAt: "2024-02-10T09:15:00Z",
    userId: "USER-003",
    stationId: "ST-01",
  },
  {
    id: "PAY-004",
    sessionId: "SE-2024-004",
    amount: 180000,
    status: "completed",
    createdAt: "2024-02-09T14:20:00Z",
    userId: "USER-004",
    stationId: "ST-03",
  },
  {
    id: "PAY-005",
    sessionId: "SE-2024-005",
    amount: 220000,
    status: "completed",
    createdAt: "2024-02-09T16:45:00Z",
    userId: "USER-005",
    stationId: "ST-02",
  },
];

const statusMap = {
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  pending: {
    label: "Pending",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  failed: {
    label: "Failed",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
};

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = filteredPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <span className="text-lg">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalRevenue / 1000).toFixed(0)}K VND
            </div>
            <p className="text-xs text-muted-foreground">
              From{" "}
              {filteredPayments.filter((p) => p.status === "completed").length}{" "}
              completed payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <span className="text-lg">⏳</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPayments.filter((p) => p.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <span className="text-lg">📈</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Session ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Station</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.sessionId}</TableCell>
                  <TableCell>
                    {(payment.amount / 1000).toFixed(0)}K VND
                  </TableCell>
                  <TableCell>
                    <Badge className={statusMap[payment.status].color}>
                      {statusMap[payment.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{payment.userId}</TableCell>
                  <TableCell>{payment.stationId}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Payment Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Payment ID
                              </label>
                              <p className="font-medium">{payment.id}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Status
                              </label>
                              <div>
                                <Badge
                                  className={statusMap[payment.status].color}
                                >
                                  {statusMap[payment.status].label}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Amount
                              </label>
                              <p className="font-medium">
                                {(payment.amount / 1000).toFixed(0)}K VND
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Date
                              </label>
                              <p className="font-medium">
                                {new Date(payment.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="border-t pt-4">
                            <h4 className="font-medium mb-2">
                              Related Information
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Session ID
                                </label>
                                <p className="font-medium">
                                  {payment.sessionId}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  User ID
                                </label>
                                <p className="font-medium">{payment.userId}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Station
                                </label>
                                <p className="font-medium">
                                  {payment.stationId}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
