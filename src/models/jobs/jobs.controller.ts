import { CreateJobsInput, GetJobInput } from './jobs.schema';
import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { createJobs, GetAllJobs, getJob } from './jobs.services';
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

export async function getSingleJobHandler(request: FastifyRequest<{Params: GetJobInput["params"]}>, reply: FastifyReply){
    const jobId = request.params.id
    // const ownerId = request.user.id
    const job = await getJob(jobId)
    if(!job){
        return reply.code(404).send("Not Found Job")
    }
    return reply.code(201).send(job)
}