import { FastifyInstance } from "fastify";
import { createUserHandler } from "./user.controller";

async function userRoutes(server: FastifyInstance){
    server.post("/", createUserHandler)
}
export default userRoutes