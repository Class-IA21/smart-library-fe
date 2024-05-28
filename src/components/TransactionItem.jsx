import PropTypes from "prop-types";

TransactionItem.propTypes = {
  bookId: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  studentId: PropTypes.number.isRequired,
  borrowDate: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  returnDate: PropTypes.string,
  status: PropTypes.string.isRequired,
};

export default function TransactionItem({
  bookId,
  number,
  studentId,
  borrowDate,
  dueDate,
  returnDate,
  status,
}) {
  return (
    <tr className="hover">
      <th>{number}</th>
      <td>{bookId}</td>
      <td>{studentId}</td>
      <td>{borrowDate}</td>
      <td>{dueDate}</td>
      <td>{returnDate}</td>
      <td>{status}</td>
    </tr>
  );
}
