import axios from "axios";
import { getLocal } from "./local";

export const UserData = async (BASE_URL) => {
  return await axios.get(`${BASE_URL}/id/urls`, {
    headers: {
      Authorization: `Bearer ${getLocal("token")}`,
      "Content-Type": "application/json",
    },
  });
};
