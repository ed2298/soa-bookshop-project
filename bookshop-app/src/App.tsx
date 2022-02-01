import React, { Suspense, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Book from "./components/book/Book";
import Edit from "./components/book/Edit";
import Create from "./components/book/Create";
import MyBooks from "./components/MyBooks";
import Discounts from "./components/Discounts";
import { io } from "socket.io-client";
import 'react-notifications/lib/notifications.css';
// @ts-ignore
import {NotificationContainer, NotificationManager} from 'react-notifications';


function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket: any = io(`http://${window.location.hostname}:5000`, {transports: ['websocket', 'polling', 'flashsocket']});
    setSocket(newSocket);
    return () => {
      newSocket.close(); 
      console.log("Websocket closed");
    }
  }, [setSocket]);

  const [notifMessage, setNotifMessage] = useState("");
  const handleNotifications = (newMessage: string) => {
    setNotifMessage(newMessage);
    NotificationManager.info(newMessage);
  }

  return socket ? (
    <div className="App">
      <Navbar />
      <NotificationContainer />
      <div className={'container'}>
        <Switch>
          <Route path={"/"} exact={true} render={(props) => <Home {...props} websocket={socket} handleNotifications={handleNotifications} />} />
          <Route path={"/book/:bookId"} component={Book}/>
          <Route path={"/edit/:bookId"} component={Edit}/>
          <Route path={"/create"} component={Create} />
          <Route path={"/myBooks/:user_email"} component={MyBooks} />
          <Route path={"/discounts"} component={Discounts} />
        </Switch>
      </div>
    </div>
  ) : (
    <p>The websocket is not connected!</p>
  );
}
export default App;
