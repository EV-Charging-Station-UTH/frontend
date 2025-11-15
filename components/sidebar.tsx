'use client';

import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/staff/dashboard', label: 'Dashboard' },
  { href: '/staff/charging-points', label: 'Charging Points' },
  { href: '/staff/payments', label: 'Payments' },
  { href: '/staff/reports', label: 'Reports' },
  { href: '/staff/map', label: 'Map View' },
  { href: '/staff/settings', label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md">
      <div className="p-4 text-xl font-semibold">EV Dashboard</div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 ${
              pathname === item.href
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}