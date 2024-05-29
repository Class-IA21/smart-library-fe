import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

StudentItem.propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  npm: PropTypes.string.isRequired,
  cardId: PropTypes.number.isRequired,
};

export default function StudentItem({ id, number, name, npm, cardId }) {

  const [ uid, setUid ] = useState("");

  useEffect(() => {
    const getUID = async () => {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}cards/${cardId}`);

      if (response.status == 200) setUid(response.data.data.uid);
    }

    getUID();
  }, [cardId]);



  return (
    <tr className="hover">
      <th>{number}</th>
      <td>{name}</td>
      <td>{npm}</td>
      <td>{uid}</td>
      <td>
        <Link
          to="/student"
          className="btn btn-primary"
          state={{ id: id, name: name, npm: npm, cardId: cardId }}
        >
          Lihat
        </Link>
      </td>
    </tr>
  );
}
