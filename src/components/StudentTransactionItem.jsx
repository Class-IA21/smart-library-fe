import PropTypes from "prop-types";

TransactionItem.propTypes = {
  id: PropTypes.string,
  bookIds: PropTypes.array,
  number: PropTypes.number,
  borrowDate: PropTypes.string,
  dueDate: PropTypes.string,
  returnDate: PropTypes.string,
  status: PropTypes.string,
};

TransactionItem.defaultProps = {
  bookIds: ["-"],
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
