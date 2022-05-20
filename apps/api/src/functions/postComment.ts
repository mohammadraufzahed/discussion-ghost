import { Comment } from "../entity/Comment";
import { FastifyReply, FastifyRequest } from "fastify";
import IComment from "../types/Comment";
import { AppDataSource } from "../data-source";

async function postComment(req: FastifyRequest, rep: FastifyReply) {
  const repository = AppDataSource.manager.getRepository(Comment);
  const reqComment: IComment = <IComment>req.body;
  const comment = new Comment();
  comment.name = reqComment.name;
  comment.profile = reqComment.profile;
  comment.content = reqComment.content;
  await repository.save(comment);
  rep.send({ status: "ok" });
}

export default postComment;
