import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book, DefaultEmptyBook } from "../Book";
import Link from "next/link";

function EnterAnalysis() {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const id = useParams<{ id: string }>().id;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/books/${id}`)
        .then((res) => res.json())
        .then((json) => setBook(json))
        .catch((err) => {
          console.log("Error from EnterAnalysis: " + err);
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
        router.push(`/show-book/${id}`);
      })
      .catch((err) => {
        console.log("Error from EnterAnalysis: " + err);
      });
  };
  console.log(book.title);
  return (
    <div className="EnterAnalysis">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="lead text-center">Enter Analysis</h1>
          </div>
        </div>
        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <p>{book.title}</p>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <p>{book.isbn}</p>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <p>{book.author}</p>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <p>{book.description}</p>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="published_date">Published Date</label>
              <p>{book.published_date}</p>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <p>{book.publisher}</p>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="analysis">Analysis</label><br/>
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

export default EnterAnalysis;
