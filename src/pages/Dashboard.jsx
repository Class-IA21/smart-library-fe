import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import BookItem from "../components/BookItem";
import ContainerAddBook from "../components/ContainerAddBook";
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

    getBooks();
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
        alert("Upload Successful!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Upload Failed!");
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
        
        <ContainerAddBook activeSection={activeSection} handlePostBook={handlePostBook} bookLoading={bookLoading}/>

      </div>

      <Navbar
        showBookList={() => setOpenedContainer("container-book-list")}
        showAddBook={() => setOpenedContainer("container-add-book")}
      />
    </>
  );
}
