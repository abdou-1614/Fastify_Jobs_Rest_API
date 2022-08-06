import prisma from '../../utils/prisma';
import { CreateJobsInput, DeleteJobsInput, GetJobInput, UpdateJobsInput } from './jobs.schema';
export async function createJobs(data: CreateJobsInput & {ownerId: string}){
    return prisma.jobs.create({
        data
    })
}

export async function GetAllJobs(){
    return prisma.jobs.findMany({
        select: {
            id: true,
            position: true,
            company: true,
            status: true,
            owner: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
}

export async function getJob(id: string){
    return prisma.jobs.findUnique({
        where: {
            id
        }
    })
}

export async function updateJobs(id: UpdateJobsInput["params"], input: UpdateJobsInput["body"]){
    const {company, status, position} = input
    return prisma.jobs.update({
        where: {
            id: String(id)
        },
        data: {
            company,
            status,
            position
        }
    })
}

export async function deleteJobs(id: DeleteJobsInput){
    return prisma.jobs.delete({
        where: {
            id: String(id)
        }
    })
}