import {FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput } from "./user.schema";
import { createUser } from "./user.services";

export async function createUserHandler(request: FastifyRequest<{Body: CreateUserInput}>, reply: FastifyReply){
    const body = request.body
    try{
        const user = await createUser(body)
        return reply.code(201).send(user)
    }catch(e: any){
        if(e.code === 11000) {
            return reply.code(409).send({message: "Account Aleardy Exist"})
        }
        return reply.code(500).send(e)
    }
}