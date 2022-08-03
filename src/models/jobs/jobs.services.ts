import {buildJsonSchemas} from "fastify-zod"
import z from "zod"

const jobsInput = {
    company: z.string(),
    position: z.string(),
    status: z.string()
}
const jobsgenerator = {
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
}

const createJobsShema = z.object({
    ...jobsInput
})

const jobReplySchema = z.object({
    ...jobsInput,
    ...jobsgenerator
})

const jobsReplySchema = z.array(jobReplySchema)

export type CreateJobsInput = z.infer<typeof createJobsShema>

export const {schemas: jobsSchema, $ref} = buildJsonSchemas({
    createJobsShema,
    jobReplySchema,
    jobsReplySchema
})