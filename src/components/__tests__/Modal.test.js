import React from 'react';
import Modal from '../Modal/index.jsx';
import {ConfirmDelete, EditBook} from '../BookCard/index.jsx';
import booksMocks from '../../mocks/books_seed.json';
import renderer from 'react-test-renderer';

test('Modal renders edit correctly', () => {
	const handleModalClose = jest.fn(() => console.log('Handle modal close'));
	const handleBookSave = jest.fn(() => console.log('Handle book save'));
	const index = 0;
	const book = booksMocks[index];
	const openModal = true;

	const component = renderer.create(
		<Modal 
			open = {openModal}
			 handleClose = {handleModalClose}>
			<EditBook 
				book ={book} 		
				handleCancel={handleModalClose} 					
				handleBookSave={handleBookSave}/>
		</Modal>
	)

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Modal renders confirm correctly', () => {
	const handleModalClose = jest.fn(() => console.log('Handle modal close'));
	const handleConfirmDelete = jest.fn(() => console.log('Handle confirm delete'));
	const index = 0;
	const book = booksMocks[index];
	const openModal = true;

	const component = renderer.create(
		<Modal 
			open = {openModal}
			 handleClose = {handleModalClose}>
			<ConfirmDelete 
				focusDeleteIndex = {index} 
				book={book} 
				handleModalClose={handleModalClose} 
				handleConfirmDelete={handleConfirmDelete}/>
		</Modal>
	)

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


