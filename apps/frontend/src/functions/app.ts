import generateCommentElement from "./generateCommentElement";
import getComments from "./getComments";
import setProfile from "./setProfile";

async function app() {
  // Initilize a fake profile for the user
  await setProfile();
  await getComments();
  // Generating comments
  const comments = await getComments();
  const commentsElement: HTMLDivElement | null =
    document.querySelector(".comments");
  if (commentsElement) {
    comments.map((item) => generateCommentElement(item, commentsElement));
  }
}

export default app;
