import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function Book(props) {

  let { bookId } = props.bookId;

  const [book, setBook] = useState<any>({});

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/book/${bookId}`);
      const json = await response.json();
      setBook(json);
    }
    fetchData();
  }, [bookId]);

    return (
        <section className="book-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-1 col-md-0" />
            <div className="col-lg-10 col-md-12">
              {book && 
                <div className="main-book">
                  <div className="book-top-area">
                    <h3 className="title display-4">
                      <span>
                        <b>{book.title}</b>
                      </span>
                    </h3>
                    <div className="d-flex justify-content-center">
                      <img src={book.image_url} alt="Book" />
                    </div>
                    <div className="row justify-content-center text-center lead">
                      <div className="col-lg-5">
                        <span>Author:</span>
                        {' '}
                        <span>{book.author}</span>
                      </div>
                      <div className="col-lg-5">
                        <span>Rating:</span>
                        {' '}
                        <span>{book.rating} (out of 5)</span>
                      </div>
                    </div>
                    <div className="row justify-content-center text-center lead">
                      <div className="col-lg-5">
                        <span>Price:</span>
                        {' '}
                        <span>{book.price && book.price.indexOf(".") > -1 ? book.price.substring(0, book.price.indexOf(".") + 3) : book.price}</span>
                      </div>
                      <div className="col-lg-5">
                        <span>Old Price:</span>
                        {' '}
                        <span>{book.old_price && book.old_price.indexOf(".") > -1 ? book.old_price.substring(0, book.old_price.indexOf(".") + 3) : book.old_price}</span>
                      </div>
                    </div>
                  </div>
                </div>              
              }
            </div>

          </div>
        </div>
      </section>
    );
}

export default Book;