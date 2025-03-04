import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.css";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import OrderList from "./pages/orderList/OrderList";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":id" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" formType="user" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":id" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" formType="product" />}
              />
            </Route>
            <Route path="orders" >
              <Route index element={<OrderList />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
