// --- Types ---
export type SessionItem = {
  session_id: string;
  connector_id: string;
  user_id: string;
  vehicle_id: string;
  status: "pending" | "charging" | "stopped" | "completed" | "error";
  energy_used: number;
  cost: number;
  started_at: string | null;
  stopped_at: string | null;
  created_at: string;
  station_name: string;
  station_address: string;
  station_ward: string;
  charger_name: string;
  charger_status: string;
  connector_type: string;
  connector_status: string;
  connector_power: number;
  connector_price: number;
};
