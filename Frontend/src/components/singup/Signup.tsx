import {Link} from "react-router-dom"

function Signup() {
  return (
    <>
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-96 flex flex-col gap-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">shopi</h1>
                </div>
                <div className="border-solid border border-black rounded-md p-3 shadow shadow-hbg">
                    <form>
                        <h2 className="text-2xl mb-4">Create Account</h2>
                        <div className="flex flex-col gap-1 mb-4">
                            <label className="text-text">Your name</label>
                            <input 
                                type="text"
                                name="name"
                                placeholder="First name and last name"
                                className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-4">
                            <label className="text-text">Mobile number</label>
                            <input 
                                type="text"
                                name="mobilenumber"
                                placeholder="Mobile number"
                                className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-4">
                            <label className="text-text">Password</label>
                            <input 
                                type="password"
                                name="password"
                                placeholder="At least 6 characters"
                                className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                            />
                            <p className="text-text text-xs my-3">To verify your number, we will send you a text message with a temporary code. Message and data rate may apply.</p>
                        </div>

                        <button type="submit" className="bg-cta text-text font-semibold w-full py-2 rounded-md hover:bg-ctah">Verify mobile number</button>
                    </form>
                    <div className="mt-8 mb-2 flex justify-between">
                        <p className="font-bold text-sm text-text">Already have an account?</p>
                        <Link to={`/signin`} className="text-cta text-sm font-bold hover:underline">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup