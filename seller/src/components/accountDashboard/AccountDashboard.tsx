import {  useParams } from "react-router-dom"
import userProfileImage from "../../assets/user.png"
// import axios from "axios"

function AccountDashboard() {
    const {sellerId} = useParams()

    ;(async() => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/s/${sellerId}`, {
                credentials: "include"
            })
            console.log("response : ", response)
        } catch (error) {
            console.log("Error while fetching account details : ", error)
        }
    })()
  return (
    <div className='mx-auto my-8 px-8 py-4 w-10/12 h-fit shadow rounded-md'>
        <div className="flex justify-between">
            <div className="w-1/6">
                <img src={userProfileImage} alt="profileImage" className="w-full"/>
            </div>
            <div className="w-2/3 flex flex-col gap-8">
                <div>
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold">Personal Details</h1>
                        <button className="hover:underline">Edit</button>
                    </div>
                    <div className="flex w-full shadow my-4 p-4 justify-between flex-wrap gap-8 rounded-md">
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="fullName" className="font-semibold text-text">Full name</label>
                            <input 
                                value="Laxman Krishnamurti"
                                id="fullName"
                                type="text"
                                name="fullName"
                                className="font-thin w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="email" className="font-semibold text-text">Email</label>
                            <input 
                                value="laxmankrishnamurti@gmail.com"
                                id="email"
                                type="text"
                                name="email"
                                className="font-thin w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="phoneNumber" className="font-semibold text-text">Phone number</label>
                            <input 
                                value="8252764932"
                                id="phoneNumber"
                                type="text"
                                name="phoneNumber"
                                className="font-thin w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="storeName" className="font-semibold text-text">Store name</label>
                            <input 
                                value="shopi"
                                id="storeName"
                                type="text"
                                name="storeName"
                                className="font-thin w-full"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-semibold">PAN Details</h1>
                    <div className="flex w-full shadow my-4 p-4 justify-between flex-wrap gap-8 rounded-md">
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="panNumber" className="font-semibold text-text">PAN Number</label>
                            <input 
                                value="KYYPK9816E"
                                id="panNumber"
                                type="text"
                                name="panNumber"
                                className="font-thin w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="panHolder" className="font-semibold text-text">PAN Holder</label>
                            <input 
                                value="Laxman Krishnamurti"
                                id="panHolder"
                                type="text"
                                name="panHolder"
                                className="font-thin w-full"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold">Account Details</h1>
                    </div>
                    <div className="flex w-full shadow my-4 p-4 justify-between flex-wrap gap-8 rounded-md">
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="accountHolder" className="font-semibold text-text">Account holder</label>
                            <input 
                                value="Laxman Krishnamurti"
                                id="accountHolder"
                                type="text"
                                name="accountHolder"
                                className="font-thin w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="accountNumber" className="font-semibold text-text">Account number</label>
                            <input 
                                value="918252764932"
                                id="accountNumber"
                                type="text"
                                name="accountNumber"
                                className="font-thin w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="ifscCode" className="font-semibold text-text">IFSC Code</label>
                            <input 
                                value="payment@kotak"
                                id="ifscCode"
                                type="text"
                                name="ifscCode"
                                className="font-thin w-full"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold">Pickup addresses</h1>
                    </div>
                    <div className="flex w-full shadow my-4 p-4 justify-between flex-wrap gap-8 rounded-md">
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="pickupStreet" className="font-semibold text-text">Street</label>
                            <input 
                                value="Dharamsheela Niwas"
                                id="pickupStreet"
                                type="text"
                                name="pickupStreet"
                                className="font-thin w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="city" className="font-semibold text-text">City</label>
                            <input 
                                value="Patna"
                                id="city"
                                type="text"
                                name="city"
                                className="font-thin w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="pinCode" className="font-semibold text-text">PIN Code</label>
                            <input 
                                value="800020"
                                id="pinCode"
                                type="text"
                                name="pinCode"
                                className="font-thin w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="state" className="font-semibold text-text">State</label>
                            <input 
                                value="Bihar"
                                id="state"
                                type="text"
                                name="state"
                                className="font-thin w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="shippingMethod" className="font-semibold text-text">Shipping method</label>
                            <input 
                                value="SHOPI"
                                id="shippingMethod"
                                type="text"
                                name="shippingMethod"
                                className="font-thin w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-2/5" >
                            <label htmlFor="shippingFeePrefrences" className="font-semibold text-text">Shipping fee prefrences</label>
                            <input 
                                value="SELF"
                                id="shippingFeePrefrences"
                                type="text"
                                name="shippingFeePrefrences"
                                className="font-thin w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AccountDashboard