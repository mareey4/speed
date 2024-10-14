import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Book, DefaultEmptyBook, BookStatus } from "./Book";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBookComponent = () => {
  const navigate = useRouter();
  const [book, setBook] = useState<Book>({
    ...DefaultEmptyBook,
    status: BookStatus.Submitted,
    analysis: ""
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        setBook({ ...DefaultEmptyBook, status: BookStatus.Submitted, analysis: "" });
        toast.success('Book submitted successfully!');
        setTimeout(() => {
          navigate.push('/');
        }, 1000);
      } else {
        throw new Error('Failed to submit the book');
      }
    } catch (error) {
      const err = error as Error;
      toast.error('Error: ' + err.message);
    }
  };

  const buttonClass = "bg-blue-600 text-white p-2 w-full flex items-center justify-center rounded-lg hover:bg-blue-700 transition";

  return (
    <div
      className="CreateBook"
      style={{
        backgroundColor: 'black',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold">Add Book</h1>
          <p className="text-3xl font-semibold mt-2">Create new book</p>
          <Link href="/" className={buttonClass} style={{ width: 'fit-content', margin: '0 auto', marginBottom: '20px' }}>
            Show Book List
          </Link>
        </div>

        <ToastContainer />

        <form noValidate onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title of the Book"
              name="title"
              className="form-control"
              value={book.title}
              onChange={onChange}
              style={{ color: 'black', backgroundColor: 'white', borderColor: 'white', width: '100%', borderRadius: '8px' }}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              placeholder="ISBN"
              name="isbn"
              className="form-control"
              value={book.isbn}
              onChange={onChange}
              style={{ color: 'black', backgroundColor: 'white', borderColor: 'white', width: '100%', borderRadius: '8px' }}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              placeholder="Author"
              name="author"
              className="form-control"
              value={book.author}
              onChange={onChange}
              style={{ color: 'black', backgroundColor: 'white', borderColor: 'white', width: '100%', borderRadius: '8px' }}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              placeholder="Describe this book"
              name="description"
              className="form-control"
              value={book.description}
              onChange={onChange}
              style={{ color: 'black', backgroundColor: 'white', borderColor: 'white', width: '100%', borderRadius: '8px' }}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="date"
              name="published_date"
              className="form-control"
              value={book.published_date?.toString()}
              onChange={onChange}
              style={{ color: 'black', backgroundColor: 'white', borderColor: 'white', width: '100%', borderRadius: '8px' }}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              placeholder="Publisher of this Book"
              name="publisher"
              className="form-control"
              value={book.publisher}
              onChange={onChange}
              style={{ color: 'black', backgroundColor: 'white', borderColor: 'white', width: '100%', borderRadius: '8px' }}
            />
          </div>
          <br />

          {/* Invisible field for analysis */}
          <input type="hidden" name="analysis" value={book.analysis} />

          <button
            type="submit"
            className={buttonClass}
            style={{ width: '100%' }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookComponent;
