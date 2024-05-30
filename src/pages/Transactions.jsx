import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import TransactionItem from "../components/TransactionItem";

export default function Cards() {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    async function getTransactions() {
      axios
        .get(`${import.meta.env.VITE_APP_BASE_URL}borrows`)
        .then((response) => {
          setTransaction(response.data.data.transactions);
        })
        .catch((error) => {
          console.error(error);
          window.location = "/error";
        });
    }

    getTransactions();
  }, []);

  function setOpenedContainer(container) {
    sessionStorage.setItem("opened", container);
    window.location = "/dashboard";
  }

  return (
    <>
      <Helmet>
        <title>Transaksi</title>
        <link rel="icon" type="image/svg+xml" href="/icons/library-16.png" />
      </Helmet>

      <div className="lg:ml-80 max-lg:mt-28 sm:p-8 xl:px-10 px-8">
        <div
          id="container-transactions"
          className="w-full max-w-7xl mx-auto pt-8"
        >
          <div className="max-w-6xl w-full mx-auto mt-10 xl:px-10 min-h-screen">
            <div className="text-primary poppins-semibold text-3xl max-sm:text-2xl mb-10">
              Transaksi
            </div>

            <div className="divider"></div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-sm">
                    <th></th>
                    <th>ID Transaksi</th>
                    <th>ID Buku</th>
                    <th>Tanggal Pinjam</th>
                    <th>Tanggal Akhir</th>
                    <th>Tanggal Kembali</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction && transaction.length > 0
                    ? transaction.map((trx, index) => {
                        return (
                          <TransactionItem
                            id={trx.id}
                            key={index}
                            number={index + 1}
                            bookIds={trx.book_ids}
                            borrowDate={trx.borrow_date}
                            dueDate={trx.due_date}
                            returnDate={trx.return_date}
                            status={trx.status}
                          />
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
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
