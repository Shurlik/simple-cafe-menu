import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Router from "./routes";
import { initi18n } from "./localization/i18n.ts";
import { useFirebase } from "./hooks/useFirebase";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { setCart, setFavorites, setLocale } from "./store/slices/menu";
import { setToken } from "./store/slices/user";

initi18n();

function App() {
  const { token } = useSelector((state) => state.user);

  const { getFbData } = useFirebase();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const loadData = async () => {
    const data = await getFbData();
    if (!data) {
      console.log("No data");
    }
  };

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    const favs = JSON.parse(localStorage.getItem("favs"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (lang === "en") {
      i18n.changeLanguage(lang);
      dispatch(setLocale(lang));
    }
    if (favs) {
      dispatch(setFavorites(favs));
    }
    if (cart) {
      dispatch(setCart(favs));
    }
    loadData();
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  return <Router {...{ token }} />;
}

export default App;
