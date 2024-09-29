import { Header, Footer } from "../components/index.components";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./spinner.css";
import { useEffect } from "react";

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    const sellerId = localStorage.getItem("sellerId");
    if (!sellerId) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default Root;
