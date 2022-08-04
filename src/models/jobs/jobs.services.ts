import prisma from '../../utils/prisma';
import { CreateJobsInput } from './jobs.schema';
export async function createJobs(data: CreateJobsInput & {ownerId: string}){
    return prisma.jobs.create({
        data
    })
}