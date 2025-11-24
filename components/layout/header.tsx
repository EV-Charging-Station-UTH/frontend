"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { User } from "lucide-react";

export function Header() {
  // const { user } = useAuth();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center gap-2">
        <h1 className="text-lg font-semibold">Welcome back</h1>
      </div>
      <div className="flex items-center gap-4">
        {true && (
          <div className="relative group">
            <div
              className="inline-flex items-center text-muted-foreground hover:text-purple-600 transition-colors rounded-full"
            >
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            </div>

            {/* Dropdown menu */}
            <div className="absolute right-0 z-10 hidden w-56 space-y-1 bg-white dark:bg-gray-900 py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-sm group-hover:block">
              <div className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                Staff
              </div>
              <div className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                Đăng xuất
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
