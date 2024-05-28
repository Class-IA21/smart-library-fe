// import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import TransactionItem from "../components/TransactionItem";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Page() {
  const location = useLocation();
  const { id, name, npm } = location.state;

  const [transactions, setTransactions] = useState({});

  useEffect(() => {

    async function getTransactions(id) {
      axios
        .get(`${import.meta.env.VITE_APP_BASE_URL}borrows/student/${id}`)
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((error) => {
          console.error(error);
          window.location = "/error";
        });
    }

    getTransactions(id);
  }, [id]);

  function setOpenedContainer(container) {
    sessionStorage.setItem("opened", container);
    window.location = "/dashboard";
  }

  return (
    <>
      <Helmet>
        <title>Laman Siswa</title>
        <link rel="icon" type="image/svg+xml" href="/icons/library-16.png" />
      </Helmet>

      <div id="main-container" className="lg:ml-80 max-lg:mt-28 mt-20 px-8 z-10">
        <div className="w-full max-w-lg">
          <table className="table w-[260px]">
            <tbody>
              <tr>
                <td>Id</td>
                <td>:</td>
                <td>{id}</td>
              </tr>
              <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td>NPM</td>
                <td>:</td>
                <td>{npm}</td>
              </tr>
            </tbody>
          </table>
        </div>

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
                  <th>ID</th>
                  <th>ID Buku</th>
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
                          id={transaction.id}
                          number={index + 1}
                          bookIds={transaction.book_ids}
                          borrowDate={transaction.borrow_date}
                          dueDate={transaction.due_date}
                          returnDate={transaction.return_date}
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
