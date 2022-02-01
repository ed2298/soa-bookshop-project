import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';
import Book from '../book/Book';


function Home(props: any):JSX.Element {
  let history = useHistory()
  const { isAuthenticated, getIdTokenClaims, user } = useAuth0();

  console.log(isAuthenticated);
  console.log(user);
  const [books, setBooks] = useState();

  const fetchBooks = async (): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/books`);
    const json = await response.json();
    setBooks(json)
  }

  const deleteBook = async(id: string) => {
    const accessToken = await getIdTokenClaims();
    await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/book/${id}`, {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "authorization": `Bearer ${accessToken.__raw}`
      })
    });
    _removeBookFromView(id);
    history.push('/');
  }

  const updatePrice = async(id: string) => {
    try {
      const accessToken = await getIdTokenClaims();
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/updatePrice/${id}`, {
        method: "put",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          "authorization": `Bearer ${accessToken.__raw}`
        }),
        body: JSON.stringify({
          price: "$5"
        })
      });
      fetchBooks();
      history.push('/');
      return response.ok;
    } catch(ex) {
      return false;
    }
  }

  const _removeBookFromView = (id: string) => {
    const index = books.findIndex((book: { _id: string; }) => book._id === id);
    books.splice(index, 1);
  }

  useEffect(() => {
    fetchBooks();
    props.websocket.on("update_book_price", (updated_book: any) => {
      const priceToFloat = parseFloat(updated_book.price.slice(1));
      if (priceToFloat > 5) {
        props.handleNotifications(`The book ${updated_book.title} has a $5 discount!`);
      } else {
        props.handleNotifications(`The book ${updated_book.title} is now free!`);
      }
    });
    return () => props.websocket.removeAllListeners();
  }, []);

    return (
        <section className="book-area section">
          <div className="container">
            <div className="row">
              {books && books.map((book: { title: React.ReactNode; _id: any; author: any; image_url: any; price: any; old_price: any, user_email: any }) => (
                <div className="col-lg-4 col-md-6" key={book._id}>
                <div className="card h-100">
                  <div className="single-book book-style-1">

                    <div className="book-image">
                      <img src={book.image_url} alt="Book" />
                    </div>

                    <div className="book-info">

                      <h4 className="title">
                        <span>
                          <b>{book.title}</b>
                        </span>
                      </h4>

                        <div className="col-12 text-center lead">
                          <h5><b>{book.price && book.price.indexOf(".") > -1 ? book.price.substring(0, book.price.indexOf(".") + 3) : book.price}</b></h5>
                        </div>
                    </div>

                  <ul className="book-footer">
                    <li className={isAuthenticated && (user.email === book.user_email) ? "" : "only-view"}>
                      {
                        isAuthenticated && 
                        <Link to={`/book/${book._id}`} className="btn btn-sm btn-info">View</Link>
                      }
                    </li>
                    <li>
                      {
                        isAuthenticated && (user.email === book.user_email) &&
                        <Link to={`/edit/${book._id}`} className="btn btn-sm btn-primary">Edit</Link>
                      }
                    </li>
                    <li>
                      {
                        isAuthenticated && (user.email === book.user_email) &&
                        <button className="btn btn-sm btn-dark" onClick={() => updatePrice(book._id)}>$5 Cut</button>
                      }
                    </li>
                    <li>
                      {
                        isAuthenticated && (user.email === book.user_email) &&
                        <button className="btn btn-sm btn-danger" onClick={() => deleteBook(book._id)}>Delete</button>
                      }
                    </li>
                  </ul>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
      </section>
    );
}

export default Home;
