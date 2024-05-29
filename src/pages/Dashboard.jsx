import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import BookItem from "../components/BookItem"; // Path corrected
import { Helmet } from "react-helmet";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState(
    sessionStorage.getItem("opened") || "container-book-list"
  );
  const [books, setBooks] = useState({});
  const [bookLoading, setBookLoading] = useState(false);

  function setOpenedContainer(container) {
    sessionStorage.setItem("opened", container);
    setActiveSection(container);
  }
  const [uid, setUid] = useState('');

  const fetchUID = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_APP_BASE_URL + "cards/container_card"); // Update the endpoint if necessary
      if(response.status == 200){
        console.log(response.data.data.uid)
        setUid(response.data.data.uid);
      }
    } catch (error) {
      // console.error('Error fetching UID:', error);
    }
  };

  useEffect(() => {
    async function getBooks() {
      axios
        .get(import.meta.env.VITE_APP_BASE_URL + "books")
        .then((response) => {
          setBooks(response.data);
        })
        .catch((error) => {
          console.error(error);
          window.location.href = "/error";
        });
    }

    fetchUID();
    getBooks();

    // Fetch every 500ms
    const interval = setInterval(fetchUID, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handlePostBook = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const updatedData = {
      ...data,
      card_id: parseInt(data.card_id, 10),
      pages: parseInt(data.pages, 10),
    };

    setBookLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}books`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      if (!response.data.error) {
        event.target.reset();
        alert("Upload Successful");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Update failed!");
    }

    setBookLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Laman Dashboard</title>
        <link rel="icon" type="image/svg+xml" href="/icons/library-16.png" />
      </Helmet>

      <div className="lg:ml-80 max-lg:mt-20 sm:p-8">
        <div
          id="container-book-list"
          className={`grid max-[300px]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-x-4 lg:gap-y-8 max-lg:gap-x-2 max-lg:gap-y-4 max-w-7xl mx-auto max-lg:pt-4 ${
            activeSection !== "container-book-list" ? "hidden" : ""
          }`}
        >
          {books.data && books.data.length > 0
            ? books.data.map((book, index) => {
                return (
                  <BookItem
                    key={index}
                    id={book.id}
                    author={book.author}
                    title={book.title}
                    cardID={book.card_id}
                  />
                );
              })
            : null}
        </div>

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
              type="text"
              min="0"
              placeholder="ID RFID"
              className="input input-bordered input-primary w-full my-2 lg:my-4"
              name="card_id"
              value={uid}
              required
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
          </form>
        </div>
      </div>

      <Navbar
        showBookList={() => setOpenedContainer("container-book-list")}
        showAddBook={() => setOpenedContainer("container-add-book")}
      />
    </>
  );
}
