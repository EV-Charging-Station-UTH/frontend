"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useUiStore } from "@/stores";

const menu = [
  { href: "/admin", label: "Dashboard", icon: "mdi:view-dashboard" },
  { href: "/admin/stations", label: "Quản lý trạm", icon: "mdi:ev-station" },
  { href: "/admin/users", label: "Người dùng", icon: "mdi:account-group" },
  { href: "/admin/plans", label: "Gói dịch vụ", icon: "mdi:package-variant" },
  { href: "/admin/staff", label: "Nhân viên", icon: "mdi:account-tie" },
  { href: "/admin/reports", label: "Báo cáo", icon: "mdi:chart-line" },
];

export default function Sidebar() {
  const { sidebarOpen } = useUiStore();

  return (
    <aside
      className={cn(
        "bg-white border-r border-slate-200 w-64 p-4 flex flex-col transition-all duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="text-xl font-semibold mb-6">Admin Panel</div>

      <nav className="space-y-1">
        {menu.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-sm font-medium"
          >
            <Icon icon={m.icon} width={20} />
            {m.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
