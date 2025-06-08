import books from './books.js';
import Book from './models/book.js';
import ApiResponse from './utils/apiresponse.js';

const addBookHandler = (request, h) => {
  /**
	 * Get request body property
	 */
  const {
    name,
    pageCount,
    readPage,
    ...rest
  } = request.payload;

  /**
   * Check if name property not included
   */
  if (!name) {
    return h.response(ApiResponse.fail('Gagal menambahkan buku. Mohon isi nama buku')).code(400);
  }

  /**
   * Check if readPage more than pageCount
   */
  if (readPage > pageCount) {
    return h.response(ApiResponse.fail('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount')).code(400);
  }

  /**
   * Create new model
   */
  const newBook = new Book({ name, pageCount, readPage, ...rest });

  /**
	 * Add new book to list
	 */
  books.push(newBook);

  /**
   * Recheck that item alredy on the list
   */
  const isSuccess = books.filter((book) => book.id === newBook.id).length > 0;

  /**
   * If item not exist in the list
   */
  if (!isSuccess) {
    return h.response(ApiResponse.fail('Gagal menambahkan buku')).code(500);
  }

  return h.response(ApiResponse.success('Buku berhasil ditambahkan', { bookId: newBook.id })).code(201);
};

const getAllBooksHandler = (request, h) => {
  const bookList = books.map((book) => book.toSummary());

  return h.response(ApiResponse.success(null, { books: bookList })).code(200);
};

const getBookByIdByHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((b) => b.id === id)[0];

  console.log(`kocak${book.pageCount}`);

  if (book === undefined) {
    return h.response(ApiResponse.fail('Buku tidak ditemukan')).code(404);
  }

  return h.response(ApiResponse.success(null, { book }));
};

export {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdByHandler,
};
