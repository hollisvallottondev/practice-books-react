export const saveId = (id) => {
	localStorage.setItem('id', JSON.stringify(id));
}

export const getId = () => {
	const id = localStorage.getItem('id');
	return JSON.parse(id);
}

export const saveBooks = (books) => {
	localStorage.setItem('books', JSON.stringify(books));
	let id = getId();
	id++;
	saveId(id);
}

export const getBooks = () => {
	const books = localStorage.getItem('books');
	return JSON.parse(books);
}

export default {
	saveBooks,
	getBooks,
	saveId,
	getId
}