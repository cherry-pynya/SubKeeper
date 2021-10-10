import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { login, logout, logOut, loginWithCredentials } from "./slices/app";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main/Main";

export default function App() {
  const user = useSelector((state) => state.app.user);
  const isloged = useSelector((state) => state.app.login);
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

  console.log(user)
  console.log(isloged)

  return (
    <Router>
      <Header />
      <main className='main'>
        <Route exact path='/'>
          <Main />
        </Route>
      </main>
    </Router>
  );
}
