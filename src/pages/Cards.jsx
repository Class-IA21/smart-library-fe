import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CardItem from "../components/CardItem";
import { Helmet } from "react-helmet";

export default function Cards () {
  const [cards, setCards] = useState({});
  const [cardLoading, setCardLoading] = useState(false);
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
    async function getCards() {
      axios
        .get(import.meta.env.VITE_APP_BASE_URL + "cards")
        .then((response) => {
          setCards(response.data);
        })
        .catch((error) => {
          console.error(error);
          window.location.href = "/error";
        });
    }

    fetchUID();
    getCards();

    const interval = setInterval(fetchUID, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  function setOpenedContainer(container) {
    sessionStorage.setItem("opened", container);
    window.location = "/dashboard";
  }

  const handlePostCard = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setCardLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}cards`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 201) {
        window.location.reload();
      }
    
    } catch (error) {
      console.error("Error:", error);
      alert("Upload Error");
    }
    setCardLoading(false);
  };

  const handleDelete = async (id) => {

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}cards/${id}`
      );
      if (response.status == 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Delete Unsuccessful");
    }

  };

  return (
    <>
      <Helmet>
        <title>RFID</title>
        <link rel="icon" type="image/svg+xml" href="/icons/library-16.png" />
      </Helmet>

      <div className="lg:ml-80 max-lg:mt-28 sm:p-8">
        <div id="container-cards" className="w-full max-w-7xl mx-auto pt-8">
          <form
            className="flex max-md:flex-col gap-2 max-w-md md:items-center"
            onSubmit={handlePostCard}
          >
            <input
              type="text"
              placeholder="Masukan UID"
              className="input input-bordered input-primary"
              name="uid"
              value={uid}
              required
            />
            <select
              className="select-bordered border-primary select"
              name="type"
            >
              <option defaultValue="book">Book</option>
            </select>
            <button type="submit" className="btn btn-primary">
              {cardLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Add New Card"
              )}
            </button>
          </form>

          <div className="divider"></div>

          <div className="max-w-6xl w-full mx-auto mt-10 xl:px-10 px-8">
            <div className="text-primary poppins-semibold text-3xl max-sm:text-2xl mb-10">
              Daftar Kartu
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-sm">
                    <th></th>
                    <th>ID Kartu</th>
                    <th>UID</th>
                    <th>Tipe</th>
                  </tr>
                </thead>
                <tbody>
                  {cards.data && cards.data.length > 0
                    ? cards.data.map((card, index) => {
                        return (
                          <CardItem
                            key={index}
                            number={index + 1}
                            id={card.id}
                            uid={card.uid}
                            type={card.type}
                            action={() => {
                              handleDelete(card.id);
                            }}
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