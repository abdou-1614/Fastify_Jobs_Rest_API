import { buildJsonSchemas } from 'fastify-zod'
import z from 'zod'

const userCore = {
    name: z.string({
        required_error: "Name Is Required"
    }),
    email: z.string({
        required_error: "Email Is Required"
    }).email(),
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: "Password Is Required"
    }).min(6, "Password Most Have more than 6")
})
const createUserReplySchema = z.object({
    id: z.string(),
    ...userCore
})

const loginSchema = z.object({
    email: z.string({
        required_error: "Email Is Required"
    }).email(),
    password: z.string({
        required_error: "password Is Required"
    })
})

const loginReplySchema = z.object({
    accessToken: z.string()
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>

export const {schemas: userSchema, $ref} = buildJsonSchemas({
    createUserSchema,
    createUserReplySchema,
    loginSchema,
    loginReplySchema
})