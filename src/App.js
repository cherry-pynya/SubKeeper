import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { login, logout, logOut, loginWithCredentials, getCurrency } from "./slices/app";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import AddForm from "./components/AddForm/AddForm";
import moment from "moment";

moment().format('L');
moment.locale('ru');

export default function App() {
  const user = useSelector((state) => state.app.user);
  const isloged = useSelector((state) => state.app.login);
  const cur = useSelector((state) => state.app.currency);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrency());
  }, []);

  return (
    <Router>
      <Header />
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/add'>
          <AddForm />
        </Route>
      <Footer />
    </Router>
  );
}
