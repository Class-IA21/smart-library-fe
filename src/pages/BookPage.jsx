// import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import TransactionItem from "../components/TransactionItem";
import FormBookPage from "../components/FormBookPage";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Page() {
  const location = useLocation();
  const { id, cardID } = location.state;

  if (!id) {
    window.location.href = "/dashboard";
  }

  const [updateLoading, setUpdateLoading] = useState(false);

  const [data, setData] = useState({});
  const [transactions, setTransactions] = useState({});

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

    async function getTransactions(id) {
      axios
        .get(`${import.meta.env.VITE_APP_BASE_URL}borrows/book/${id}`)
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((error) => {
          console.error(error);
          window.location = "/error";
        });
    }

    getData();
    getTransactions(id);
  }, [id]);

  const handleBooksUpdate = async (event) => {
    event.preventDefault();
    setUpdateLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}cards/check_card?uid=${data.card_id}`
    );

    let res
    if (response.status === 200) res = response.data.data.card_id;

    const updatedData = {
      ...data,
      card_id: parseInt(res, 10),
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}books/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Update failed!");
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}books/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Update failed!");
    }

    setUpdateLoading(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}books/${id}`
      );

      if (response.status == 200) {
        const response = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}cards/${cardID}`
        );

        if (response.status == 200) {
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Delete failed!");
    }
  };

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

      <div id="main-container" className="lg:ml-80 max-lg:mt-20 px-8 z-10">
        {data["data"] ? (
          <FormBookPage
            dataObj={data}
            handleDelete={handleDelete}
            handleBooksUpdate={handleBooksUpdate}
            updateLoading={updateLoading}
          />
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
                  <th>ID Peminjam</th>
                  <th>Waktu Pinjam</th>
                  <th>Batas Waktu</th>
                  <th>Waktu Kembali</th>
                </tr>
              </thead>
              <tbody>
                {transactions.data && transactions.data.length > 0
                  ? transactions.data.map((transaction, index) => {
                      return (
                        <TransactionItem
                          key={index}
                          number={index + 1}
                          bookId={transaction.book_id}
                          studentId={transaction.student_id}
                          borrowDate={transaction.borrow_date}
                          dueDate={transaction.due_date}
                          returnDate={transaction.return_date}
                          status={transaction.status}
                        />
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Navbar
        showBookList={() => {
          setOpenedContainer("container-book-list");
        }}
        showAddBook={() => {
          setOpenedContainer("container-add-book");
        }}
      />
    </>
  );
}
