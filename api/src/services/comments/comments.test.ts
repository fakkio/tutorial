import {comments, createComment, deleteComment} from "./comments";
import {db} from "src/lib/db";
import {AuthenticationError, ForbiddenError} from "@redwoodjs/graphql-server";

describe("comments", () => {
  scenario(
    "returns all comments for a single post from the database",
    async (scenario: StandardScenario) => {
      const result = await comments({postId: scenario.comment.jane.postId});
      const post = await db.post.findUnique({
        where: {id: scenario.comment.jane.postId},
        include: {comments: true},
      });
      expect(result.length).toEqual(post.comments.length);
    }
  );

  scenario(
    "postOnly",
    "creates a new comment",
    async (scenario: PostOnlyScenario) => {
      const comment = await createComment({
        input: {
          name: "Billy Bob",
          body: "What is your favorite tree bark?",
          postId: scenario.post.bark.id,
        },
      });

      expect(comment.name).toEqual("Billy Bob");
      expect(comment.body).toEqual("What is your favorite tree bark?");
      expect(comment.postId).toEqual(scenario.post.bark.id);
      expect(comment.createdAt).not.toEqual(null);
    }
  );

  scenario(
    "allows a moderator to delete a comment",
    async (scenario, StandardScenario) => {
      mockCurrentUser({
        roles: "moderator",
        id: 1,
        email: "moderator@moderator.com",
      });

      const comment = await deleteComment({
        id: scenario.comment.jane.id,
      });
      expect(comment.id).toEqual(scenario.comment.jane.id);

      const result = await comments({postId: scenario.comment.jane.id});
      expect(result.length).toEqual(0);
    }
  );

  scenario(
    "does not allow a non-moderator to delete a comment",
    async (scenario: StandardScenario) => {
      mockCurrentUser({roles: "user", id: 1, email: "user@user.com"});

      expect(() =>
        deleteComment({
          id: scenario.comment.jane.id,
        })
      ).toThrow(ForbiddenError);
    }
  );

  scenario(
    "does not allow a logged out user to delete a comment",
    async (scenario: StandardScenario) => {
      mockCurrentUser(null);

      expect(() =>
        deleteComment({
          id: scenario.comment.jane.id,
        })
      ).toThrow(AuthenticationError);
    }
  );
});
