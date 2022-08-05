import prisma from '../../utils/prisma';
import { CreateJobsInput, GetJobInput } from './jobs.schema';
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