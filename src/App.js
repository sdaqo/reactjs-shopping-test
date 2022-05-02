import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Products from "./routes/products";
import Admin from "./routes/admin";
import ErrorPage from "./routes/404";
import Home from "./routes/home";
import ShoppingCart from "./routes/cart";
import { Routes, Route } from "react-router-dom";
import { withAlert } from "react-alert";
import Cookies from "js-cookie";

class App extends Component {
  state = {
    itemsInCart: [],
    items: [],
    total: 0,
    loggedIn: false,
  };

  async componentDidMount() {
    const session = Cookies.get("session");
    const email = Cookies.get("email");
    var loggedIn = false;
    var userData = [];
    if (session && email) {
      const options = {
        method: "POST",
        body: JSON.stringify({ session: session, email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      await fetch(`${window.config.api}/session`, options)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            loggedIn = true;
            userData = JSON.parse(data.data);
            this.props.alert.success("Restored session, Logged In!");
          }
        });
    }
    await fetch(`${window.config.api}/data?type=item&id=all`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({ items: data.data, loggedIn, itemsInCart: userData })
      );
  }

  render() {
    return (
      <React.Fragment>
        <NavBar
          countOfItems={this.state.itemsInCart.length}
          onLogin={this.handleLogIn}
          onLogOut={this.handleLogOut}
          onSearch={this.handleSearch}
          loggedIn={this.state.loggedIn}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="products"
            element={
              <Products
                onAdd={this.handleAdd}
                itemData={this.state.items}
                onSearch={this.handleSearch}
              />
            }
          />
          <Route
            path="admin"
            element={<Admin onModalShow={this.handleItemFormShow} />}
          />
          <Route
            path="cart"
            element={
              <ShoppingCart
                items={this.state.itemsInCart}
                onInc={this.handleInc}
                onDec={this.handleDec}
                onDel={this.handleDel}
                total={this.state.total}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </React.Fragment>
    );
  }

  updateTotal(items) {
    let total = 0.0;
    items.forEach((item) => {
      const float = parseFloat(item.itemPrice) * item.quantity;
      total += parseFloat(float.toFixed(1));
    });

    return total;
  }

  handleAdd = (item) => {
    if (!this.state.loggedIn) {
      this.props.alert.error("You have to be logged in to do that.");
      return;
    }
    const items = [...this.state.itemsInCart];

    if (items.some((item_in_cart) => item_in_cart.itemId === item.itemId)) {
      this.handleInc(
        items.find((item_in_cart) => item_in_cart.itemId === item.itemId)
      );
      this.props.alert.show(`Incremented quantitiy of ${item.itemTitle}`);
      return null;
    }

    item.quantity = 1;
    items.push(item);
    this.props.alert.success(`Added ${item.itemTitle} to the Shopping Cart`);
    this.addUserItemsToDB(items);
    this.setState({ itemsInCart: items, total: this.updateTotal(items) });
  };

  handleInc = (item) => {
    const items = [...this.state.itemsInCart];
    const index = items.indexOf(item);

    items[index].quantity++;
    this.addUserItemsToDB(items);
    this.setState({ itemsInCart: items, total: this.updateTotal(items) });
  };

  handleDec = (item) => {
    const items = [...this.state.itemsInCart];
    const index = items.indexOf(item);

    if (items[index].quantity < 2) return null;

    items[index].quantity--;
    this.addUserItemsToDB(items);
    this.setState({ itemsInCart: items, total: this.updateTotal(items) });
  };

  handleDel = (itemId) => {
    const itemsInCart = this.state.itemsInCart.filter(
      (x) => x.itemId !== itemId
    );
    this.addUserItemsToDB(itemsInCart);
    this.setState({ itemsInCart, total: this.updateTotal(itemsInCart) });
  };

  handleLogIn = (usrData, usrEmail, usrPwdHash, session) => {
    Cookies.set("session", session, { expires: 7, path: "/" });
    Cookies.set("email", usrEmail, { expires: 7, path: "/" });

    this.setState({ loggedIn: true, itemsInCart: usrData });
  };

  addUserItemsToDB(data) {
    if (!this.state.loggedIn) {
      return null;
    }
    let idArry = [];
    data.forEach((item) => {
      idArry.push(item.itemId);
    });
    const session = Cookies.get("session");
    const email = Cookies.get("email");
    if (session && email) {
      const options = {
        method: "POST",
        body: JSON.stringify({
          session: session,
          email: email,
          data: idArry,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(`${window.config.api}/add_item_user`, options);
    }
  }

  handleItemFormShow = () => {
    console.log("show");
  };

  handleLogOut = () => {
    Cookies.remove("session", { path: "/" });
    Cookies.remove("email", { path: "/" });
    this.props.alert.success("Logged Out");
    this.setState({ loggedIn: false, itemsInCart: [] });
  };

  handleSearch = (searchTerm) => {
    let items;

    if (!this.state.itemsAlt) {
      items = this.state.items;
    } else {
      items = this.state.itemsAlt;
    }

    this.setState({
      itemsAlt: items,
      items: items.filter((item) => {
        return item.itemTitle.toUpperCase().includes(searchTerm.toUpperCase());
      }),
    });
  };
}

export default withAlert()(App);
