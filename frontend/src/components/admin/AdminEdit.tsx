import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book, DefaultEmptyBook } from "../Book";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminEdit() {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const id = useParams<{ id: string }>().id;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/books/${id}`)
        .then((res) => res.json())
        .then((json) => setBook(json))
        .catch((err) => {
          console.log("Error from AdminEdit: " + err);
        });
    })();
  }, [id]);

  const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    })
      .then(() => {
        toast.success("New edit added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .catch((err) => {
        console.log("Error from AdminEdit: " + err);
        toast.error("Failed to update book. Please try again.", {
          position: "top-center",
        });
      });
  };

  const buttonClass =
    "bg-pink-500 text-white p-2 w-full flex items-center justify-center rounded-lg hover:bg-pink-600 transition";

  return (
    <div className="AdminEdit">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link href="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="lead text-center">Admin Edit View</h1>
          </div>
        <ToastContainer />
        </div>
        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title of the Book"
                name="title"
                className="form-control"
                value={book.title}
                onChange={inputOnChange}
                style={{ color: "black" }}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                placeholder="ISBN"
                name="isbn"
                className="form-control"
                value={book.isbn}
                onChange={inputOnChange}
                style={{ color: "black" }}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                placeholder="Author"
                name="author"
                className="form-control"
                value={book.author}
                onChange={inputOnChange}
                style={{ color: "black" }}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                placeholder="Description of the Book"
                name="description"
                className="form-control"
                value={book.description}
                onChange={textAreaOnChange}
                style={{ color: "black" }}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="published_date">Published Date</label>
              <input
                type="text"
                placeholder="Published Date"
                name="published_date"
                className="form-control"
                value={book.published_date?.toString()}
                onChange={inputOnChange}
                style={{ color: "black" }}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                placeholder="Publisher of the Book"
                name="publisher"
                className="form-control"
                value={book.publisher}
                onChange={inputOnChange}
                style={{ color: "black" }}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="analysis">Analysis</label>
              <textarea
                placeholder="Enter your analysis here"
                name="analysis"
                className="form-control"
                value={book.analysis || ""}
                onChange={textAreaOnChange}
                style={{ color: "black" }}
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-outline-info btn-lg btn-block"
            >
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminEdit;
