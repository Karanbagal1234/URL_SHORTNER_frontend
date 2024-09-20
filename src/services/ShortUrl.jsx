import axios from "axios";
import { getLocal } from "../utils/local";

export const ShortUrl = async (URL, BASE_URL) => {

  try {
    const response = await axios.post(
      `${BASE_URL}/id//url`,
      {
        OrignalUrl: URL,
      },
      {
        headers: {
          Authorization: `Bearer ${getLocal("token")}`, 
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.shortUrl;
  } catch (error) {
    console.error("Error shortening URL:", error.message);
    throw error; // Re-throw error to handle in the calling function
  }
};
