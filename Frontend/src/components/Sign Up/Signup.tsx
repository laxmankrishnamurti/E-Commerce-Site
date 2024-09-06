
function Signup() {
  return (
    <>
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-96">
                <div className="text-center">
                    <h1>shopi</h1>
                </div>
                <div className="border-solid border border-black rounded-md p-3">
                    <h2 className="text-xl mb-4">Create Account</h2>
                    <div className="flex flex-col gap-1">
                        <label>Your name</label>
                        <input 
                            type="text"
                            placeholder="First name and last name"
                            className="border border-solid border-black px-2 py-1 rounded-md  shadow-md placeholder:text-sm outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup