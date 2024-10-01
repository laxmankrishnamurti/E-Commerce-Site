import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

interface ISignupFormData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: number;
  storeName: string;
  panNumber: string;
  panHolder: string;
  panPhoto: File | null;
  accountHolder: string;
  accountNumber: number;
  ifscCode: string;
  pickupStreet: string;
  city: string;
  pinCode: number;
  state: string;
  shippingMethod: string;
  shippingFeePrefrences: string;
}

function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Signup form data format
  const [signupFormData, setSignupFormData] = useState<ISignupFormData>({
    fullName: " ",
    email: " ",
    password: "",
    phoneNumber: 0,
    storeName: " ",
    panNumber: " ",
    panHolder: " ",
    panPhoto: null,
    accountHolder: " ",
    accountNumber: 0,
    ifscCode: " ",
    pickupStreet: " ",
    city: " ",
    pinCode: 0,
    state: " ",
    shippingMethod: " ",
    shippingFeePrefrences: " ",
  });

  const getDeviceId = useCallback(() => {
    const userAgent = navigator.userAgent;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;

    const deviceId = `${userAgent}-${screenResolution}`;
    return btoa(deviceId);
  }, []);

  const deviceId = getDeviceId();

  const handleFieldChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "panPhoto") {
      //Casting file to input element
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        setSignupFormData({
          ...signupFormData,
          panPhoto: target.files[0],
        });
      }
    } else {
      setSignupFormData({ ...signupFormData, [name]: value });
    }
  };

  // Handling form submit
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    //Creating a FormData object for files
    const formData = new FormData();
    if (signupFormData.panPhoto) {
      formData.append("panPhoto", signupFormData.panPhoto);
    }

    // Append the rest of the form data
    formData.append("fullName", signupFormData.fullName);
    formData.append("email", signupFormData.email);
    formData.append("password", signupFormData.password);
    formData.append("phoneNumber", signupFormData.phoneNumber.toString()); // Convert number to string
    formData.append("storeName", signupFormData.storeName);

    // Append pan details
    formData.append("panNumber", signupFormData.panNumber);
    formData.append("panHolder", signupFormData.panHolder);

    // Append account details
    formData.append("accountHolder", signupFormData.accountHolder);
    formData.append("accountNumber", signupFormData.accountNumber.toString()); // Convert number to string
    formData.append("ifscCode", signupFormData.ifscCode);

    // Append pickup address
    formData.append("pickupStreet", signupFormData.pickupStreet);
    formData.append("city", signupFormData.city);
    formData.append("state", signupFormData.state);
    formData.append("pinCode", signupFormData.pinCode.toString()); // Convert number to string
    formData.append("shippingMethod", signupFormData.shippingMethod);
    formData.append(
      "shippingFeePrefrences",
      signupFormData.shippingFeePrefrences
    );

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/s",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            deviceId: deviceId,
          },
          withCredentials: true,
        }
      );
      if (response) {
        const { data } = response;
        toast.success(`${data.message}`);
        localStorage.setItem("sellerId", data.sellerId);
        setTimeout(() => {
          navigate(`/${data.sellerId}`);
        }, 3000);
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

  return (
    <div className="mx-auto my-8 px-8 py-4 w-10/12 h-fit shadow rounded-md">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl text-text font-semibold">Signup</h1>
        <div className="flex gap-8">
          <span className="text-text font-semibold">
            Already have an account ?
          </span>
          <Link
            to={`/signin`}
            className="text-ctah font-semibold hover:underline"
          >
            SignIn
          </Link>
        </div>
      </div>
      <div>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-text">
                Personal Details
              </h1>
            </div>
            <div className="w-full flex flex-wrap gap-8">
              <div className="w-4/12 flex flex-col gap-1 mb-4">
                <label className="text-text">Full name</label>
                <input
                  value={signupFormData.fullName}
                  onChange={handleFieldChanges}
                  type="text"
                  name="fullName"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-4/12 flex flex-col gap-1 mb-4">
                <label className="text-text">Email</label>
                <input
                  value={signupFormData.email}
                  onChange={handleFieldChanges}
                  type="text"
                  name="email"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-3/12 flex flex-col gap-1 mb-4">
                <label className="text-text">Password</label>
                <input
                  value={signupFormData.password}
                  onChange={handleFieldChanges}
                  type="password"
                  name="password"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-4/12 flex flex-col gap-1 mb-4">
                <label className="text-text">Phone number</label>
                <input
                  value={signupFormData.phoneNumber}
                  onChange={handleFieldChanges}
                  type="text"
                  name="phoneNumber"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-3/12 flex flex-col gap-1 mb-4">
                <label className="text-text">Store name</label>
                <input
                  value={signupFormData.storeName}
                  onChange={handleFieldChanges}
                  type="text"
                  name="storeName"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="my-4">
              <h1 className="text-lg font-semibold text-text">PAN Details</h1>
            </div>
            <div className="w-full flex flex-wrap gap-8">
              <div className="w-4/12 flex flex-col gap-1 mb-4">
                <label className="text-text">PAN Number</label>
                <input
                  value={signupFormData.panNumber}
                  onChange={handleFieldChanges}
                  type="text"
                  name="panNumber"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-4/12 flex flex-col gap-1 mb-4">
                <label className="text-text">PAN Holder</label>
                <input
                  value={signupFormData.panHolder}
                  onChange={handleFieldChanges}
                  type="text"
                  name="panHolder"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-3/12 flex flex-col gap-1 mb-4">
                <label className="text-text">PAN Photo</label>
                <input
                  onChange={handleFieldChanges}
                  type="file"
                  name="panPhoto"
                  required
                  className="border border-solid border-black px-2 py-2 text-bg text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention bg-primary cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="my-4">
              <h1 className="text-lg font-semibold text-text">
                Account Details
              </h1>
            </div>
            <div className="w-full flex flex-wrap gap-8">
              <div className="w-4/12 flex flex-col gap-1 mb-4">
                <label className="text-text">Account holder</label>
                <input
                  value={signupFormData.accountHolder}
                  onChange={handleFieldChanges}
                  type="text"
                  name="accountHolder"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-4/12 flex flex-col gap-1 mb-4">
                <label className="text-text">Account number</label>
                <input
                  value={signupFormData.accountNumber}
                  onChange={handleFieldChanges}
                  type="text"
                  name="accountNumber"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-3/12 flex flex-col gap-1 mb-4">
                <label className="text-text">IFSC Code</label>
                <input
                  value={signupFormData.ifscCode}
                  onChange={handleFieldChanges}
                  type="text"
                  name="ifscCode"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="my-4">
              <h1 className="text-lg font-semibold text-text">
                Pickup Details
              </h1>
            </div>
            <div className="w-full flex flex-wrap gap-8">
              <div className="w-4/12 flex flex-col gap-1 mb-4">
                <label className="text-text">Pickup Street</label>
                <input
                  value={signupFormData.pickupStreet}
                  onChange={handleFieldChanges}
                  type="text"
                  name="pickupStreet"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-4/12 flex flex-col gap-1 mb-4">
                <label className="text-text">City</label>
                <input
                  value={signupFormData.city}
                  onChange={handleFieldChanges}
                  type="text"
                  name="city"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-3/12 flex flex-col gap-1 mb-4">
                <label className="text-text">PIN Code</label>
                <input
                  value={signupFormData.pinCode}
                  onChange={handleFieldChanges}
                  type="text"
                  name="pinCode"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-3/12 flex flex-col gap-1 mb-4">
                <label className="text-text">State</label>
                <input
                  value={signupFormData.state}
                  onChange={handleFieldChanges}
                  type="text"
                  name="state"
                  required
                  className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                />
              </div>
              <div className="w-3/12 flex flex-col gap-1 mb-4">
                <label className="text-text">Shipping Method</label>
                <select
                  value={signupFormData.shippingMethod}
                  onChange={handleFieldChanges}
                  name="shippingMethod"
                  required
                  className="px-4 py-3 outline-none rounded-md hover:cursor-pointer bg-primary text-bg font-bold text-sm"
                >
                  <option value="">Select a shipping method</option>
                  <option value="SHOPI">SHOPI</option>
                  <option value="SELF">SELF</option>
                </select>
              </div>
              <div className="w-3/12 flex flex-col gap-1 mb-4">
                <label className="text-text">Shipping fee prefrences</label>
                <select
                  required
                  value={signupFormData.shippingFeePrefrences}
                  onChange={handleFieldChanges}
                  name="shippingFeePrefrences"
                  className="px-4 py-3 outline-none rounded-md hover:cursor-pointer bg-primary text-bg font-bold text-sm"
                >
                  <option value="">Select shipping fee prefrences</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="SELF">SELF</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "loading flex justify-center items-center" : ""
              } bg-cta w-56 h-12 rounded-md text-text font-semibold shadow shadow-primary hover:bg-ctah `}
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                "Create an Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
