import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book, DefaultEmptyBook } from "../Book";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.success("Analysis added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .catch((err) => {
        console.log("Error from EnterAnalysis: " + err);
        toast.error("Failed to update book. Please try again.", {
          position: "top-center",
        });
      });
  };

  const buttonClass =
    "bg-pink-500 text-white p-2 w-full flex items-center justify-center rounded-lg hover:bg-pink-600 transition";

  return (
    <div
      className="EnterAnalysis"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        padding: "20px",
      }}
    >
      <div
        className="form-container"
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ToastContainer />

        <h2
          className="text-center"
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Enter Analysis
        </h2>

        <div className="text-center mb-4">
          <Link
            href="/"
            className={buttonClass}
            style={{
              width: "fit-content",
              margin: "0 auto",
              marginBottom: "20px",
            }}
          >
            Show Book List
          </Link>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {[
            { label: "Title", name: "title", value: book.title },
            { label: "ISBN", name: "isbn", value: book.isbn },
            { label: "Author", name: "author", value: book.author },
            {
              label: "Published Date",
              name: "published_date",
              value: book.published_date?.toString(),
            },
            { label: "Publisher", name: "publisher", value: book.publisher },
          ].map((field) => (
            <div
              className="form-group"
              key={field.name}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <label htmlFor={field.name} style={{ fontWeight: "bold" }}>
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                placeholder={field.label}
                value={field.value}
                className="form-control"
                onChange={inputOnChange}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  color: "black",
                }}
              />
            </div>
          ))}

          <div
            className="form-group"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label htmlFor="description" style={{ fontWeight: "bold" }}>
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description of the Book"
              value={book.description}
              className="form-control"
              onChange={textAreaOnChange}
              rows={3}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                color: "black",
              }}
            />
          </div>

          <div
            className="form-group"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label htmlFor="analysis" style={{ fontWeight: "bold" }}>
              Analysis
            </label>
            <textarea
              name="analysis"
              placeholder="Enter your analysis here"
              value={book.analysis || ""}
              className="form-control"
              onChange={textAreaOnChange}
              rows={3}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                color: "black",
              }}
            />
          </div>

          {/** */}

          <div
            className="form-group"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label htmlFor="se_practice" style={{ fontWeight: "bold" }}>
              se_practice
            </label>
            <textarea
              name="se_practice"
              placeholder="Enter your se_practice here"
              value={book.se_practice || ""}
              className="form-control"
              onChange={textAreaOnChange}
              rows={3}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                color: "black",
              }}
            />
          </div>

          <div
            className="form-group"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label htmlFor="claim" style={{ fontWeight: "bold" }}>
              claim
            </label>
            <textarea
              name="claim"
              placeholder="Enter your claim here"
              value={book.claim || ""}
              className="form-control"
              onChange={textAreaOnChange}
              rows={3}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                color: "black",
              }}
            />
          </div>

          <div
            className="form-group"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label htmlFor="result" style={{ fontWeight: "bold" }}>
              result
            </label>
            <textarea
              name="result"
              placeholder="Enter your result here"
              value={book.result || ""}
              className="form-control"
              onChange={textAreaOnChange}
              rows={3}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                color: "black",
              }}
            />
          </div>

          <div
            className="form-group"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label htmlFor="research_type" style={{ fontWeight: "bold" }}>
              research_type
            </label>
            <textarea
              name="research_type"
              placeholder="Enter your research_type here"
              value={book.research_type || ""}
              className="form-control"
              onChange={textAreaOnChange}
              rows={3}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                color: "black",
              }}
            />
          </div>

          <div
            className="form-group"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "center",
              gap: "10px",
            }}
          >
          </div>


          {/** */}
          <button
            type="submit"
            className={buttonClass}
            style={{
              margin: "0 auto",
              marginBottom: "20px",
            }}
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnterAnalysis;
