// eslint-disable-next-line react/prop-types
export default function CardItem({id, number, uid, type, action}) {
  return (
    <tr className="hover">
      <th>{number}</th>
      <td>{id}</td>
      <td>{uid}</td>
      <td>{type}</td>
      <td>
        <button className="btn btn-warning" onClick={action}>Delete</button>
      </td>
    </tr>
  );
}