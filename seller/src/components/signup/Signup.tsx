import React, { useState } from "react";

interface IPanDetails {
    panNumber: string;
    panHolder: string;
}

interface IAccountDetails {
    accountHolder: string;
    accountNumber: number;
    ifscCode: string;
}

interface IPickupAddress {
    pickupStreet: string;
    city: string;
    pinCode: number;
    state: string;
    shippingMethod: string;
    shippingFeePrefrences: string;
  }

interface ISignupFormData {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: number;
    storeName: string;
    panDetails: IPanDetails;
    accountDetails: IAccountDetails;
    pickupAddress: IPickupAddress;
}

function Signup() {
    const [signupFormData, setSignupFormData] = useState({
        fullName: " ",
        email: " ",
        password: " ",
        phoneNumber: 0,
        storeName: " ",
        panNumber: " ",
        panHolder: " ",
        accountHolder: " ",
        accountNumber: 0,
        ifscCode: " ",
        pickupStreet: " ",
        city: " ",
        pinCode: 0,
        state: " ",
        shippingMethod: " ",
        shippingFeePrefrences: " "
    })

    const handleFieldChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log("E :: ", e)
        setSignupFormData({...signupFormData, [e.target.name]: e.target.value})
    }

    // Handling form submit
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const signupData: ISignupFormData = {
            fullName: signupFormData.fullName,
            email: signupFormData.email,
            password: signupFormData.password,
            phoneNumber: signupFormData.phoneNumber,
            storeName: signupFormData.storeName,
            panDetails: {
                panNumber: signupFormData.panNumber,
                panHolder: signupFormData.panHolder,
            },
            accountDetails: {
                accountHolder: signupFormData.accountHolder,
                accountNumber: signupFormData.accountNumber,
                ifscCode: signupFormData.ifscCode
            },
            pickupAddress: {
                pickupStreet: signupFormData.pickupStreet,
                city: signupFormData.city,
                state: signupFormData.state,
                pinCode: signupFormData.pinCode,
                shippingMethod: signupFormData.shippingMethod,
                shippingFeePrefrences: signupFormData.shippingFeePrefrences
            }
        }
        console.log("signup form data : ", signupData)
    }

  return (
    <div className='mx-auto my-8 px-8 py-4 w-10/12 h-fit shadow rounded-md'>
        <div className='mb-8'>
            <h1 className='text-2xl text-text font-semibold'>Signup</h1>
        </div>
        <div>
            <form 
                onSubmit={handleFormSubmit}
                encType="multipart-formdata"
            >
                <div>
                    <div className="mb-4">
                        <h1 className='text-lg font-semibold text-text'>Personal Details</h1>
                    </div>
                    <div className="w-full flex flex-wrap gap-8">
                        <div className="w-4/12 flex flex-col gap-1 mb-4">
                            <label className="text-text">Full name</label>
                            <input 
                                value={signupFormData.fullName}
                                onChange={handleFieldChanges}
                                type="text"
                                name="fullName"
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
                                className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="my-4">
                        <h1 className='text-lg font-semibold text-text'>PAN Details</h1>
                    </div>
                    <div className="w-full flex flex-wrap gap-8">
                        <div className="w-4/12 flex flex-col gap-1 mb-4">
                            <label className="text-text">PAN Number</label>
                            <input 
                                value={signupFormData.panNumber}
                                onChange={handleFieldChanges}
                                type="text"
                                name="panNumber"
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
                                className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                            />
                        </div>
                        <div className="w-3/12 flex flex-col gap-1 mb-4">
                            <label className="text-text">PAN Photo</label>
                            <input 
                                type="file"
                                name="panPhoto"
                                className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention bg-bg cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="my-4">
                        <h1 className='text-lg font-semibold text-text'>Account Details</h1>
                    </div>
                    <div className="w-full flex flex-wrap gap-8">
                        <div className="w-4/12 flex flex-col gap-1 mb-4">
                            <label className="text-text">Account holder</label>
                            <input 
                                value={signupFormData.accountHolder}
                                onChange={handleFieldChanges}
                                type="text"
                                name="accountHolder"
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
                                className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="my-4">
                        <h1 className='text-lg font-semibold text-text'>Pickup Details</h1>
                    </div>
                    <div className="w-full flex flex-wrap gap-8">
                        <div className="w-4/12 flex flex-col gap-1 mb-4">
                            <label className="text-text">Pickup Street</label>
                            <input 
                                value={signupFormData.pickupStreet}
                                onChange={handleFieldChanges}
                                type="text"
                                name="pickupStreet"
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
                                className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                            />
                        </div>
                        <div className="w-3/12 flex flex-col gap-1 mb-4">
                            <label className="text-text">Shipping Method</label>
                            <select 
                                value={signupFormData.shippingMethod}
                                onChange={handleFieldChanges}
                                name="shippingMethod"
                                className='px-4 py-3 outline-none rounded-md hover:cursor-pointer bg-bg text-primary font-bold text-sm'
                            >
                                <option value="">Select a shipping method</option>
                                <option value="SHOPI">SHOPI</option>
                                <option value="SELF">SELF</option>
                            </select>
                        </div>
                        <div className="w-3/12 flex flex-col gap-1 mb-4">
                            <label className="text-text">Shipping fee prefrences</label>
                            <select 
                                value={signupFormData.shippingFeePrefrences}
                                onChange={handleFieldChanges}
                                name="shippingFeePrefrences"
                                className='px-4 py-3 outline-none rounded-md hover:cursor-pointer bg-bg text-primary font-bold text-sm'
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
                        className="bg-cta px-8 py-3 rounded-md text-text font-semibold shadow shadow-primary hover:bg-ctah"
                    >Create an account</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup