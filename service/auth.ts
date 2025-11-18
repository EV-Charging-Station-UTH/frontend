import { API_ENDPOINTS } from "@/configs/api";
import { instanceAxios } from "@/utils/axios";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await instanceAxios.post(`${API_ENDPOINTS.LOGIN}`, payload);
  console.log("respone login", response);
  return response;
};
