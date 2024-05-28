import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import StudentItem from "../components/StudentItem";

export default function Cards() {
  const [students, setStudents] = useState({});

  useEffect(() => {
    async function getTransactions() {
      axios
        .get(`${import.meta.env.VITE_APP_BASE_URL}students`)
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          console.error(error);
          // window.location = "/error";
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
        <title>Daftar Siswa</title>
        <link rel="icon" type="image/svg+xml" href="/icons/library-16.png" />
      </Helmet>

      <div className="lg:ml-80 max-lg:mt-28 sm:p-8 xl:px-10 px-8">
        <div
          id="container-transactions"
          className="w-full max-w-7xl mx-auto pt-8"
        >
          <div className="max-w-6xl w-full mx-auto mt-10 xl:px-10 min-h-screen">
            <div className="text-primary poppins-semibold text-3xl max-sm:text-2xl mb-10">
              Daftar Siswa
            </div>

            <div className="divider"></div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-sm">
                    <th></th>
                    <th>Nama</th>
                    <th>NPM</th>
                    <th>ID Kartu</th>
                    <th>Lihat</th>
                  </tr>
                </thead>
                <tbody>
                  {students.data && students.data.length > 0
                    ? students.data.map((student, index) => {
                        return (
                          <StudentItem
                            key={index}
                            number={index + 1}
                            name={student.name}
                            npm={student.npm}
                            cardId={student.card_id}
                            id={student.id}
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
