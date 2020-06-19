import React from 'react';
import CustomInput from '../CustomInput/index.jsx';
import renderer from 'react-test-renderer';

test('CustomInput renders correctly', () => {
	const handleSearch = jest.fn(() => console.log('Handle search'));

	const component = renderer.create(
		<CustomInput 
			handleSearch={handleSearch} 
			icon={'fas fa-search'}
			placeHolder={'Find a book by title or author'}
		/>
	)

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});