import Comment from "./Comment";

const comment = {
  name: "Rob Cameron",
  body: "This is the first comment!",
  createdAt: "2020-01-01T12:34:56Z",
};

export const generated = () => {
  return <Comment comment={comment} />;
};

export default {title: "Components/Comment"};
