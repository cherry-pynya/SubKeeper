import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { login, logout, logOut, loginWithCredentials } from "./slices/app";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";

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
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
      <Footer />
    </Router>
  );
}
