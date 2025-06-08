import { nanoid } from 'nanoid';

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
    this.finished = pageCount === readPage;
    this.reading = reading;
    this.insertedAt = new Date().toISOString();
    this.updatedAt = this.insertedAt;
  }

  toSummary() {
    return {
      id: this.id,
      name: this.name,
      publisher: this.publisher
    }
  }
}

export default Book;
