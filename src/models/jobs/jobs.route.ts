import { FastifyInstance } from 'fastify';
import { createJobsHandler } from './jobs.controller';
import { $ref } from './jobs.schema';
export async function jobsRoutes(server: FastifyInstance){
    server.post("/", {
        preHandler: [server.authenticate],
        // schema: {
        //     body: $ref("createJobsShema"),
        //     response: {
        //         201: $ref("jobReplySchema")
        //     }
        // }
    }, createJobsHandler)
}