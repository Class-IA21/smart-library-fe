import Navbar from "../components/Navbar";
import BookItem from "../components/BookItem"; 
import { useState, useEffect } from 'react';
import axios from "axios";


export default function Dashboard() {
  const [activeSection, setActiveSection] = useState(sessionStorage.getItem('opened') || 'container-book-list');

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function setOpenedContainer(container) {
    sessionStorage.setItem('opened', container);
    setActiveSection(container);
  }


  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar
        onBookList={() => setOpenedContainer("container-book-list")}
        onAddList={() => setOpenedContainer("container-add-book")}
      />
      <div className="lg:ml-80 max-lg:mt-20 sm:p-8">
        <div
          id="container-book-list"
          className={`grid max-[300px]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-x-4 lg:gap-y-8 max-lg:gap-x-2 max-lg:gap-y-4 max-w-7xl mx-auto max-lg:pt-4 ${
            activeSection !== "container-book-list" ? "hidden" : ""
          }`}
        >
          <BookItem
            id="asdjs"
            imgSrc="./src/assets/buku1.jpg"
            author="G. Dani"
            title="Keep Up With Us!"
            status1="dipinjam"
            statusClass="text-warning"
          />
          <BookItem
            id="asdhasj"
            imgSrc="./src/assets/buku2.jpg"
            author="Rintik Sedu"
            title="Kata"
            status1="tersedia"
            statusClass="text-success"
          />
          <BookItem
            id="ahshashhs"
            imgSrc="./src/assets/buku3.jpg"
            author="Tere Liye"
            title="Si Anak Pintar"
            status1="tersedia"
            statusClass="text-success"
          />
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
          <form action="" className="w-full max-w-xl mx-auto mt-8 max-lg:px-4">
            <label className="">Masukan gambar buku</label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full my-2 lg:my-4"
              name="images"
              required
            />
            <div className="divider"></div>

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
              type="number"
              placeholder="*************"
              className="input input-bordered input-primary w-full my-2 lg:my-4"
              name="isbn"
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

            <input
              type="submit"
              className="btn btn-primary mb-20"
              value="Tambahkan"
            />
          </form>
        </div>
      </div>
    </>
  );
}
