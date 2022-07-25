import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput){
    const {password, ...rest} = input
}