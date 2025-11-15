"use client";

import { useAuth } from "@/hooks/use-auth";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div></div>
        <div className="flex items-center space-x-4">
          <span>{user?.email}</span>
        </div>
      </div>
    </header>
  );
}
