import {Request, Response ,NextFunction } from "express";
import Joi from "joi";
import asyncHandler from "../../../utils/asyncHandler.utils.ts";
import SELLER from "../../../models/sellers.model.ts";
import CustomErrorClass from "../../../utils/customErrorClass.utils.ts";

const paramsSchema = Joi.object({
    sellerId: Joi.string().required()
})

const deleteAccount = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {error, value} = paramsSchema.validate(req.params)

    if(error){
        return next(new CustomErrorClass(400, error.message))
    }

    const sellerId: string = value.sellerId
    const deletedSeller = await SELLER.findOneAndDelete({_id: sellerId})
    console.log("deletedAccount : ", deletedSeller)
    if(!deletedSeller){
        return next(new CustomErrorClass(401, "User dosen't exist"))
    }

    return res.status(200).json({
        status: "success",
        message: "Account has been deleted"
    })
})

export default deleteAccount