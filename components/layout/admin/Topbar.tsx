import { useUiStore } from "@/stores";
import { Icon } from "@iconify/react";

export default function Topbar() {
  const { toggleSidebar } = useUiStore();

  return (
    <header className="flex items-center justify-between bg-white border-b border-slate-200 p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        {/* Toggle sidebar (mobile/tablet) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          onClick={toggleSidebar}
        >
          <Icon icon="mdi:menu" width={22} />
        </button>

        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-slate-100">
          <Icon icon="mdi:bell" width={22} />
        </button>

        <button className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg">
          <Icon icon="mdi:account-circle" width={26} />
          <span className="text-sm font-medium">Admin</span>
        </button>
      </div>
    </header>
  );
}
