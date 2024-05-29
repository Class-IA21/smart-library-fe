import { Helmet } from "react-helmet";
// if (sessionStorage.getItem("auth")) sessionStorage.removeItem("auth");

export default function NoPage() {
  return (
    <>
      <Helmet>
        <title>Error</title>
        <link rel="icon" type="image/svg+xml" href="/icons/library-16.png" />
      </Helmet>
      <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
        <div className="text-primary text-7xl poppins-bold">404</div>
        <span className="text-xl">
          Something went wrong!{" "}
          <a className="link-hover link-primary" href="/">
            Go back!
          </a>
        </span>
      </div>
    </>
  );
}
