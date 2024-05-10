import "./App.css";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Dashboard from "./Pages/DashBoard";
import AboutUs from "./Pages/AboutUs";
import Product from "./Components/Product";
import Requests from "./Pages/Requests";

import { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddFolder from "./Components/AddFolder";
import AddProduct from "./Components/AddProduct";
import ProductDashBoard from "./Pages/ProductDashBoard";
import Summary from "./Components/Summary";
import CategorySummary from "./Components/CategorySummary";
import { ContactUs } from "./Components/ContactUs";

function App() {
  const [folders, setFolders] = useState([]);
  const [products, setProducts] = useState([]);
  const [amount, setAmout] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [adminRequests, setAdminRequests] = useState([]);
  const [productRequests, setProductRequests] = useState([]);

  useEffect(async () => {
    fetch("http://localhost:5000/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((d) => setFolders(d))
      .catch((error) => console.error("Error:", error));

    fetch("http://localhost:5000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((d) => {
        setAmout(d.amount);
        setQuantity(d.quantity);
        setProducts(d.folders);
      })
      .catch((error) => console.error("Error:", error));

    fetch("http://localhost:5000/adminRequests", {
      method: "GET",
      header: {
        "Contect-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((d) => setAdminRequests(d))
      .catch((error) => console.error("Error:", error));

    await fetch("http://localhost:4000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((d)=>setProductRequests(d))
      .catch((error) => console.error("Error:", error));
  }, []);

  const getLoaclitems = () => {
    const name = localStorage.getItem("data");

    if (name) {
      return JSON.parse(name);
    } else return "";
  };

  const [data, setData] = useState(getLoaclitems());

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/signin">
              <Signin setData={setData} />
            </Route>
            <Route path="/dashboard">
              <Dashboard setData={setData} data={data} folders={folders} />
            </Route>
            <Route path="/products/:categoryId">
              <ProductDashBoard
                folders={folders}
                data={data}
                setData={setData}
              />
            </Route>
            <Route path="/addcategory">
              <AddFolder data={data} setData={setData} />
            </Route>
            <Route path="/addproduct/:categoryId">
              <AddProduct data={data} setData={setData} />
            </Route>
            <Route path="/product/:categoryId/:productId">
              <Product folders={folders} data={data} setData={setData} />
            </Route>
            <Route path="/aboutus">
              <AboutUs />
            </Route>
            <Route path="/summary">
              <Summary
                products={products}
                amount={amount}
                quantity={quantity}
                data={data}
                setData={setData}
              />
            </Route>
            <Route path="/categories">
              <CategorySummary
                folders={folders}
                products={products}
                amount={amount}
                data={data}
                setData={setData}
              />
            </Route>
            <Route path="/contactus">
              <ContactUs />
            </Route>
            <Route path="/requests">
              <Requests
                adminRequests={adminRequests}
                productRequests={productRequests}
                data={data}
                setData={setData}
                folders={folders}
              />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
