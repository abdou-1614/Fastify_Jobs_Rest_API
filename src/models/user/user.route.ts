import { FastifyInstance } from "fastify";
import { createUserHandler, findUsersHandler, loginUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance){
    server.post("/", {
        schema: {
            body: $ref("createUserSchema"),
            response: {
                201: $ref("createUserReplySchema")
            }
        }
    } ,createUserHandler)
    server.post("/login", {
        schema: {
            body: $ref("loginSchema"),
            response: {
                200: $ref("loginReplySchema")
            }
        }
    }, loginUserHandler)
    server.get("/", {
        preHandler: [server.authenticate]
    }, findUsersHandler)
}
export default userRoutes