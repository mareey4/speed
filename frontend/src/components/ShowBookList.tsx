import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from './BookCard';
import { Book } from './Book';

function ShowBookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/books');
        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }
        const books = await res.json();
        setBooks(books);
      } catch (err) {
        console.log('Error from ShowBookList: ' + err);
      }
    };

    fetchBooks();
  }, []); 

  const bookList = books.length === 0 ? 'There is no book record!' : books.map((book, k) => <BookCard book={book} key={k} />);

  return (
    <div 
      className='ShowBookList'>
      <div 
        className='container'>
        <div 
          className='row'>
          <div 
            className='col-md-12'>
            <br />
            <h2 
              className='display-4 text-center'>Books List</h2>
          </div>
          <div 
            className='col-md-11'>
            <Link 
              href='/create-book' 
              className='btn btn-outline-warning float-right'
              >
              + Add New Book
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>
        <div 
          className='list'>{bookList}</div>
      </div>
    </div>
  );
}

export default ShowBookList;