import jsonwebtoken from "jsonwebtoken"
import config from "../config/config.ts"

interface IPayload {
    userId: string
}

const generateToken = (payload: IPayload): string => {
    const generatedToekn: string = jsonwebtoken.sign(
        payload, 
        config.jsonwebtoken_secret,
        {expiresIn: "1d"}
    )
    return generatedToekn
}

export {
    generateToken
}