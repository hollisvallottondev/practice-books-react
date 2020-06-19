import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const BookCard = ({
  handleBookSelected,
  handleCancel,
  handleBookSave,
  handleBookDelete,
  index,
  book,
  edit,
}) => {
  const [bookValues, setBookValues] = useState({});

  const handleSelect = (index) => {
    if (handleBookSelected) handleBookSelected(index);
  };
  const handleChange = (key, value) => {
    setBookValues({ ...bookValues, [key]: value });
  };

  const handleDelete = (event) => {
    handleBookDelete(index);
    event.stopPropagation();
  };

  useEffect(() => {
    setBookValues(book);
  }, [book]);

  const { id, ...bookProps } = bookValues;

  return (
    <div
      className={`${styles.cardContainer} ${
        handleBookSelected ? styles.hover : ""
      }`}
      onClick={() => handleSelect(index)}
    >
      <div className={styles.detailsContainer}>
        <div className={styles.cardHeader}>
          <h3>{bookValues.title}</h3>
        </div>
        <div className={styles.cardDescription}>
          {Object.keys(bookProps).map((key) => {
            if ((key === "title" && edit) || key !== "title") {
              return (
                <div key={key}>
                  <label>
                    {key[0].toUpperCase() +
                      key.replace("_", " ").slice(1, key.length) +
                      ":"}
                  </label>
                  {edit ? (
                    <input
                      onChange={({ target }) => handleChange(key, target.value)}
                      value={bookProps[key]}
                    />
                  ) : (
                    <p>{bookProps[key] || `No ${key} available`}</p>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
      {edit ? (
        <div className={styles.actions}>
          <button onClick={handleCancel} className={styles.negative}>
            Cancel
          </button>
          <button
            onClick={() => handleBookSave(bookValues, index)}
            className={styles.positive}
          >
            Save
          </button>
        </div>
      ) : (
        <div className={styles.actions}>
          <button onClick={handleDelete} className={styles.negative}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

BookCard.propTypes = {
	handleBookSelected: PropTypes.func,
	handleCancel: PropTypes.func,
	handleBookSave: PropTypes.func,
	handleBookDelete: PropTypes.func,
	index: PropTypes.number,
	book: PropTypes.object.isRequired,
	edit: PropTypes.bool,
  };
  
export default BookCard;

export const ConfirmDelete = ({book, handleModalClose, handleConfirmDelete, focusDeleteIndex}) => (
  <div className={styles.deleteContainer}>
    {book && (
      <p>{`Are you sure you want to delete ${book.title} by ${book.author}?`}</p>
    )}
    <div className={styles.actions}>
      <button className={styles.negative} onClick={() => handleModalClose()}>
        Cancel
      </button>
      <button
        className={styles.positive}
        onClick={() => handleConfirmDelete(focusDeleteIndex)}
      >
        Confirm
      </button>
    </div>
  </div>
);

export const EditBook = ({book, handleCancel, handleBookSave}) => (
	<div>
		<BookCard 
			book = {book} 
			imgSize={"w200"} 
			index = {null} 
			edit={true} 
			handleCancel={handleCancel} 					
			handleBookSave={handleBookSave}
		/>
	</div>
);


