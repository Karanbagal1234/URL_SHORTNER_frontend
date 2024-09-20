import axios from "axios";
import { getLocal, setLocal } from "../utils/local";

export const SignupUser = async (name, email, password, BASE_URL) => {
  if (!name || !email || !password) {
    alert("Please fill all the fields");
  }
  try {
    const responce = await axios.post(`${BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });
    
    
    setLocal("token", responce.data.token);
    return responce;
  } catch (error) {
    alert(error.massage);
  }
};

export const LoginUser = async (email, password, BASE_URL, err) => {
    if (getLocal('token')) {
      err("Logout first, then try to login.");
      return;
    }
  
    if (!email || !password) {
      alert("Please fill all the fields");
      return; // Prevent further execution if fields are missing
    }
  
    try {

  
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
  console.log(response);
  
      setLocal("token", response.data.token);

      return response
    } catch (error) {
      console.log(error.message); // Corrected the typo here
      err("Login failed. Please check your credentials.");
    }
  };
  