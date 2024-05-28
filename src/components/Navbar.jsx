import { Link } from "react-router-dom";
import PropTypes from "prop-types";

Navbar.propTypes = {
  showBookList: PropTypes.func.isRequired,
  showAddBook: PropTypes.func.isRequired,
};

export default function Navbar({showBookList, showAddBook}) {
  const showModal = () => {
    document.getElementById('my_modal_5').showModal();
  }

  let auth;
  if (sessionStorage.getItem('auth')) {
    auth = JSON.parse(sessionStorage.getItem("auth"));
  } else {
    window.location.href = "/";
  }

  const logout = () => {
    sessionStorage.removeItem("auth");
    window.location.reload();
  }  

  return (
    <>
      <div className="drawer-content flex items-center lg:hidden fixed top-0 left-0 w-screen h-20 shadow-md px-8 border-b border-primary bg-base-100">
        <label
          htmlFor="my-drawer"
          className="drawer-button transition-all active:scale-80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#470FF4"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
          </svg>
        </label>
      </div>

      <nav className="drawer lg:drawer-open fixed left-0 top-0 w-fit overflex-y-auto">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="px-8 py-10 w-80 min-h-full bg-base-100 border-r border-primary flex flex-col justify-between">
            <ul className="w-full">
              <li className="px-8">
                <Link to="/" className="flex gap-2 items-center">
                  <div className="w-[80px]">
                    <img
                      src="/icons/library-100.png"
                      className="w-full rounded-full bg-base-100 skeleton"
                      alt="Library"
                    />
                  </div>
                  <h1 className="text-3xl poppins-bold tracking-wide">SPC</h1>
                </Link>
              </li>
              <div className="divider"></div>
              <li className="mb-2">
                <button
                  id="btn-book-list"
                  className="btn w-full py-2 px-4"
                  onClick={() => showBookList()}
                >
                  Daftar Buku
                </button>
              </li>
              <li className="mb-2">
                <button
                  id="btn-add-book"
                  className="btn w-full py-2 px-4"
                  onClick={() => showAddBook()}
                >
                  Tambah Buku
                </button>
              </li>
              <li className="mb-2">
                <Link
                  id="btn-cards"
                  className="btn w-full py-2 px-4"
                  to={"/cards"}
                >
                  Kartu RFID
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  id="transactions"
                  className="btn w-full py-2 px-4"
                  to={"/transactions"}
                >
                  Transaksi
                </Link>
              </li>
            </ul>
            <div className="w-full py-10">
              <div className="flex flex-col gap-2 px-4 py-2 mb-4">
                <h1 className="text-sm poppins-semibold">
                  Hi! {auth ? auth.level : null}
                </h1>
                <h1 className="text-xs">{auth ? auth.email : null}</h1>
              </div>
              <div>
                <button
                  id="btn-logout"
                  className="btn btn-primary w-full py-2 px-4"
                  onClick={showModal}
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle flex items-center justify-center max-lg:px-8"
      >
        <div className="modal-box p-10 max-lg:p-8 rounded-xl">
          <h3 className="poppins-bold text-xl">Logout!</h3>
          <p className="py-4 text-lg">Anda yakin untuk keluar?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary mr-1">No</button>
            </form>
            <button onClick={logout} className="btn btn-active btn-warning">
              Yes
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}