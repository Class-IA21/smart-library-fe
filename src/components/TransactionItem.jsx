import PropTypes from "prop-types";

TransactionItem.propTypes = {
  bookIds: PropTypes.array.isRequired,
  number: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  borrowDate: PropTypes.string.isRequired, // Corrected PropTypes
  returnDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};


export default function TransactionItem({
  number,
  id,
  bookIds,
  borrowDate,
  dueDate,
  returnDate,
  status,
}) {
  return (
    <tr className="hover">
      <th>{number}</th>
      <td>{id}</td>
      <td>
        {bookIds.map((bookId, index) => (
          <div key={index} className="list-disc">
            {bookId}
          </div>
        ))}
      </td>
      <td>{borrowDate}</td>
      <td>{dueDate}</td>
      <td>{returnDate}</td>
      <td>{status}</td>
    </tr>
  );
}
