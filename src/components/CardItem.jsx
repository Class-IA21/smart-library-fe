import PropTypes from "prop-types";

CardItem.propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  uid: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default function CardItem({ id, number, uid, type, action }) {
  return (
    <tr className="hover">
      <th>{number}</th>
      <td>{id}</td>
      <td>{uid}</td>
      <td>{type}</td>
      <td>
        <button className="btn btn-warning" onClick={action}>
          Delete
        </button>
      </td>
    </tr>
  );
}
