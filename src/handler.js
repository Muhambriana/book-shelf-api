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
  const newBook = new Book({ name, ...rest });

  /**
	 * Add new book to list
	 */
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === newBook.id).length > 0;

  if (!isSuccess) {
    return h.response(ApiResponse.fail('Gagal menambahkan buku')).code(500);
  }

  return h.response(ApiResponse.success('Buku berhasil ditambahkan', { bookId: newBook.id })).code(201);
};

export {
  addBookHandler,
};
