import React, { Component } from "react";
import CartItem from "../components/cartItem";

class ShoppingCart extends Component {
  state = {};
  render() {
    const { items, onInc, onDec, onDel } = this.props;
    return (
      <>
        <div className="row row-cols-1 g-4 mt-2 ms-4 me-0">
          {items.map((item) => (
            <CartItem
              key={item.itemId}
              item={item}
              onDel={onDel}
              onInc={onInc}
              onDec={onDec}
            />
          ))}
        </div>
        <button className="btn btn-success position-fixed bottom-0 end-0 m-3 shadow">
          Check Out ({this.props.total}$)
        </button>
      </>
    );
  }
}

export default ShoppingCart;
