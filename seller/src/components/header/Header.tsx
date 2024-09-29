import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartPng from "../../assets/cart-orange.png";
import profileIcon from "../../assets/user.png";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [logoutVisibility, setLogoutVisibility] = useState<string>("hidden");
  const navigate = useNavigate();

  useEffect(() => {
    const sellerId = localStorage.getItem("sellerId");
    if (sellerId) {
      setLoginStatus(true);
    }
  }, []);

  const handleLogoutVisibility = () => {
    if (logoutVisibility === "hidden") {
      setLogoutVisibility("visible");
    } else if (logoutVisibility === "visible") {
      setLogoutVisibility("hidden");
    }
  };

  const handleLogout = async () => {
    try {
      const sellerId = localStorage.getItem("sellerId");
      const response = await axios.delete(
        `http://localhost:4000/api/v1/s/${sellerId}/logout`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.removeItem("sellerId");
        navigate("/signin");
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(`${error.response.data.message}`);
        } else {
          toast.error("No response received from the server.");
        }
      } else if (error instanceof Error) {
        // Handles non-Axios errors
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="w-full bg-primary text-bg h-20 flex items-center justify-between px-28">
      <div>
        <Link to={`/admin`}>
          <span className="text-2xl font-semibold">
            Welcome to shopi seller central
          </span>
        </Link>
      </div>
      <div className="flex justify-between items-center gap-8">
        <div className="bg-bg p-2 rounded-md flex gap-4 justify-center items-center">
          <div className="border-r border-primary border-dashed w-9 h-6">
            <img src={cartPng} className="w-full h-full pr-2" />
          </div>
          <div className="pr-2 text-primary">0</div>
        </div>
        <div className="w-8 flex justify-center items-center relative">
          <button onClick={handleLogoutVisibility}>
            <img src={profileIcon} />
          </button>
          {loginStatus ? (
            <div
              className={`${logoutVisibility} absolute shadow shadow-primary top-14 hover:bg-bg px-8 py-2 rounded-md`}
            >
              <button onClick={handleLogout} className="text-text">
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
