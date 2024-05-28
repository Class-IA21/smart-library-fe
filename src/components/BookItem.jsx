import { Link } from "react-router-dom";

import PropTypes from "prop-types";

BookItem.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  pages: PropTypes.number.isRequired,
};

export default function BookItem({id, author, title, pages}) {
  return (
    <Link className="grid-items" to="/book" state={{ id: id }}>
      <div className="w-full skeleton overflow-y-hidden max-h-60">
        <img src="./src/assets/book-icon.jpg" className="w-full" alt="Book Cover" />
      </div>
      <div className="p-4">
        <div className="text-sm mb-2">{author}</div>
        <div className="text-sm poppins-semibold mb-3 text-primary">
          {title}
        </div>
        <div className={`italic text-sm leading-relaxed text-success`}>
          Halaman: <span>{pages}</span>
        </div>
      </div>
    </Link>
  );
}
