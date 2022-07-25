import {FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput, LoginInput } from "./user.schema";
import { createUser, findUserByEmail } from "./user.services";
import bcrypt from "bcrypt"
import { omit } from "lodash";

export async function createUserHandler(request: FastifyRequest<{Body: CreateUserInput}>, reply: FastifyReply){
    const body = request.body
    try{
        const user = await createUser(body)
        return reply.code(201).send(user)
    }catch(e: any){
        if(e.code === 11000) {
            return reply.code(409).send("Account Aleardy Exist")
        }
        return reply.code(500).send(e)
    }
}

export async function loginUserHandler(request: FastifyRequest<{Body: LoginInput}>, reply: FastifyReply){
    const {email, password} = request.body

    const user = await findUserByEmail(email)

    if(!user){
        return reply.code(400).send({message: "Invalid Email or Password"})
    }
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) {
        return reply.code(400).send({message: "Wrong Email or Password"})
    }


    const payload = omit(user, "password")

    return {
        accessToken: request.jwt.sign(payload)
    }
}