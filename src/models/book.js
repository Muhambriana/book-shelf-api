import { nanoid } from 'nanoid';
import getDateTimeNow from '../utils/helper.js';

class Book {
  constructor({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
    this.id = nanoid();
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.finished = this.#isFinised();
    this.reading = reading;
    this.insertedAt = getDateTimeNow();
    this.updatedAt = this.insertedAt;
  }

  toSummary() {
    return {
      id: this.id,
      name: this.name,
      publisher: this.publisher,
    };
  }

  update({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) {
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.finished = this.#isFinised();
    this.reading = reading;
    this.updatedAt = getDateTimeNow();
  }

  #isFinised() {
    return this.pageCount === this.readPage
  }
}

export default Book;
