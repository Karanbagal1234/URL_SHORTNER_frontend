import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeLocal, tokenExist } from "../utils/local";
import { hexCode } from "../context/COOLERS";
import { toast } from "react-toastify";



const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    removeLocal("token");
    toast.success("Logout successfully")
    setTimeout(()=>{navigate("/login")},3000) ;
  };

  return (
    <header
      className="w-full"
      style={{ backgroundColor: "rgb(39, 24, 126)", color: hexCode.textPrimary }}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">
          URL Shortener
        </h1>
        <nav className="space-x-4">
          {tokenExist("token") ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
              style={{ backgroundColor: hexCode.errorColor, borderColor: hexCode.borderHighlight }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white font-semibold py-2 px-4 rounded transition duration-300"
                style={{
                  backgroundColor: hexCode.accentColor,
                  borderColor: hexCode.borderHighlight,
                  padding: "0.5rem 1rem",
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white font-semibold py-2 px-4 rounded transition duration-300"
                style={{
                  backgroundColor: hexCode.accentColor,
                  borderColor: hexCode.borderHighlight,
                  padding: "0.5rem 1rem",
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
