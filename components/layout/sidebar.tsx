'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  CreditCard,
  MapPin,
  Settings,
  Power,
  LogOut,
  Home
} from 'lucide-react'

const menuItems = [
  { href: '/staff/dashboard', label: 'Dashboard', icon: Home },
  { href: '/staff/charging-points', label: 'Charging Points', icon: Power },
  { href: '/staff/payments', label: 'Payments', icon: CreditCard },
  { href: '/staff/reports', label: 'Reports', icon: BarChart3 },
  { href: '/staff/map', label: 'Map View', icon: MapPin },
  { href: '/staff/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-background border-r">
      <div className="flex h-14 items-center border-b px-4">
        <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          EV Dashboard
        </h1>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}