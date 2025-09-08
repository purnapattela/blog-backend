import { Router } from 'express'
import testRouter from './test.routes.js'
import userRoutes from './user.routes.js'
import blogRoutes from './blog.routes.js'

const v1Router = Router()

v1Router.use("/test", testRouter)
v1Router.use("/user",userRoutes)
v1Router.use("/blog",blogRoutes)

export default v1Router