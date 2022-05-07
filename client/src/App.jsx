import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {

  useEffect(() => { document.title = "React Client App" }, []);

  const user = useSelector((state) => state?.user?.currentUser);

  const AuthenticationFlow = () => {
    return user ? <Outlet /> : <Login />
  }

  const RegistrationFlow = () => {
    return user ? <Navigate to="/" /> : <Outlet />
  }

  return (
    <Router>
      <Routes>

        <Route element={<RegistrationFlow />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AuthenticationFlow />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />}>
            <Route path=":category" element={<ProductList />} />
          </Route>
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;