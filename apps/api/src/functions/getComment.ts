import { AppDataSource } from "../data-source";
import IComment from "types/Comment";
import { Comment } from "../entity/Comment";

async function getComment(): Promise<Comment[]> {
  const repository = AppDataSource.getRepository(Comment);
  return repository.find({ relations: { replays: true } });
}

export default getComment;
