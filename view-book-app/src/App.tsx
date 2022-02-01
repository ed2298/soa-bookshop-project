import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Book from "./components/book/Book";

function App(bookId) {
  console.log(bookId);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={"/"}>
            <Book bookId={bookId}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
