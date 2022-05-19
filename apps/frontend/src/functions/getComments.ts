import axios from "axios";
import Comment from "../types/comment";

async function getComments(): Promise<Comment[]> {
  const { data }: { data: Comment[] } = await axios.get(
    "http://localhost:3031/comments"
  );
  return data;
}

export default getComments;
