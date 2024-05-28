// import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Page() {
  const location = useLocation();
  const { id } = location.state;
  const [ updateLoading, setUpdateLoading ] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      axios
        .get(`${import.meta.env.VITE_APP_BASE_URL}books/${id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
          window.location.href = "/error";
        });
    }

    getData();
  }, [id]);

  const handleBooksUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const updatedData = {
      ...data,
      card_id: parseInt(data.card_id, 10),
      pages: parseInt(data.pages, 10),
    };

    setUpdateLoading(true);

    try {
      const response = await axios.put(`${import.meta.env.VITE_APP_BASE_URL}books/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    if (response.status == 200) {
      window.location.reload();
    }
    } catch (error) {
      console.error('Error:', error);
    }

    setUpdateLoading(false);
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}books/${id}`);

    if (response.status == 200) {
      window.location.href = "/dashboard";
    }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function showModal() {
    document.getElementById("my_modal_6").showModal();
  }

  function setOpenedContainer(container) {
    sessionStorage.setItem("opened", container);
    window.location = "/dashboard";
  }

  return (
    <>
      <Helmet>
        <title>Laman Buku</title>
        <link rel="icon" type="image/svg+xml" href="/icons/library-16.png" />
      </Helmet>

      <Navbar
        showBookList={() => {
          setOpenedContainer("container-book-list");
        }}
        showAddBook={() => {
          setOpenedContainer("container-add-book");
        }}
      />

      <div id="main-container" className="lg:ml-80 max-lg:mt-20 px-8">
        {data["data"] ? (
          <form
            onSubmit={handleBooksUpdate}
            className="flex max-md:flex-col max-md:items-center justify-center gap-16 max-md:gap-8 items-start max-w-5xl mx-auto py-20 max-sm:pb-10"
          >
            <div className="max-w-60 md:sticky md:top-10 flex items-center max-md:p-8 justify-center w-full -z-10">
              <img
                src="./src/assets/book-icon.jpg"
                className="w-full skeleton"
                alt="Book Cover"
              />
            </div>
            <div className="w-full max-w-lg">
              <input
                type="text"
                className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                defaultValue={data["data"].author}
                name="author"
                required
              />
              <input
                type="text"
                className="poppins-semibold mt-2 text-primary text-3xl max-sm:text-2xl block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                defaultValue={data["data"].title}
                name="title"
                required
              />
              <div className="divider"></div>
              <label className="block mt-20 max-md:mt-10 mb-2 poppins-semibold">
                Deskripsi:
              </label>
              <textarea
                className="focus:outline focus:outline-primary bg-base-100 w-full overflow-auto no-scrollbar min-h-40 rounded-lg"
                defaultValue={data["data"].description}
                name="description"
                required
              ></textarea>
              <div className="divider"></div>

              <label className="block mt-10 poppins-semibold mb-2">
                Detail:
              </label>
              <div className="grid gap-4 grid-cols-2 max-md:grid-cols-1">
                <div>
                  <div>Penerbit:</div>
                  <input
                    type="text"
                    className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                    defaultValue={data["data"].publisher}
                    name="publisher"
                    required
                  />
                </div>
                <div>
                  <div>Tahun Terbit:</div>
                  <input
                    type="date"
                    className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                    defaultValue={data["data"].published_date}
                    name="published_date"
                    required
                  />
                </div>
                <div>
                  <div>ISBN:</div>
                  <input
                    type="text"
                    className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                    defaultValue={data["data"].isbn}
                    name="isbn"
                    required
                  />
                </div>
                <div>
                  <div>Bahasa:</div>
                  <input
                    type="text"
                    className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                    defaultValue={data["data"].language}
                    name="language"
                    required
                  />
                </div>
                <div>
                  <div>Jumlah Halaman:</div>
                  <input
                    type="number"
                    className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                    min="0"
                    defaultValue={data["data"].pages}
                    name="pages"
                    required
                  />
                </div>
                <div>
                  <div>ID RFID:</div>
                  <input
                    type="number"
                    className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                    min="0"
                    defaultValue={data["data"].card_id}
                    name="card_id"
                    required
                  />
                </div>
                <div>
                  <div>Genre:</div>
                  <input
                    type="text"
                    className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                    defaultValue={data["data"].genre}
                    name="genre"
                    required
                  />
                </div>
              </div>
              <div className="divider"></div>

              <div className="btn-container flex mt-4 gap-2">
                <button type="submit" className="btn btn-primary">
                  {updateLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Update"
                  )}
                </button>
                <div className="btn btn-warning" onClick={showModal}>
                  Delete
                </div>
              </div>
            </div>
          </form>
        ) : null}

        <div className="divider"></div>

        <div className="max-w-6xl w-full mx-auto mt-10 max-sm:mt-4 xl:px-10 max-sm:pb-10 pb-20">
          <div className="text-primary poppins-semibold text-3xl max-sm:text-2xl mb-10">
            Riwayat Transaksi
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-sm">
                  <th></th>
                  <th>ID Pemeinjam</th>
                  <th>Waktu Pinjam</th>
                  <th>Batas Waktu</th>
                  <th>Waktu Kembali</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                <tr className="hover">
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <dialog
        id="my_modal_6"
        className="modal modal-bottom sm:modal-middle flex items-center justify-center max-lg:px-8"
      >
        <div className="modal-box p-10 max-lg:p-8 rounded-xl">
          <h3 className="poppins-bold text-xl">Delete!</h3>
          <p className="py-4 text-lg">Anda yakin untuk menghapus buku ini?</p>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary mr-1">No</button>
            </form>
            <form onSubmit={handleDelete}>
              <input
                type="submit"
                value="Yes"
                className="btn btn-active btn-warning"
              />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
