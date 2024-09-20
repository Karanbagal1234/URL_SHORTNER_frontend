import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Header from "./components/header";
import AppContext from "./context/Authcontext";
import { Navigate, Route, Routes } from "react-router-dom";
import { getLocal, tokenExist } from "./utils/local";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { hexCode } from "./context/COOLERS";
import NotFound from "./components/404";

const App = () => {
  const [Loader, setLoader] = useState(false);
  let token = getLocal("token");
console.log(import.meta.env.VITE_NODE_ENV == "production" ? import.meta.env.VITE_API: import.meta.env.VITE_LOCAL);

  let data = {
    BASE_URL: import.meta.env.VITE_NODE_ENV == "production" ? import.meta.env.VITE_API: import.meta.env.VITE_LOCAL,
    User: {
      Urls: [],
    },
  };

  useEffect(() => {
    try {
      return async () => {
        setLoader(true);
        let Dataa = await axios.get(`${data.BASE_URL}/`, {
          headers: {
            Authorization: `Bearer ${getLocal("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (Dataa) {
          data.User = Dataa;
        }
        setLoader(false);
      };
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }, []);

  return Loader ? (
    <h1>Loading...</h1>
  ) : (
    <AppContext.Provider value={data}>
      <Header  />
      <main className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </AppContext.Provider>
  );
};

export default App;
