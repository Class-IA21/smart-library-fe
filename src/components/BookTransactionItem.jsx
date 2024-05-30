import PropTypes from "prop-types";

BookTransactionItem.propTypes = {
  number: PropTypes.number.isRequired,
  transactionId: PropTypes.string.isRequired,
  studentId: PropTypes.number.isRequired,
  dueDate: PropTypes.string.isRequired,
  borrowDate: PropTypes.string.isRequired, // Corrected PropTypes
  returnDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default function BookTransactionItem({
  number,
  transactionId,
  studentId,
  borrowDate,
  dueDate,
  returnDate,
  status,
}) {
  return (
    <tr className="hover">
      <th>{number}</th>
      <td>{transactionId}</td>
      <td>{studentId}</td>
      <td>{borrowDate}</td>
      <td>{dueDate}</td>
      <td>{returnDate}</td>
      <td>{status}</td>
    </tr>
  );
}
