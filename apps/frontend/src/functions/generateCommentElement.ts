import Comment from "../types/comment";

function generateCommentElement(comment: Comment, el: HTMLDivElement) {
  // Create the base element and set default attributes
  const commentElement: HTMLDivElement = document.createElement("div");
  commentElement.className = "comment d-inline-flex gap-3";
  // Creating the profile element
  generateProfileElement(comment.profile, comment.subComments, commentElement);
  generateBodyElement(comment, commentElement);
  el.appendChild(commentElement);
}

function generateProfileElement(
  profile: string,
  subComments: Comment[] | undefined,
  el: HTMLDivElement
) {
  // Create the base element and setting attributes
  const element: HTMLElement = document.createElement("figure");
  element.classList.add("profile");
  // Create the image element and set the attributes and append it
  const img: HTMLImageElement = document.createElement("img");
  img.src = profile;
  img.className = "img-fluid rounded-circle border-1 border-dark";
  img.setAttribute("width", "100px");
  element.appendChild(img);
  // set the line if it has subComments
  if (subComments) {
    if (subComments.length >= 1) {
      const line: HTMLDivElement = document.createElement("div");
      line.classList.add("line");
      element.appendChild(line);
    }
  }
  el.appendChild(element);
}

function generateBodyElement(comment: Comment, el: HTMLDivElement) {
  // Create the base element
  const element: HTMLDivElement = document.createElement("div");
  generateBodyTitleElement(comment, element);
  generateBodyContentElement(comment.content, element);
  generateBodyActionsElement(element);
  if (comment.subComments) {
    if (comment.subComments.length >= 1) {
      const subCommentsElement: HTMLDivElement = document.createElement("div");
      subCommentsElement.className = "sub-comments";
      comment.subComments.map((item) =>
        generateCommentElement(item, subCommentsElement)
      );
      element.appendChild(subCommentsElement);
    }
  }
  el.appendChild(element);
}

function generateBodyTitleElement(comment: Comment, el: HTMLDivElement) {
  // Create the base element
  const element: HTMLDivElement = document.createElement("div");
  // Create the texts and append them
  const nameElement: HTMLSpanElement = document.createElement("span");
  (nameElement.className = "fw-bold"), (nameElement.innerText = comment.name);
  element.appendChild(nameElement);
  // ----
  const sinceElement: HTMLSpanElement = document.createElement("span");
  (sinceElement.className = "fw-light"),
    (sinceElement.innerText = ` . ${comment.since.value} ${comment.since.type} ago`);
  element.appendChild(sinceElement);
  el.appendChild(element);
}

function generateBodyContentElement(content: string, el: HTMLDivElement) {
  // Generate content
  const contentElement: HTMLParagraphElement = document.createElement("p");
  contentElement.className = "fw-normal fs-6 w-100 mt-2";
  contentElement.innerText = content;
  // Append to el
  el.appendChild(contentElement);
}
function generateBodyActionsElement(el: HTMLDivElement) {
  // Generate the base element and set attributes
  const element: HTMLDivElement = document.createElement("div");
  element.className = "actions d-inline-flex gap-4 fw-normal fs-6";
  // Generate texts and apply
  const upvoteElement: HTMLSpanElement = document.createElement("span");
  upvoteElement.innerHTML =
    '<i class="fa-solid fa-angle-up"></i> &nbsp;&nbsp;Upvote';
  element.appendChild(upvoteElement);
  const replayElement: HTMLSpanElement = document.createElement("span");
  replayElement.innerText = "Replay";
  element.appendChild(replayElement);
  // Append
  el.appendChild(element);
}
export default generateCommentElement;
