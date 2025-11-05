import { BASE_URL } from "@/configs/api";
import axios from "axios";

export const instanceAxios= axios.create({
  baseURL: BASE_URL,
});