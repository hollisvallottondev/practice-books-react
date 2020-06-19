import React, {useState} from 'react';
import styles from './styles.scss'; 
import PropTypes from 'prop-types';
import CustomInput from '../CustomInput/index.jsx';

const SearchBox = ({handleSearch, handleAdd}) => {
	return (
		<div className={styles.searchBoxWrapper}>
			<div className={styles.searchBoxContainer}>
				<CustomInput 
					handleSearch={handleSearch} 
					icon={'fas fa-search'}
					placeHolder={'Find a book by title or author'}
				/>
			</div>
			<div className={styles.searchBoxContainer}>
				<button className={styles.addButton} onClick={handleAdd}>Add a new book</button>
			</div>
		</div>
	)
}

SearchBox.propTypes = {
	handleSearch: PropTypes.func.isRequired, 
	handleAdd: PropTypes.func.isRequired
}



export default SearchBox;