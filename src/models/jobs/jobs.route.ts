import { FastifyInstance } from 'fastify';
import { createJobsHandler, deleteJobsHandler, getAllJobsHandeler, getSingleJobHandler, updateJobsHandler } from './jobs.controller';
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
    server.get("/", {
        preHandler: [server.authenticate]
    } ,getAllJobsHandeler)
    server.get("/:id", {
        preHandler: [server.authenticate]
    } , getSingleJobHandler)
    server.put("/:id", {
        preHandler: [server.authenticate]
    }, updateJobsHandler)
    server.delete("/:id", {
        preHandler: [server.authenticate]
    }, deleteJobsHandler)
}