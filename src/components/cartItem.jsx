import React, { Component } from "react";

class CartItem extends Component {
  state = {};
  render() {
    const { item, onDel, onInc, onDec } = this.props;
    return (
      <div className="col rounded" style={{ width: "19rem" }}>
        <div className="card h-100 bg-dark text-white shadow border-primary border-1 rounded text-white">
          <img
            height="250rem"
            src={item.imageUrl}
            className="card-img-top"
            alt={item.itemTitle}
          />
          <div className="card-body">
            <h5 className="card-title">
              {item.itemTitle}
              <span className="badge bg-primary m-2">{item.quantity}</span>
            </h5>
            <p className="card-text">{item.itemDesc}</p>
          </div>
          <div className="d-flex justify-content-center mb-2">
            <button className="btn btn-secondary" onClick={() => onInc(item)}>
              +
            </button>
            <button
              className="btn btn-secondary mx-2"
              onClick={() => onDec(item)}
            >
              -
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDel(item.itemId)}
            >
              Remove from Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
