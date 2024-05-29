import PropTypes from "prop-types";

ContainerAddBook.propTypes = {
  activeSection: PropTypes.string.isRequired,
  bookLoading: PropTypes.bool.isRequired,
  handlePostBook: PropTypes.func.isRequired,
};

export default function ContainerAddBook({
  activeSection,
  bookLoading,
  handlePostBook,
}) {
  return (
    <>
      <div
        id="container-add-book"
        className={`w-full max-w-7xl mx-auto pt-8 ${
          activeSection !== "container-add-book" ? "hidden" : ""
        }`}
      >
        <h2 className="text-4xl max-sm:text-3xl text-center poppins-bold text-primary px-4">
          Tambahkan Buku Baru
        </h2>
        <div className="divider"></div>
        <form
          onSubmit={handlePostBook}
          className="w-full max-w-4xl mx-auto mt-8 max-lg:px-4"
        >
          <label>Masukan judul buku</label>
          <input
            type="text"
            placeholder="Judul Buku"
            className="input input-bordered input-primary w-full my-2 lg:my-4"
            name="title"
            required
          />
          <div className="divider"></div>

          <label>Masukan penulis buku</label>
          <input
            type="text"
            placeholder="Penulis"
            className="input input-bordered input-primary w-full my-2 lg:my-4"
            name="author"
            required
          />
          <div className="divider"></div>

          <label>Masukan penerbit buku</label>
          <input
            type="text"
            placeholder="Penerbit"
            className="input input-bordered input-primary w-full my-2 lg:my-4"
            name="publisher"
            required
          />
          <div className="divider"></div>

          <label>Masukan nomor ISBN</label>
          <input
            type="text"
            placeholder="***-*-**-******-*"
            className="input input-bordered input-primary w-full my-2 lg:my-4"
            name="isbn"
            required
          />
          <div className="divider"></div>

          <label>Masukan UID</label>
          <input
            type="number"
            min="0"
            placeholder="UID"
            className="input input-bordered input-primary w-full my-2 lg:my-4"
            name="card_id"
            required
            readOnly
          />
          <div className="divider"></div>

          <label>Masukan Bahasa:</label>
          <input
            type="text"
            placeholder="Bahasa"
            className="input input-bordered input-primary w-full my-2 lg:my-4"
            name="language"
            required
          />
          <div className="divider"></div>

          <label>Masukan Genre:</label>
          <input
            type="text"
            placeholder="Genre"
            className="input input-bordered input-primary w-full my-2 lg:my-4"
            name="genre"
            required
          />
          <div className="divider"></div>

          <label>Masukan Jumlah Halaman:</label>
          <input
            type="number"
            placeholder="Jumlah Halaman"
            className="input input-bordered input-primary w-full my-2 lg:my-4"
            name="pages"
            required
          />
          <div className="divider"></div>

          <label>Masukan tahun terbit</label>
          <input
            type="date"
            className="input input-bordered input-primary w-full my-2 lg:my-4"
            name="published_date"
            required
          />
          <div className="divider"></div>

          <label>Masukan deskripsi buku</label>
          <textarea
            className="textarea textarea-primary my-2 lg:my-4 block w-full"
            placeholder="Deskripsi buku"
            name="description"
            required
          ></textarea>
          <div className="divider"></div>

          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="btn btn-primary mb-20"
              value="Tambahkan"
            >
              {bookLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Add Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
