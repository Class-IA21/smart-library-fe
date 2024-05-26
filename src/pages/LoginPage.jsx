import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function LoginPage() {
  useEffect(() => {
    function setIntersection() {
      const mainObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelector('#main-container')?.classList.remove('scale-0', 'translate-y-10');
            document.querySelector('#laman-login-img')?.classList.remove('-translate-x-40');
          }
        });
      });

      mainObserver.observe(document.getElementById('main-container'));
    }

    setIntersection();
  }, []);

  return (
    <>
      <Helmet>
        <title>Laman Login</title>
        <link rel="icon" type="image/svg+xml" href="/icons/library-16.png" />
      </Helmet>
      <div
        id="laman-login-img"
        className="w-[1000px] fixed -top-48 -left-[400px] -z-10 -translate-x-40 transition-all duration-700"
      >
        <img src="/icons/Bibliophile-bro.svg" className="w-full" alt="Bibliophile" />
      </div>
      <div id='main-container' className="w-full min-h-screen flex items-center justify-center scale-0 translate-y-10 duration-700 transition-all">
        <form
          action=""
          className="w-full max-w-md shadow-xl rounded-3xl px-8 py-10 bg-base-100/70 backdrop-blur-sm max-sm:translate-y-10"
        >
          <div className="flex gap-2 items-center mb-6">
            <div className="w-[100px]">
              <img
                src="/icons/library-100.png"
                className="w-full rounded-full bg-base-100 skeleton"
                alt="Library Icon"
              />
            </div>
            <h1 className="text-3xl poppins-bold tracking-wide">SPC</h1>
          </div>

          <label className="input input-bordered flex items-center gap-2 mb-4 bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 max-[400px]:hidden"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className="grow" placeholder="Username" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-6 bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 max-[400px]:hidden"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="password" className="grow" placeholder="Password" />
          </label>
          <div className="w-full text-center">
            <input type="submit" value="Masuk" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </>
  );
}

