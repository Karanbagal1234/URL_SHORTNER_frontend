import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/Authcontext";
import { LoginUser } from "../services/auth";
import { tokenExist } from "../utils/local";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const {BASE_URL } = useContext(AppContext);

  if(tokenExist('token')){
    navigate("/")
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
  const responce = await LoginUser(email, password, BASE_URL,setError);
  console.log(responce);
  toast(responce.message)
  } catch (error) {
    console.error("loging error:", error);

    setError("Login failed. Please check your credentials.");
  } finally {
    setLoading(false);
  }

  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} transition duration-300`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
