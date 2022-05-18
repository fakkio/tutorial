import {Link, routes} from "@redwoodjs/router";
import {ReactNode} from "react";

type BlogLayoutProps = {
  children?: ReactNode;
};

const BlogLayout = ({children}: BlogLayoutProps) => {
  return (
    <>
      <header>
        <h1>
          <Link to={routes.home()}> Redwood Tutorial</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
            <li>
              <Link to={routes.contact()}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default BlogLayout;
