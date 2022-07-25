import { CreateUserInput } from "./user.schema";
import bcrypt from "bcrypt"
import prisma from "../../utils/prisma";
import { omit } from "lodash";

export async function createUser(input: CreateUserInput){
    const {password, ...rest} = input
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            ...rest,
            password: hash
        }
    })
    
    return user
}

export async function findUserByEmail(email: string){
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}
export async function findUsers(){
    return prisma.user.findMany({
        select: {
            email: true,
            name: true,
            id: true
        }
    })
}