import z from 'zod'

const createUserSchema = z.object({
    name: z.string({
        required_error: "Name Is Required"
    }),
    email: z.string({
        required_error: "Email Is Required"
    }).email(),
    password: z.string({
        required_error: "Password Is Required"
    }).min(6, "Password Most Have more than 6")
})

export type CreateUserInput = z.infer<typeof createUserSchema>