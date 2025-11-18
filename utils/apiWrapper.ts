import axios, { AxiosError } from "axios";

export type ApiResponse<T = any> = {
  status_code: number;
  data: T;
  message: string;
};

export async function unwrapResponse<T>(promise: Promise<any>): Promise<T> {
  try {
    const res = await promise;
    // API may return { status_code, data, message }
    const payload: ApiResponse<T> = res.data ?? res;
    if (
      payload &&
      (payload.status_code === 400 || payload.status_code >= 400)
    ) {
      const err = new Error(payload.message || "API error");
      throw err;
    }
    return (payload.data ?? payload) as T;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError;
      const msg = (axiosErr.response?.data as any)?.message ?? axiosErr.message;
      throw new Error(msg);
    }
    throw err;
  }
}
