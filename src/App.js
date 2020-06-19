import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import SearchBox from "./components/SearchBox/index.jsx";
import BookCard, {ConfirmDelete, EditBook} from "./components/BookCard/index.jsx";
import Modal from "./components/Modal/index.jsx";
import booksSeed from './mocks/books_seed.json';
import bookModel from './models/book';
import {getBooks, saveBooks, saveId, getId} from './persistManager';

import styles from "./main.scss";

const MODAL_CLOSE = 'MODAL_CLOSE'
const SAVE_BOOK = 'SAVE_BOOK'
const DELETE_BOOK='DELETE_BOOK'; 
const CONFIRM_DELETE_BOOK='CONFIRM_DELETE_BOOK'; 
const SELECT_BOOK='SELECT_BOOK';
const SEARCH='SEARCH';

function init(initialState) {
	const books = getBooks();
	if(!books) saveId(booksSeed.length);
	return {openModal: false, focusBook: null, searchText: '', focusDeleteIndex: null, books: books || initialState };
}
  
function reducer(state, action) {
	switch (action.type) {
	  case MODAL_CLOSE: {
		return {...state, focusDeleteIndex: null, focusBook: null, openModal: false};
	  }
	  case SAVE_BOOK: {
		let {newBook} = action.payload;
		const {books} = state;
		if(!newBook.id) books.push({...newBook, id: getId()});
		const newBooks = books.map((book) => book.id === newBook.id? { ...newBook } : book);
		return {...state, books: newBooks, openModal: false};
	  }
	  case DELETE_BOOK: {
		const {index} = action.payload;
		return {...state, focusBook: index, focusDeleteIndex: index, openModal: true};
	  }
	  case CONFIRM_DELETE_BOOK: {
		const {index} = action.payload;
		const {books} = state;
	  	let newBooks = books;
	  	newBooks.splice(index, 1);	
		return {...state, books: newBooks, focusDeleteIndex: null, openModal: false};
	  }
	  case SELECT_BOOK: {
		const {index} = action.payload;
		return {...state, openModal: true, focusBook: index}
	  }
	  case SEARCH: {
		const {searchText} = action.payload;
	    return {...state, searchText};
	  }
	  default:
		throw new Error();
	}
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, booksSeed, init);
  const {openModal, focusBook, searchText, books, focusDeleteIndex} = state;

  useEffect(() => {
	  saveBooks(books)
  }, [JSON.stringify(books)]);

  const handleModalClose = () => {
	  dispatch({type:MODAL_CLOSE});
  }

  const handleBookSave = (newBook) => {
	dispatch({type:SAVE_BOOK, payload: {newBook}})
  };

  const handleBookDelete = (index) => {
	dispatch({type:DELETE_BOOK, payload: {index}})
  }

  const handleConfirmDelete = (index) => {
	dispatch({type:CONFIRM_DELETE_BOOK, payload: {index}})
  }

  const handleBookSelected = (index) => {
	dispatch({type:SELECT_BOOK, payload: {index}})
  }

  const handleSearch = (searchText) => {
	dispatch({type:SEARCH, payload: {searchText: searchText.toLowerCase()}})
  }

  const handleAdd = () => {
	  dispatch({type: SELECT_BOOK, payload: {index: -1}});
  }

  return (
    <div className={styles.appContainer}>
	  <div className={styles.header}>
	  	<h1 className={styles.title}>Woods between the worlds (A Library for everyone)</h1>
	  </div>
      <div className={styles.mainContainer}>
		{books
			.filter(book => book.title.toLocaleLowerCase().includes(searchText) || book.author.toLocaleLowerCase().includes(searchText))
			.map((book, index) => (
				<BookCard 
					key={book.id} 
					handleBookSelected={handleBookSelected} 
					handleBookSave={handleBookSave}
					handleBookDelete={handleBookDelete}
					book={book} 
					imgSize={"w200"} 
					index={index} />))
		}
      </div>
	  <div className={styles.sideBarContainer}>
      	<SearchBox 
			  handleSearch={handleSearch}
			  handleAdd = {handleAdd}
		/>
	  </div>
	  <Modal open = {openModal} handleClose = {handleModalClose}>
		  	{
				  focusDeleteIndex !== null? (
					  <ConfirmDelete 
						  focusDeleteIndex = {focusDeleteIndex} 
						  book={books[focusBook]} 
						  handleModalClose={handleModalClose} 
						  handleConfirmDelete={handleConfirmDelete}/>
					) : (
						<EditBook book ={books[focusBook] || bookModel} 		
							handleCancel={handleModalClose} 					
							handleBookSave={handleBookSave}/>
					)
			}
	  </Modal>

    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
