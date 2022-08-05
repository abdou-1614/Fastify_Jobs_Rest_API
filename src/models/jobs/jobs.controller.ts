import { CreateJobsInput, GetJobInput, UpdateJobsInput } from './jobs.schema';
import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { createJobs, GetAllJobs, getJob, updateJobs } from './jobs.services';
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
        return reply.code(404).send("No Jobs Found")
    }
    return reply.code(201).send(job)
}

export async function updateJobsHandler(request: FastifyRequest<{Params: UpdateJobsInput["params"], Body: UpdateJobsInput["body"]}>, reply: FastifyReply){
    const {id} = request.params
    const {company, position} = request.body
    if(company.length === 0 || position.length === 0){
        throw new Error("Position Or Company Fields Cannot Be Empty")
    }
    const jobs = await updateJobs({id}, request.body)
    if(!jobs){
        return reply.code(404).send("No Jobs Found")
    }
    return reply.code(201).send(jobs)
}