import React from 'react';
import BookCard from '../BookCard/index.jsx';
import renderer from 'react-test-renderer';
import booksMocks from '../../mocks/books_seed.json';

test('BookCard tree renders correctly', () => {
	const index = 0;
	const book = booksMocks[index];
	const handleBookSelected = jest.fn(() => console.log('Handle book selected'));
	const handleBookSave = jest.fn(() => console.log('Handle book save')); 
	const handleBookDelete = jest.fn(() => console.log('Handle book delete')); 

	const component = renderer.create(
		<BookCard
			key={book.id} 
			handleBookSelected={handleBookSelected} 
			handleBookSave={handleBookSave}
			handleBookDelete={handleBookDelete}
	    	book={book} 
			imgSize={"w200"} 
			index={index} />
	  );
	
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});