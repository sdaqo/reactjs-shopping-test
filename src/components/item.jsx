import React, { Component } from "react";

class Item extends Component {
  render() {
    const { onAdd, item } = this.props;

    return (
      <div className="col rounded " style={{ width: "19rem" }}>
        <div className="card h-100 bg-dark shadow border-primary border-1 rounded text-white">
          <img
            loading="lazy"
            width="19rem"
            height="250rem"
            src={item.imageUrl}
            className="card-img-top"
            alt={item.itemTitle}
          />

          <div className="card-body p-4 expanding">
            <h5 className="card-title">
              {item.itemTitle} | {item.itemPrice}$
            </h5>
            <p className="card-text">{item.itemDesc}</p>
          </div>

          <button
            className="btn btn-primary rounded-0"
            onClick={() => onAdd(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
