import { Link } from "react-router-dom"

function Signin() {
  return (
    <>
    <div className="w-full h-screen flex justify-center items-center">
            <div className="w-96 flex flex-col gap-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">shopi</h1>
                </div>
                <div className="border-solid border border-black rounded-md p-3 shadow shadow-hbg">
                    <form>
                        <h2 className="text-2xl mb-4">Sign In</h2>
                        <div className="flex flex-col gap-1 mb-4">
                            <label className="text-text">Email or mobile phone number</label>
                            <input 
                                type="text"
                                className="border border-solid border-black px-2 py-2 text-text text-sm rounded-md shadow-sm shadow-primary placeholder:text-sm outline-none transition-all duration-300 focus:ring-1 focus:ring-attention"
                            />
                        </div>
                        <button type="submit" className="bg-cta text-text font-semibold w-full py-2 rounded-md hover:bg-ctah">Continue</button>
                    </form>
                    <div className="mt-16 mb-8 flex flex-col gap-6">
                        <p className="font-bold text-sm text-text">Don't have an account?</p>
                        <Link to={`/signup`} className="bg-bg text-text text-center font-semibold w-full py-2 rounded-md hover:bg-bgh">Create an shopi account</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signin