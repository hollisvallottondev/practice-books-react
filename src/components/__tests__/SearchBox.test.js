import React from 'react';
import SearchBox from '../SearchBox/index.jsx';
import renderer from 'react-test-renderer';


test('SearchBox renders correctly', () => {
	const handleSearch = jest.fn(() => console.log('Handle search'));
	const handleAdd = jest.fn(() => console.log('Handle add'));

	const component = renderer.create(
		<SearchBox 
			handleSearch={handleSearch}
			handleAdd = {handleAdd} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});