import books from './books.js';
import Book from './models/book.js';
import ApiResponse from './utils/api_response.js';
import { getBooleanFromQueryParam } from './utils/helper.js';

/**
 * Handling for addding new book
 */
const addBookHandler = (request, h) => {
  const errorMessage = 'Gagal menambahkan buku';
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
   * Check if the name property is missing.
   */
  if (!name) {
    return h.response(ApiResponse.fail(`${errorMessage}. Mohon isi nama buku`)).code(400);
  }

  /**
   * Check if readPage more than pageCount
   */
  if (readPage > pageCount) {
    return h.response(ApiResponse.fail(`${errorMessage}. readPage tidak boleh lebih besar dari pageCount`)).code(400);
  }

  /**
   * Create new model
   */
  const newBook = new Book({
    name, pageCount, readPage, ...rest,
  });

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
    return h.response(ApiResponse.fail(errorMessage)).code(500);
  }

  return h.response(ApiResponse.success('Buku berhasil ditambahkan', { bookId: newBook.id })).code(201);
};

/**
 * Handling for get book list (whether with filter or not)
 */
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  /**
   * Variable that will give as response (modif)
   */
  let bookList = books;

  /**
   * If the NAME is defined, filter the book list using the parsed name.
   */
  if (name !== undefined) {
    bookList = bookList.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  /**
   * If the READING is defined, filter the book list using the parsed reading.
   */
  const isReading = getBooleanFromQueryParam(reading);
  if (isReading !== undefined) {
    bookList = bookList.filter((book) => book.reading === isReading);
  }

  /**
   * If the FINISHED is defined, filter the book list using the parsed finished.
   */
  const isFinished = getBooleanFromQueryParam(finished);
  if (isFinished !== undefined) {
    bookList = bookList.filter((book) => book.finished === isFinished);
  }

  /**
   * Give response with selected property
   */
  const summarizedBooks = bookList.map((book) => book.toSummary());
  return h.response(ApiResponse.success(null, { books: summarizedBooks })).code(200);
};

/**
 * Handling for get selected book with id
 */
const getBookByIdByHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((b) => b.id === id)[0];

  if (book === undefined) {
    return h.response(ApiResponse.fail('Buku tidak ditemukan')).code(404);
  }

  return h.response(ApiResponse.success(null, { book }));
};

/**
 * Handling for update book with id
 */
const editBookByIdHandler = (request, h) => {
  const errorMessage = 'Gagal memperbarui buku';
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
   * Check if the name property is missing.
   */
  if (!name) {
    return h.response(ApiResponse.fail(`${errorMessage}. Mohon isi nama buku`)).code(400);
  }

  /**
   * Check if readPage more than pageCount
   */
  if (readPage > pageCount) {
    return h.response(ApiResponse.fail(`${errorMessage}. readPage tidak boleh lebih besar dari pageCount`)).code(400);
  }

  const { id } = request.params;
  const index = books.findIndex((b) => b.id === id);

  /**
   * Check if id is not found in book list
   */
  if (index === -1) {
    return h.response(ApiResponse.fail(`${errorMessage}. Id tidak ditemukan`)).code(404);
  }

  const book = books[index];

  book.update({
    name,
    pageCount,
    readPage,
    ...rest,
  });

  books[index] = book;

  return h.response(ApiResponse.success('Buku berhasil diperbarui', null)).code(200);
};

/**
 * Handling for delete book with id
 */
const deleteBookById = (request, h) => {
  const errorMessage = 'Buku gagal dihapus';

  const { id } = request.params;
  const index = books.findIndex((b) => b.id === id);

  /**
   * Check if id is not found in book list
   */
  if (index === -1) {
    return h.response(ApiResponse.fail(`${errorMessage}. Id tidak ditemukan`)).code(404);
  }

  /**
   * Delete selected book
   */
  books.splice(index, 1);
  return h.response(ApiResponse.success('Buku berhasil dihapus', null)).code(200);
};

export {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdByHandler,
  editBookByIdHandler,
  deleteBookById,
};
