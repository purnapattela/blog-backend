import { Router } from 'express'
import ApiResponse from "../helpers/ApiResponse.js"
import AsyncHandler from '../helpers/AsyncHandler.js'
import CustomeError from '../helpers/CustomError.js'

const testRouter = Router()


testRouter.get("/no-error", (req, res) => {
    return ApiResponse(res,200,true,"testing is tested")
})

testRouter.get("/with-error", (req, res) => {
    return ApiResponse(res,400,false,"You are un-authorized to use this resource")
})

testRouter.get("/unknown-error", AsyncHandler(async (req, res) => {
    throw new CustomeError("Something went wrong", 405, {});
}))

export default testRouter