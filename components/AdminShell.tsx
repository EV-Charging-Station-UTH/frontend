"use client";
import React from "react";
import Sidebar from "./layout/admin/Sidebar";
import { QueryClientProvider } from '@tanstack/react-query';
import Topbar from "./layout/admin/Topbar";
import { queryClient } from "@/lib/queryClient";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Topbar />
          <main className="mt-6">{children}</main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
