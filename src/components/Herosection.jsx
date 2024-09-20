import React, { useState, useContext, useEffect } from "react";
import AppContext from "../context/Authcontext";
import { isValidURL } from "../utils/validation";
import { tokenExist } from "../utils/local";
import { ShortUrl } from "../services/ShortUrl";
import { UserData } from "../utils/UserData";
import { hexCode } from "../context/COOLERS";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroSection = () => {
  const [URL, setURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const { BASE_URL } = useContext(AppContext);
  const navigate = useNavigate();

  const isUserLoggedIn = tokenExist("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserData(BASE_URL);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (isUserLoggedIn) {
      fetchData();
    }
  }, [BASE_URL, isUserLoggedIn]);

  const handleShorten = async () => {
    setError("");

    if (!isUserLoggedIn) {
      toast.error("Please log in to shorten URLs.");
     setTimeout(()=>{navigate("/login")},3000) ;
      return;
    }

    if (!isValidURL(URL)) {
      setError("Invalid URL. Please check the format.");
      return;
    }

    setLoading(true);
    try {
      await ShortUrl(URL, BASE_URL);
      toast.success("URL shortened successfully!");
      setTimeout(()=>{navigate("/")},3000) ;
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Error shortening the URL. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (shortenedURL) => {
    navigator.clipboard.writeText(shortenedURL);
    toast.success("Shortened URL copied to clipboard!");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: `linear-gradient(to right, ${hexCode.primaryBackground}, ${hexCode.secondaryBackground})`,
        padding: "20px",
      }}
    >
      <ToastContainer />
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "2rem",
              color: hexCode.textPrimary,
              margin: "0",
            }}
          >
            Simplify Your Links
          </h1>
          <p style={{ color: hexCode.textSecondary }}>
            Paste your long URL and get a shorter one instantly.
          </p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            value={URL}
            onChange={(e) => setURL(e.target.value.replace(" ", ""))}
            type="text"
            placeholder="Enter your URL here"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: `1px solid ${hexCode.borderColor}`,
              boxSizing: "border-box",
              marginBottom: "10px",
              fontSize: "1rem",
              color: "#fff",
              backgroundColor: hexCode.inputBackground,
            }}
          />
          {error && (
            <p style={{ color: hexCode.errorColor, textAlign: "center" }}>
              {error}
            </p>
          )}
        </div>
        <button
          onClick={handleShorten}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: hexCode.accentColor,
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background-color 0.3s",
          }}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>

        {isUserLoggedIn && (
          <div style={{ marginTop: "20px" }}>
            <h2
              style={{
                fontSize: "1.25rem",
                color: hexCode.textPrimary,
                marginBottom: "10px",
              }}
            >
              Your Shortened URLs
            </h2>
            <ul style={{ listStyle: "none", padding: "0" }}>
              {userData.length > 0 ? (
                userData.map((url, index) => (
                  <React.Fragment key={index}>
                    <li
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        padding: "15px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        border: `1px solid ${hexCode.borderHighlight}`,
                      }}
                    >
                      <div style={{ marginBottom: "10px" }}>
                        <p
                          style={{ color: hexCode.textSecondary, margin: "0" }}
                        >
                          Original URL:
                        </p>
                        <p
                          style={{
                            color: hexCode.textPrimary,
                            margin: "0",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {url.OrignalUrl}
                        </p>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <p
                          style={{ color: hexCode.textSecondary, margin: "0" }}
                        >
                          Shortened URL:
                        </p>
                        <a
                          href={`${import.meta.env.VITE_REDIR }/${url.ShortID}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: hexCode.linkColor,
                            textDecoration: "none",
                          }}
                        >{`${import.meta.env.VITE_REDIR }/${url.ShortID}`}</a>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <p
                          style={{ color: hexCode.textSecondary, margin: "0" }}
                        >
                          Clicks:
                        </p>
                        <p style={{ color: hexCode.textPrimary, margin: "0" }}>
                          {url.clicks.length > 0
                            ? url.clicks.length
                            : "No clicks yet"}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(`${import.meta.env.VITE_REDIR }${url.ShortID}`)
                        }
                        style={{
                          background: "none",
                          border: "none",
                          color: hexCode.linkColor,
                          cursor: "pointer",
                          fontSize: "0.875rem",
                        }}
                      >
                        Copy
                      </button>
                    </li>
                    {index < userData.length - 1 && (
                      <hr
                        style={{
                          border: "none",
                          borderTop: `1px solid ${hexCode.borderColor}`,
                          margin: "10px 0",
                          width: "100%",
                        }}
                      />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <p
                  style={{ color: hexCode.textSecondary, textAlign: "center" }}
                >
                  No URLs created yet.
                </p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
