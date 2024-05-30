import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";

FormUpdateStudent.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  npm: PropTypes.string.isRequired,
  cardId: PropTypes.number.isRequired,
};

export default function FormUpdateStudent({ id, name, npm, cardId }) {
  const [uid, setUid] = useState("");
  const [updateStudentLoading, setUpdateStudentLoading] = useState(false);
  const fetchUID = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "cards/container_card"
      );
      if (response.status == 200) {
        console.log(response.data.data.uid);
        setUid(response.data.data.uid);
      }
    } catch (error) {
      console.error("Error fetching UID:", error);
    }
  };

  useEffect(() => {
    const getUid = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}cards/${cardId}`
      );

      if (response.status == 200) {
        setUid(response.data.data.uid);
      } else {
        alert("Invalid Card ID!");
      }
    };

    getUid();
    fetchUID();

    const interval = setInterval(fetchUID, 2000)
    return () => clearInterval(interval);
  }, [cardId, uid]);

  const handleUpdateStudent = async (event) => {
    event.preventDefault();

    setUpdateStudentLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}cards/check_card?uid=${uid}`
    );

    if (response.status === 200) cardId = response.data.data.card_id;

    const updatedData = {
      ...data,
      card_id: parseInt(cardId, 10),
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

    setUpdateStudentLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleUpdateStudent}
        className="w-full mx-auto mt-8 max-lg:px-2 px-4 text-sm"
      >
        <label>Nama</label>
        <input
          type="text"
          placeholder="Judul Buku"
          className="input input-bordered input-primary w-full my-2 lg:my-4"
          name="name"
          value={name}
          required
        />
        <label>NPM</label>
        <input
          type="text"
          placeholder="NPM"
          className="input input-bordered input-primary w-full my-2 lg:my-4"
          name="npm"
          value={npm}
          required
        />
        <label>NPM</label>
        <input
          type="text"
          placeholder="UID"
          className="input input-bordered input-primary w-full my-2 lg:my-4"
          name="card_id"
          value={uid}
          required
        />

        <div className="divider"></div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary my-4"
            value="Tambahkan"
          >
            {updateStudentLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
