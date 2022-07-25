import { FastifyInstance } from "fastify";
import { createUserHandler } from "./user.controller";
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
}
export default userRoutes