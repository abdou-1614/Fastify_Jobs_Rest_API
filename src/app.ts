import Fastify from "fastify"
import FastifyJwt, { JWT } from "@fastify/jwt"
import userRoutes from "./models/user/user.route"
import { userSchema } from "./models/user/user.schema"
import { FastifyRequest } from "fastify"
import { FastifyReply } from "fastify"

const server = Fastify()

declare module "fastify" {
    interface FastifyRequest {
        jwt: JWT
    }
    export interface FastifyInstance {
        authenticate: any
    }
}
declare module "@fastify/jwt" {
    interface FastifyJWT {
      user: {
        id: string;
        email: string;
        name: string;
      };
    }
  }

server.register(FastifyJwt, {
    secret: "@Secret123@@@"
})

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try{
        await request.jwtVerify()
    }catch(e){
        return reply.send(e);
    }
})

server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt
    return next()
})


server.get("/healthcheck", async function(){
    return {status: "OK"}
})
async function main(){
    for(const schema of userSchema) {
        server.addSchema(schema)
    }
    server.register(userRoutes, {prefix: "api/users"})

    try{
        await server.listen(3000, "0.0.0.0")
        console.log("Server Running At http://localhost:3000")
    }catch(e){
        console.error(e)
        process.exit(1)
    }
}

main()