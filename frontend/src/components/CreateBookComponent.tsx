import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Book, DefaultEmptyBook } from "./Book";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBookComponent = () => {
  const navigate = useRouter();
  const [book, setBook] = useState<Book>(DefaultEmptyBook);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
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
        setBook(DefaultEmptyBook);
        toast.success('Book submitted successfully!');
        setTimeout(() => {
          navigate.push('/');
        }, 10000);
      } else {
        throw new Error('Failed to submit the article');
      }
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  const buttonClass = "bg-blue-600 text-white p-2 w-24 h-15 flex items-center justify-center rounded-lg hover:bg-blue-700 transition";

  return (
    <div className="CreateBook" style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br/>
            <Link href="/" className={buttonClass}>
                  Show Book List
            </Link>
          </div>
          <div className="col-md-10 m-auto">
            <h1 className="text-6xl font-bold">Add Book</h1>
            <p className="text-3xl font-semibold mt-2">Create new book</p>

            {/* Toastify container to render toasts */}
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
                  style={{ color: 'black', backgroundColor: 'white', borderColor: 'white' }}
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
                  style={{ color: 'black', backgroundColor: 'white', borderColor: 'white' }}
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
                  style={{ color: 'black', backgroundColor: 'white', borderColor: 'white' }}
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
                  style={{ color: 'black', backgroundColor: 'white', borderColor: 'white' }}
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
                  style={{ color: 'black', backgroundColor: 'white', borderColor: 'white' }}
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
                  style={{ color: 'black', backgroundColor: 'white', borderColor: 'white' }}
                />
              </div>
              <br />
              <button
                type="submit"
                className={buttonClass + " w-full"}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBookComponent;
