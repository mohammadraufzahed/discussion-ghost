import { AppDataSource } from "../data-source";
import { Replay } from "../entity/Replay";
import { FastifyReply, FastifyRequest } from "fastify";
import IReplay from "../types/Replay";
import { Comment } from "../entity/Comment";

async function postReplay(req: FastifyRequest, rep: FastifyReply) {
  const replay: IReplay = <IReplay>req.body;
  const replayDb = AppDataSource.manager.create(Replay);
  replayDb.name = replay.name;
  replayDb.profile = replay.profile;
  replayDb.content = replay.content;
  const comment: Comment = await AppDataSource.manager.findOneOrFail(Comment, {
    where: { id: replay.commentId },
  });
  if (comment) {
    await AppDataSource.manager.save(replayDb);
    comment.replays = [replayDb];
    await AppDataSource.manager.save(comment);
  } else {
    return { status: "faild" };
  }
  return { status: "ok" };
}

export default postReplay;
