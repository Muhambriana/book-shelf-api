import {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdByHandler,
} from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdByHandler,
  },
];

export default routes;
