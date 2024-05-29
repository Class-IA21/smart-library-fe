import { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserTransaction() {
  const [trx, setTrx] = useState({});
  const [studentName, setStudentName] = useState("");
  const [bookTitles, setBookTitles] = useState([]);
  const { trxID, studentID, bookIDs } = useParams();

  const booksArr = useMemo(() => bookIDs.split(","), [bookIDs]);

  useEffect(() => {
    const handleGetTransactionByID = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/borrows/${trxID}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setTrx(response.data);

          const studentResponse = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/students/${
              response.data.student_id
            }`
          );

          if (studentResponse.status === 200) {
            setStudentName(studentResponse.data.data.name);
          }

          const bookTitlePromises = booksArr.map(async (book_id) => {
            const bookResponse = await axios.get(
              `${import.meta.env.VITE_APP_BASE_URL}/books/${book_id}`
            );
            if (bookResponse.status === 200) {
              return bookResponse.data.data.title;
            }
          });

          const bookTitles = await Promise.all(bookTitlePromises);
          setBookTitles(bookTitles.filter((title) => title)); 
        }
      } catch (error) {
        console.error(error);
        window.location.href = "/error";
      }
    };

    handleGetTransactionByID();
  }, [trxID, studentID, booksArr]);

  const data = useMemo(
    () => ({
      name: studentName,
      bookTitle: bookTitles,
      borrowDate: trx.borrow_date,
      dueDate: trx.due_date,
      returnDate: trx.return_date,
    }),
    [studentName, bookTitles, trx]
  );

  return (
    <>
      <Helmet>
        <title>Laman Transaksi</title>
        <link rel="icon" type="image/svg+xml" href="/icons/library-16.png" />
      </Helmet>

      <div
        id="main-container"
        className="w-full min-h-screen flex items-center justify-center duration-700 transition-all bg-base-100"
      >
        <div className="w-full max-w-md shadow-xl rounded-3xl px-8 py-10 bg-base-100/70 backdrop-blur-sm poppins-semibold">
          <div className="flex gap-2 mb-2">
            <label>Nama:</label>
            <div>{data.name || "Arya Ulya Krisna"}</div>
          </div>
          <div className="flex gap-2 mb-2">
            <label>ID Transaksi:</label>
            <div>{trx.transaction_id || "0023948903094"}</div>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-2 mb-2">
            <label>Judul Buku:</label>
            <ul className="pl-2">
              {data.bookTitle.map((title, index) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
          </div>
          <div className="divider"></div>
          <div className="flex gap-2 mb-2">
            <label>Tanggal Pinjam:</label>
            <div className="text-success">{data.borrowDate || "30/24/123"}</div>
          </div>
          <div className="divider"></div>
          <div className="flex gap-2 mb-2">
            <label>Tengat Pinjam:</label>
            <div className="text-warning">{data.dueDate || "30/24/123"}</div>
          </div>
          <div className="divider"></div>
          <div className="flex gap-2 mb-2">
            <label>Tanggal Pengembalian:</label>
            <div>{data.returnDate || "30/24/123"}</div>
          </div>
        </div>
      </div>
    </>
  );
}
