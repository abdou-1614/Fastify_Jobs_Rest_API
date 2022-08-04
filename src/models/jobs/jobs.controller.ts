import { CreateJobsInput } from './jobs.schema';
import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { createJobs } from './jobs.services';
export async function createJobsHandler(request: FastifyRequest<{Body:CreateJobsInput}>, reply: FastifyReply){
    const ownerId = request.user.id
    const jobs = await createJobs({
        ...request.body,
        ownerId
    })
    return reply.code(201).send(jobs)
}