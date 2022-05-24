import Comment from "./Comment";

const comment = {
  id: 1,
  name: "Rob Cameron",
  body: "This is the first comment!",
  createdAt: "2020-01-01T12:34:56Z",
  postId: 1,
};

export const defaultView = () => {
  return (
    <div className="m-4">
      <Comment comment={comment} />
    </div>
  );
};

export const moderatorView = () => {
  mockCurrentUser({
    roles: "moderator",
    id: 1,
    email: "moderator@moderator.com",
    name: "",
    hashedPassword: "",
    salt: "",
    resetToken: "",
    resetTokenExpiresAt: undefined,
  });

  return (
    <div className="m-4">
      <Comment comment={comment} />
    </div>
  );
};

export default {title: "Components/Comment"};
