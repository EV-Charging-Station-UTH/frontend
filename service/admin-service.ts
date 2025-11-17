import {
  CreateStationPayload,
  Station,
  User,
  Plan,
  Report,
} from "@/types/admin";
import { unwrapResponse } from "@/utils/apiWrapper";
import { instanceAxios } from "@/utils/axios";

export const AdminService = {
  // Stations
  getStations: async (): Promise<Station[]> => {
    return unwrapResponse<Station[]>(instanceAxios.get("/stations"));
  },
  createStation: async (payload: CreateStationPayload) => {
    return unwrapResponse<{ success: boolean; stationId: number }>(
      instanceAxios.post("/stations", payload)
    );
  },
  updateStation: async (id: number, payload: Partial<CreateStationPayload>) => {
    return unwrapResponse<{ success: boolean }>(
      instanceAxios.put(`/stations/${id}`, payload)
    );
  },
  deleteStation: async (id: number) => {
    return unwrapResponse<{ success: boolean }>(
      instanceAxios.delete(`/stations/${id}`)
    );
  },
  controlStation: async (id: number, action: "on" | "off") => {
    return unwrapResponse<{ success: boolean }>(
      instanceAxios.post(`/stations/${id}/control`, { stationId: id, action })
    );
  },

  // Users
  getUsers: async (): Promise<User[]> =>
    unwrapResponse<User[]>(instanceAxios.get("/users")),
  updateUserRole: async (id: number, role: string) =>
    unwrapResponse<{ success: boolean }>(
      instanceAxios.put(`/users/${id}/role`, { role })
    ),

  // Staff
  createStaff: async (payload: { name: string }) =>
    unwrapResponse<{ success: boolean; staffId: number }>(
      instanceAxios.post("/staff", payload)
    ),

  // Plans
  getPlans: async (): Promise<Plan[]> =>
    unwrapResponse<Plan[]>(instanceAxios.get("/plans")),
  createPlan: async (payload: { name: string; price: number }) =>
    unwrapResponse<{ success: boolean; planId: number }>(
      instanceAxios.post("/plans", payload)
    ),
  updatePlan: async (id: number, payload: any) =>
    unwrapResponse<{ success: boolean }>(
      instanceAxios.put(`/plans/${id}`, payload)
    ),
  deletePlan: async (id: number) =>
    unwrapResponse<{ success: boolean }>(instanceAxios.delete(`/plans/${id}`)),

  // Reports
  getRevenueReport: async (): Promise<Report> =>
    unwrapResponse<Report>(instanceAxios.get("/reports/revenue")),
  getUtilizationReport: async (): Promise<Report> =>
    unwrapResponse<Report>(instanceAxios.get("/reports/utilization")),
  getForecastReport: async (): Promise<Report> =>
    unwrapResponse<Report>(instanceAxios.get("/reports/forecast")),
};
