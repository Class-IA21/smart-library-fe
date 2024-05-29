import { Link } from "react-router-dom";

import PropTypes from "prop-types";

BookItem.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cardID: PropTypes.number.isRequired,
};

export default function BookItem({id, author, title, cardID}) {
  return (
    <Link className="grid-items" to="/book" state={{ id: id, cardID: cardID }}>
      <div className="w-full skeleton overflow-y-hidden max-h-60">
        <img
          src="./src/assets/book-icon.jpg"
          className="w-full"
          alt="Book Cover"
        />
      </div>
      <div className="p-4">
        <div>
          <div className="text-sm mb-2">{author}</div>
          <div className="text-sm poppins-semibold mb-3 text-primary">
            {title}
          </div>
        </div>
        <div className={`italic text-sm leading-relaxed text-success`}>
          ID RFID: <span>{cardID}</span>
        </div>
      </div>
    </Link>
  );
}
