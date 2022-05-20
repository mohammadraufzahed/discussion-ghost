import { AppDataSource } from "./data-source";
import Fastify, { FastifyInstance } from "fastify";
import router from "./routes";

/**
 * @name createServer
 * @description Server generator function that will return a server instance
 * @example
 * const server: FastifyInstance = await createServer();
 * @returns Promise<FastifyInstance>
 */
async function createServer(): Promise<FastifyInstance> {
  // Create the server
  const server: FastifyInstance = Fastify({ logger: true });
  server.register(router, {});
  return server;
}

/**
 * @name start
 * @description Application start function
 * @example
 * start();
 * @returns Promise<void>
 */
async function start(): Promise<void> {
  // Initilize the database
  await AppDataSource.initialize();
  // Create the server
  const server: FastifyInstance = await createServer();
  await server.listen(3031);
}

export default start;
