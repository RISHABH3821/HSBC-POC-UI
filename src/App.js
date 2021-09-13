import React from 'react';
import './App.css';
import { UserPage } from './components/UserPage';
import { HomePage } from './components/HomePage';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(sessionStorage.getItem("userName")?.length>0 && sessionStorage.getItem("password")?.length>0);

  const isUserLoggedIn = () => {
    if(sessionStorage.getItem("userName")?.length>0 && sessionStorage.getItem("password")?.length>0){
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
  }

  return (
    <div className="App">
      {(() => {
        if (loggedIn) {
          return <HomePage logUser = {isUserLoggedIn}/>;
        } else {
          return <UserPage logUser = {isUserLoggedIn}/>;
        }
      })()}
    </div>
  );
}

export default App;
