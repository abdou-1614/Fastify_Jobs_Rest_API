import prisma from '../../utils/prisma';
import { CreateJobsInput, DeleteJobsInput, GetJobInput, UpdateJobsInput } from './jobs.schema';
export async function createJobs(data: CreateJobsInput & {ownerId: string}){
    return prisma.jobs.create({
        data
    })
}

export async function GetAllJobs(ownerId: string){
    return prisma.jobs.findMany({
        where: {
            ownerId
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

export async function updateJobs(id: string, data: UpdateJobsInput["body"]){
    return prisma.jobs.update({
        where: {
            id
        },
        data
    })
}

export async function deleteJobs(id: string){
    return prisma.jobs.delete({
        where: {
            id
        }
    })
}