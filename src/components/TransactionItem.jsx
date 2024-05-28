import PropTypes from "prop-types";

TransactionItem.propTypes = {
  bookIds: PropTypes.array.isRequired,
  number: PropTypes.number.isRequired,
  studentId: PropTypes.number.isRequired,
  dueDate: PropTypes.string.isRequired,
  returnDate: PropTypes.string,
  status: PropTypes.string.isRequired,
};

export default function TransactionItem({
  number,
  studentId,
  bookIds,
  dueDate,
  returnDate,
  status,
}) {
  return (
    <tr className="hover">
      <th>{number}</th>
      <td>{bookIds.map((bookId) => {
        <div className="list-disc">{bookId}</div>
      })}</td>
      <td>{studentId}</td>
      <td>{dueDate}</td>
      <td>{returnDate}</td>
      <td>{status}</td>
    </tr>
  );
}
