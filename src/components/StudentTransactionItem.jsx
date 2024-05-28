import PropTypes from "prop-types";

TransactionItem.propTypes = {
  id: PropTypes.string.isRequired,
  bookIds: PropTypes.array.isRequired,
  number: PropTypes.number.isRequired,
  borrowDate: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  returnDate: PropTypes.string,
  status: PropTypes.string.isRequired,
};

export default function TransactionItem({
  number,
  id,
  bookIds,
  borrowDate,
  dueDate,
  returnDate,
}) {
  return (
    <tr className="hover">
      <th>{number}</th>
      <th>{id}</th>
      <td>
        {bookIds.map((bookId) => {
          <div className="list-disc">{bookId}</div>;
        })}
      </td>
      <td>{borrowDate}</td>
      <td>{dueDate}</td>
      <td>{returnDate}</td>
    </tr>
  );
}
