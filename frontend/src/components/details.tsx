import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Book } from './Book';

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`);
          if (!res.ok) {
            throw new Error("Failed to fetch book details");
          }
          const fetchedBook = await res.json();
          setBook(fetchedBook);
        } catch (error) {
          console.error("Error fetching book details:", error);
        }
      };

      fetchBook();
    }
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Status:</strong> {book.status}</p>
      <button onClick={() => router.back()} className="btn btn-secondary">Go Back</button>
    </div>
  );
};

export default Details;
