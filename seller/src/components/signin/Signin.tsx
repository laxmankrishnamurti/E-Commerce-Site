import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface ISigninFormData {
  email: string;
  password: string;
} 

function Signin() {
     const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const [signinFormData, setSigninFormData] = useState<ISigninFormData>({
    email: "",
    password: "",
  })

  useEffect(() => {
    const sellerId = localStorage.getItem("sellerId")
    if(sellerId){
      navigate(`/${sellerId}`)
    }
  }, [])

  const handleFieldChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setSigninFormData({...signinFormData, [name]: value})
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post("http://localhost:4000/api/v1/s/signin", signinFormData,  {withCredentials: true})
      if(response){
          const {data} = response;
          localStorage.setItem("sellerId", data.sellerId)
          toast.success('Logged in successfully!');
          setTimeout(() => {
              navigate(`/${data.sellerId}`);
          }, 2000);
      }
    } catch (error) { 
        if (axios.isAxiosError(error)) {
          if (error.response) {
              toast.error(`${error.response.data.message}`);
          } else {
              toast.error('No response received from the server.');
          }
        } else if (error instanceof Error) {
            // Handles non-Axios errors
            toast.error(`Error: ${error.message}`);
        } else {
            toast.error('An unknown error occurred.');
        }
    }finally {
      setLoading(false)
    }

  }

  return (
    <div className='mx-auto my-14 px-8 py-4 w-4/12 h-fit shadow rounded-md'>
      <div className="flex justify-center items-center flex-col gap-8">
        <div>
          <h1 className='text-2xl text-text font-semibold'>SignIn</h1>
        </div>
        <div className="w-full">
            <form onSubmit={handleFormSubmit}>
              <div className=" flex flex-col gap-1 mb-4">
                  <label className="text-text">Email</label>
                  <input 
                      value={signinFormData.email}
                      onChange={handleFieldChanges}
                      type="text"
                      name="email"
                      required
                      className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                  />
              </div>
              <div className=" flex flex-col gap-1 mb-4">
                  <label className="text-text">Password</label>
                  <input 
                      value={signinFormData.password}
                      onChange={handleFieldChanges}
                      type="password"
                      name="password"
                      required
                      className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                  />
              </div>
              <div className="mt-8 mb-4">
                    <button type="submit" disabled={loading} className={`${loading ? 'loading flex justify-center items-center' : ''} bg-cta w-full h-12 rounded-md text-text font-semibold shadow shadow-primary hover:bg-ctah `}>
                        {loading ? (
                            <span className="spinner"></span>
                        ) : (
                            'Continue'
                        )}
                    </button>
                </div>
            </form>
        </div>
      </div>
      <div className="flex justify-between my-8">
              <span className="text-text font-semibold">Don't have an account ?</span>
              <Link to={`/signup`} className="hover:underline font-semibold text-text">Signup</Link>
            </div>
    </div>
  )
}

export default Signin