import { FastifyInstance, FastifyPluginOptions } from "fastify";
import postReplay from "../functions/postReplay";
import getComment from "../functions/getComment";
import postComment from "../functions/postComment";

/**
 * @name router
 * @description Routes initializer function
 * @param fastify Fastify instance
 * @param opts Fastify options
 * @param done Fasitfy end function
 * @example
 * fastify.register(router, {})
 * @returns Promise<void>
 */
async function router(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: Function
): Promise<void> {
  fastify.post("/comment", postComment);
  fastify.get("/comment", getComment);
  fastify.post("/replay", postReplay);
  done();
}

export default router;
