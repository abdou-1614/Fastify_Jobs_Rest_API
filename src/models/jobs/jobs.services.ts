import prisma from '../../utils/prisma';
import { CreateJobsInput } from './jobs.schema';
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