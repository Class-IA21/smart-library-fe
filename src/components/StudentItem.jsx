import PropTypes from "prop-types";
import { Link } from "react-router-dom";

StudentItem.propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  npm: PropTypes.string.isRequired,
  cardId: PropTypes.number.isRequired,
};

export default function StudentItem({ id, number, name, npm, cardId }) {
  return (
    <tr className="hover">
      <th>{number}</th>
      <td>{name}</td>
      <td>{npm}</td>
      <td>{cardId}</td>
      <td>
        <Link to="/student" className="btn btn-primary" state={{ id: id, name: name, npm: npm }}>Lihat</Link>
      </td>
    </tr>
  );
}
