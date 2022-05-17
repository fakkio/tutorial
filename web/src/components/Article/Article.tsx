import {Link, routes} from "@redwoodjs/router";
import {Post} from "types/graphql";

interface ArticleProps {
  article: Post;
}

const Article = ({article}: ArticleProps) => {
  return (
    <article key={article.id}>
      <header>
        <h2>
          <Link to={routes.article({id: article.id})}> {article.title}</Link>
        </h2>
      </header>
      <p>{article.body}</p>
      <div>Posted at: {article.createdAt}</div>
    </article>
  );
};

export default Article;
