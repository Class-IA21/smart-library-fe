import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

FormBookPage.propTypes = {
  dataObj: PropTypes.object.isRequired,
  handleBooksUpdate: PropTypes.func.isRequired,
  updateLoading: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default function FormBookPage({
  dataObj,
  handleBooksUpdate,
  updateLoading,
  handleDelete,
}) {
  const [uid, setUid] = useState("");

  const fetchUID = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "cards/container_card"
      );
      if (response.status == 200) {
        console.log(response.data.data.uid);
        setUid(response.data.data.uid);
      }
    } catch (error) {
      console.error("Error fetching UID:", error);
    }
  };

  useEffect(() => {
    const getUid = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}cards/${dataObj.data.card_id}`
      );
      if (response.status == 200) {
        setUid(response.data.data.uid);
      } else {
        alert("Invalid Card ID!");
      }
    };

    getUid();
    fetchUID();
    const interval = setInterval(fetchUID, 2000);
    return () => clearInterval(interval);
  }, [dataObj.data.card_id]);

  function showModal() {
    document.getElementById("my_modal_6").showModal();
  }

  return (
    <>
      <form
        onSubmit={handleBooksUpdate}
        className="flex max-md:flex-col max-md:items-center justify-center gap-16 max-md:gap-8 items-start max-w-5xl mx-auto py-20 max-sm:pb-4"
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
            defaultValue={dataObj.data.author}
            name="author"
            required
          />
          <input
            type="text"
            className="poppins-semibold mt-2 text-primary text-3xl max-sm:text-2xl block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
            defaultValue={dataObj.data.title}
            name="title"
            required
          />
          <div className="divider"></div>
          <label className="block mt-20 max-md:mt-10 mb-2 poppins-semibold">
            Deskripsi:
          </label>
          <textarea
            className="focus:outline focus:outline-primary bg-base-100 w-full overflow-auto no-scrollbar min-h-40 rounded-lg"
            defaultValue={dataObj.data.description}
            name="description"
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
                defaultValue={dataObj.data.publisher}
                name="publisher"
                required
              />
            </div>
            <div>
              <div>Tahun Terbit:</div>
              <input
                type="date"
                className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                defaultValue={dataObj.data.published_date}
                name="published_date"
                required
              />
            </div>
            <div>
              <div>ISBN:</div>
              <input
                type="text"
                className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                defaultValue={dataObj.data.isbn}
                name="isbn"
                required
              />
            </div>
            <div>
              <div>Bahasa:</div>
              <input
                type="text"
                className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                defaultValue={dataObj.data.language}
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
                defaultValue={dataObj.data.pages}
                name="pages"
                required
              />
            </div>
            <div>
              <div>UID</div>
              <input
                type="number"
                className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                min="0"
                value={uid}
                name="card_id"
                required
              />
            </div>
            <div>
              <div>Genre:</div>
              <input
                type="text"
                className="block focus:outline focus:outline-primary bg-base-100 w-full rounded-lg"
                defaultValue={dataObj.data.genre}
                name="genre"
                required
              />
            </div>
          </div>
          <div className="divider"></div>
          <div className="btn-container flex mt-8 gap-2">
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
