import { CreateJobsInput } from './jobs.schema';
import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { createJobs, GetAllJobs } from './jobs.services';
import { REPL_MODE_SLOPPY } from 'repl';
export async function createJobsHandler(request: FastifyRequest<{Body:CreateJobsInput}>, reply: FastifyReply){
    const ownerId = request.user.id
    const jobs = await createJobs({
        ...request.body,
        ownerId
    })
    return reply.code(201).send(jobs)
}

export async function getAllJobsHandeler(request: FastifyRequest, reply: FastifyReply){
    const job = await GetAllJobs()
    if(!job) {
        return reply.code(404).send("No Jobs Found")
    }
    return reply.code(201).send({job, count: job.length})
}