import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import userProfileImage from "../../assets/user.png";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./accountDashboard.css";

interface ISignupFormData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: number;
  storeName: string;
  panDetails: {
    panNumber: string;
    panHolder: string;
  };
  accountDetails: {
    accountHolder: string;
    accountNumber: number;
    ifscCode: string;
  };
  pickupAddress: [
    {
      pickupStreet: string;
      city: string;
      pinCode: number;
      state: string;
      shippingMethod: string;
      shippingFeePrefrences: string;
    }
  ];
}

function AccountDashboard() {
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [accountDetails, setAccountDetails] = useState<ISignupFormData>({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: 0,
    storeName: "",
    panDetails: {
      panNumber: "",
      panHolder: "",
    },
    accountDetails: {
      accountHolder: "",
      accountNumber: 0,
      ifscCode: "",
    },
    pickupAddress: [
      {
        pickupStreet: "",
        city: "",
        pinCode: 0,
        state: "",
        shippingMethod: "",
        shippingFeePrefrences: "",
      },
    ],
  });
  const { sellerId } = useParams();
  const navigate = useNavigate();

  const fetchAccountDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/s/${sellerId}`,
        {
          withCredentials: true,
        }
      );
      const { data } = response.data;
      setAccountDetails(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(`${error.response.data.message}`);
          if (error.response.status === 403) {
            localStorage.removeItem("sellerId");
            navigate("/signin");
          }
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
  }, []);

  const location = useLocation();
  const urlArr = location.pathname.split("/");

  useEffect(() => {
    urlArr.forEach((str) => {
      if (str === "edit") {
        setIsEditable(false);
      } else {
        setIsEditable(true);
      }
    });
    fetchAccountDetails();
  }, []);

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const sellerId = localStorage.getItem("sellerId");
      const response = await axios.delete(
        `http://localhost:4000/api/v1/s/${sellerId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("sellerId");
        navigate("/signin");
        toast.success(`${response.data.message}`);
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
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target;

    //Handling deeply nested fields
    if(name.includes("accountDetails")){
      console.log("name in accountDetails :", name)
      const field = name.split(".")
      setAccountDetails(prevDetails => {
        const accountDetails = prevDetails.accountDetails

        return {
          ...prevDetails, 
          accountDetails: {
            ...accountDetails,
            [field[1]]: value
          }
        }
      })
    }else if(name.includes("pick")){

    }else{
      setAccountDetails({ ...accountDetails, [name]: value });
    }
  };

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    try {
      console.log("accountDetails :: ", accountDetails);
      const sellerId = localStorage.getItem("sellerId");
      const response = await axios.patch(
        `http://localhost:4000/api/v1/s/${sellerId}`,
        accountDetails,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate(`http://localhost:5173/${sellerId}/profile`);
        toast.success(`${response.data.message}`);
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
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="mx-auto my-8 px-8 py-4 w-10/12 h-fit shadow rounded-md">
      <div className="flex justify-between">
        <div className="w-1/6">
          <img src={userProfileImage} alt="profileImage" className="w-full" />
        </div>
        <div className="w-2/3 flex flex-col gap-8">
          <div>
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">Personal Details</h1>
              {isEditable ? (
                <Link to={`${location.pathname}/edit`}>Edit</Link>
              ) : null}
            </div>
            <div className="flex w-full shadow my-4 p-4 justify-between flex-wrap gap-8 rounded-md">
              <div className="flex flex-col gap-2 w-2/5">
                <label htmlFor="fullName" className="font-semibold text-text">
                  Full name
                </label>
                <input
                  value={accountDetails.fullName}
                  id="fullName"
                  type="text"
                  name="fullName"
                  disabled={isEditable}
                  onChange={handleOnChange}
                  className="font-thin w-full bg-white"
                />
              </div>
              <div className="flex flex-col gap-2 w-2/5">
                <label htmlFor="email" className="font-semibold text-text">
                  Email
                </label>
                <input
                  value={accountDetails.email}
                  id="email"
                  type="text"
                  name="email"
                  disabled={isEditable}
                  onChange={handleOnChange}
                  className="font-thin w-full bg-white"
                />
              </div>
              <div className="flex flex-col gap-2 w-2/5">
                <label
                  htmlFor="phoneNumber"
                  className="font-semibold text-text"
                >
                  Phone number
                </label>
                <input
                  value={accountDetails.phoneNumber}
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  disabled={isEditable}
                  onChange={handleOnChange}
                  className="font-thin w-full bg-white"
                />
              </div>
              <div className="flex flex-col gap-2 w-2/5">
                <label htmlFor="storeName" className="font-semibold text-text">
                  Store name
                </label>
                <input
                  value={accountDetails.storeName}
                  id="storeName"
                  type="text"
                  name="storeName"
                  disabled={isEditable}
                  onChange={handleOnChange}
                  className="font-thin w-full bg-white"
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold">PAN Details</h1>
            <div className="flex w-full shadow my-4 p-4 justify-between flex-wrap gap-8 rounded-md">
              <div className="flex flex-col gap-2 w-2/5">
                <label htmlFor="panNumber" className="font-semibold text-text">
                  PAN Number
                </label>
                <input
                  value={accountDetails.panDetails.panNumber}
                  id="panNumber"
                  type="text"
                  name="panNumber"
                  disabled = {true}
                  className="font-thin w-full bg-white"
                />
              </div>
              <div className="flex flex-col gap-2 w-2/5">
                <label htmlFor="panHolder" className="font-semibold text-text">
                  PAN Holder
                </label>
                <input
                  value={accountDetails.panDetails.panHolder}
                  id="panHolder"
                  type="text"
                  name="panHolder"
                  disabled = {true}
                  className="font-thin w-full bg-white"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">Account Details</h1>
            </div>
            <div className="flex w-full shadow my-4 p-4 justify-between flex-wrap gap-8 rounded-md">
              <div className="flex flex-col gap-2 w-2/5">
                <label
                  htmlFor="accountHolder"
                  className="font-semibold text-text"
                >
                  Account holder
                </label>
                <input
                  value={accountDetails.accountDetails.accountHolder}
                  id="accountHolder"
                  type="text"
                  name="accountHolder"
                  disabled={isEditable}
                  onChange={handleOnChange}
                  className="font-thin w-full bg-white"
                />
              </div>
              <div className="flex flex-col gap-2 w-2/5">
                <label
                  htmlFor="accountNumber"
                  className="font-semibold text-text"
                >
                  Account number
                </label>
                <input
                  value={accountDetails.accountDetails.accountNumber}
                  id="accountNumber"
                  type="text"
                  name="accountNumber"
                  disabled={isEditable}
                  onChange={handleOnChange}
                  className="font-thin w-full bg-white"
                />
              </div>
              <div className="flex flex-col gap-2 w-2/5">
                <label htmlFor="ifscCode" className="font-semibold text-text">
                  IFSC Code
                </label>
                <input
                  value={accountDetails.accountDetails.ifscCode}
                  id="ifscCode"
                  type="text"
                  name="ifscCode"
                  disabled={isEditable}
                  onChange={handleOnChange}
                  className="font-thin w-full bg-white"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">Pickup addresses</h1>
            </div>
            {accountDetails.pickupAddress.map((pickupDetails, index) => (
              <div
                className="flex w-full shadow my-4 p-4 justify-between flex-wrap gap-4 rounded-md"
                key={index}
              >
                <div className="flex flex-col gap-2 w-2/5">
                  <label
                    htmlFor="pickupStreet"
                    className="font-semibold text-text"
                  >
                    Street
                  </label>
                  <input
                    value={pickupDetails.pickupStreet}
                    id="pickupStreet"
                    type="text"
                    name="pickupStreet"
                    disabled={isEditable}
                    onChange={handleOnChange}
                    className="font-thin w-full bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2 w-2/5">
                  <label htmlFor="city" className="font-semibold text-text">
                    City
                  </label>
                  <input
                    value={pickupDetails.city}
                    id="city"
                    type="text"
                    name="city"
                    disabled={isEditable}
                    onChange={handleOnChange}
                    className="font-thin w-full bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2 w-2/5">
                  <label htmlFor="pinCode" className="font-semibold text-text">
                    PIN Code
                  </label>
                  <input
                    value={pickupDetails.pinCode}
                    id="pinCode"
                    type="text"
                    name="pinCode"
                    disabled={isEditable}
                    onChange={handleOnChange}
                    className="font-thin w-full bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2 w-2/5">
                  <label htmlFor="state" className="font-semibold text-text">
                    State
                  </label>
                  <input
                    value={pickupDetails.state}
                    id="state"
                    type="text"
                    name="state"
                    disabled={isEditable}
                    onChange={handleOnChange}
                    className="font-thin w-full bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2 w-2/5">
                  <label
                    htmlFor="shippingMethod"
                    className="font-semibold text-text"
                  >
                    Shipping method
                  </label>
                  <input
                    value={pickupDetails.shippingMethod}
                    id="shippingMethod"
                    type="text"
                    name="shippingMethod"
                    placeholder="SHOPI or SELF"
                    disabled={isEditable}
                    onChange={handleOnChange}
                    className="font-thin w-full bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2 w-2/5">
                  <label
                    htmlFor="shippingFeePrefrences"
                    className="font-semibold text-text"
                  >
                    Shipping fee prefrences
                  </label>
                  <input
                    value={pickupDetails.shippingFeePrefrences}
                    id="shippingFeePrefrences"
                    type="text"
                    name="shippingFeePrefrences"
                    placeholder="SELF or CUSTOMER"
                    disabled={isEditable}
                    onChange={handleOnChange}
                    className="font-thin w-full bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-4 flex justify-end">
        {isEditable ? (
          <button
            onClick={handleDeleteAccount}
            type="submit"
            disabled={loading}
            className={`${
              loading ? "loading flex justify-center items-center" : ""
            } bg-discount brightness-105 w-56 h-12 rounded-md text-text font-semibold shadow shadow-primary hover:brightness-100 `}
          >
            {loading ? <span className="spinner"></span> : "Delete Account"}
          </button>
        ) : (
          <button
            onClick={handleUpdate}
            type="submit"
            disabled={loading}
            className={`${
              loading ? "loading flex justify-center items-center" : ""
            } bg-cta brightness-105 w-56 h-12 rounded-md text-text font-semibold shadow shadow-primary hover:brightness-100 `}
          >
            {loading ? <span className="spinner"></span> : "Save"}
          </button>
        )}
      </div>
    </div>
  );
}

export default AccountDashboard;
