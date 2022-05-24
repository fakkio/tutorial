import type {Prisma} from "@prisma/client";
import type {ResolverArgs} from "@redwoodjs/graphql-server";
import {requireAuth} from "src/lib/auth";

import {db} from "src/lib/db";

export const comments = ({
  postId,
}: Required<Pick<Prisma.CommentWhereInput, "postId">>) => {
  return db.comment.findMany({where: {postId}});
};

export const comment = ({id}: Prisma.CommentWhereUniqueInput) => {
  return db.comment.findUnique({
    where: {id},
  });
};

export const Comment = {
  post: (_obj, {root}: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({where: {id: root.id}}).post(),
};

interface CreateCommentArgs {
  input: Prisma.CommentCreateInput;
}

export const createComment = ({input}: CreateCommentArgs) => {
  return db.comment.create({
    data: input,
  });
};

export const deleteComment = ({id}: Prisma.CommentWhereUniqueInput) => {
  requireAuth({roles: "moderator"});
  return db.comment.delete({
    where: {id},
  });
};
