// import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function Page () {
  // const location = useLocation();
  // const { id } = location.state;

  const { data, setData } = useState([]);
  const { status, setStatus } = useState([]);
  const { error, setError } = useState(null);


  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + "books/1")
    .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })

    // axios
    //   .get(process.env.REACT_APP_BASE_URL + 1)
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((error) => {
    //     setError(error);
    // });
  });

  function showModal() {
    document.getElementById("my_modal_6").showModal();
  }

  function setOpenedContainer(container) {
    sessionStorage.setItem('opened', container);
    window.location = "/dashboard";
  }

  return (
    <>
      <Navbar
        onBookList={() => {
          setOpenedContainer("container-book-list");
        }}
        onAddList={() => {
          setOpenedContainer("container-add-book");
        }}
      />
      <div id="main-container" className="lg:ml-80 max-lg:mt-20 px-8">
        <form className="flex max-md:flex-col max-md:items-center justify-center gap-16 max-md:gap-8 items-start max-w-5xl mx-auto py-20">
          <div className="max-w-60 md:sticky md:top-10 flex items-center max-md:p-8 justify-center w-full -z-10">
            <img
              src="./src/assets/buku1.jpg"
              className="w-full skeleton"
              alt="Book Cover"
            />
          </div>
          <div className="w-full max-w-lg">
            <input
              type="text"
              className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
              defaultValue="G. Dani"
              required
            />
            <input
              type="text"
              className="poppins-semibold mt-2 text-primary text-2xl block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
              defaultValue="Keep Up With Us!"
              required
            />
            <div className="divider"></div>
            <label className="block mt-20 max-md:mt-10 mb-2 poppins-semibold">
              Deskripsi:
            </label>
            <textarea
              className="focus:outline focus:outline-primary bg-base-100 w-full overflow-auto no-scrollbar min-h-40 rounded-lg"
              defaultValue={`Keep Up with Us! merupakan fiksi sastra jenis novel karya G. Dani. Dengan gaya bercerita yang kekinian dan konflik yang sangat dekat dengan pembaca, Keep Up with Us menjadi pemenang di Wattys di ajang Wattys 2020 kategori New Adult.`}
              required
            ></textarea>
            <div className="divider"></div>

            <label className="block mt-10 poppins-semibold mb-2">Detail:</label>
            <div className="grid gap-4 grid-cols-2 max-md:grid-cols-1">
              <div>
                <div>Penerbit:</div>
                <input
                  type="text"
                  className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                  defaultValue="Elex Media Komputindo"
                  required
                />
              </div>
              <div>
                <div>Tahun Terbit:</div>
                <input
                  type="number"
                  min="1900"
                  max="2099"
                  className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                  defaultValue="2022"
                  required
                />
              </div>
              <div>
                <div>ISBN:</div>
                <input
                  type="number"
                  className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                  defaultValue="9786230032448"
                  required
                />
              </div>
              <div>
                <div>Status:</div>
                <div className="text-warning">Dipinjam</div>
              </div>
              <div>
                <div>Bahasa:</div>
                <input
                  type="text"
                  className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                  defaultValue="Indonesia"
                  required
                />
              </div>
              <div>
                <div>Jumlah Halaman:</div>
                <input
                  type="number"
                  className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                  min="0"
                  defaultValue="244"
                  required
                />
              </div>
              <div>
                <div>Genre:</div>
                <input
                  type="text"
                  className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                  defaultValue="Romance"
                  required
                />
              </div>
              <div>
                <div>Pemijam:</div>
                <div>Nabila Alawiyah (24/5/2024)</div>
              </div>
            </div>
            <div className="divider"></div>

            <div className="btn-container flex mt-4 gap-2">
              <input type="submit" className="btn btn-primary" value="Update" />
              <div className="btn btn-warning" onClick={showModal}>
                Delete
              </div>
            </div>
          </div>
        </form>
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
            <form action="logout.php" method="post">
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