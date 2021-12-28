import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrency } from "./slices/app";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import AddForm from "./components/AddForm/AddForm";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Loader from "./components/Loader/Loader";
import OpsPage from "./components/OpsPage/OpsPage";
import moment from "moment";
import { auth } from "./firebase";
import { login } from "./slices/app";

moment().format("L");
moment.locale("ru");

export default function App() {
  const dispatch = useDispatch();
  const isLoged = useSelector((state) => state.app.login);
  const status = useSelector((state) => state.app.status);

  //запрашиваем курс валют
  useEffect(() => {
    dispatch(getCurrency());
  }, []);

  //проверяем заходил ли наш пользователь уже из этого браузкра
  //если да, то входим автоматически
  //если нет, то ничего не происходит
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { uid } = user;
        dispatch(login({uid}));
      } else {
        return false;
      }
    });
    return unsubscribe;
  }, []);
  
  if (isLoged && status === process.env.REACT_APP_FULLFILED)
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/add">
            <AddForm />
          </Route>
          <Route>
            <PageNotFound path="*" />
          </Route>
        </Switch>
        <Footer />
      </Router>
    );

  if (!isLoged && status === process.env.REACT_APP_FULLFILED)
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route>
            <PageNotFound path="*" />
          </Route>
        </Switch>
        <Footer />
      </Router>
    );

    if (status === process.env.REACT_APP_PENDING) return (
      <Router>
        <Header />
        <Loader />
        <Footer />
      </Router>
    );
  
    if (status === process.env.REACT_APP_REJECTED) return (
      <Router>
        <Header />
        <OpsPage />
        <Footer />
      </Router>
    );
}
