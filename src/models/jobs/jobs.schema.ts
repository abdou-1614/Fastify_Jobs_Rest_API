import {buildJsonSchemas} from "fastify-zod"
import z, {object} from "zod"

const jobsInput = {
    company: z.string(),
    position: z.string(),
    status: z.any().optional()
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

const getJobsSchema = z.object({
    params: z.object({
        id: z.string()
    })
})
const updateJobsSchema = z.object({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        company: z.string(),
        position: z.string(),
        status: z.any().optional()      
    })
})

export type CreateJobsInput = z.infer<typeof createJobsShema>
export type GetJobInput = z.infer<typeof getJobsSchema>
export type UpdateJobsInput = z.infer<typeof updateJobsSchema>

export const {schemas: jobsSchema, $ref} = buildJsonSchemas({
    createJobsShema,
    jobReplySchema,
    jobsReplySchema
})