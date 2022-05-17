import {Link, routes} from "@redwoodjs/router";
import {MetaTags} from "@redwoodjs/web";

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <p>Welcome to a redwood blog!</p>
    </>
  );
};

export default HomePage;
