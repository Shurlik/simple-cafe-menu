import { Route, Routes } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import MenuNew from "../components/MenuNew";
import { menuLink } from "../constants";
import Body from "../components/Body";
import Delivery from "../components/Delivery";
import About from "../components/About";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "../components/Adminka/Admin";
import Unavailable from "../components/Unavailable";
import Content from "../components/Content";
import LoginPage from "../components/Adminka/LoginPage";
import NotFound from "../components/NotFound";
import ShoppingCart from "../components/ShoppingCart";

const Router = ({ token }) => {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route index element={<MenuNew />} />
        {menuLink.map((elem, index) => {
          return (
            <Route
              key={index}
              exact
              path={elem}
              element={<Body {...{ index }} />}
            />
          );
        })}
        <Route exact path="/delivery" element={<Delivery />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/favorites" element={<Content favs />} />
        <Route exact path="/shopping" element={<ShoppingCart />} />
      </Route>
      <Route
        exact
        path="/admin"
        element={
          <ProtectedRoute redirectPath={"/login"} {...{ token }}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route exact path="/unavailable" element={<Unavailable />} />
      <Route exact path="/login" element={<LoginPage {...{ token }} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
