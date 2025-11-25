interface Connector {
  connector_id: string;
  power: number;
  price: number;
  status: "available" | "charging" | "maintenance";
  type: string;
}

interface Charger {
  charger_id: string;
  name: string;
  status: "available" | "charging" | "maintenance";
  max_power: number;
  min_power: number;
  max_price: number;
  min_price: number;
  connectors: Connector[];
}

export type StationStatus = "available" | "charging" | "maintenance";

export interface StationItem {
  station_id: string;
  name: string;
  address: string;
  ward: string;
  longitude: number;
  latitude: number;
  status: StationStatus;
  total_power: number;
  min_power: number;
  max_power: number;
  min_price: number;
  max_price: number;
  chargers: Charger[];
}