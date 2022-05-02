import React, { Component } from "react";

class CartItem extends Component {
  state = {
    item: {},
  };

  async componentDidMount() {
    await fetch(`${window.config.api}/data?type=item&id=${this.props.itemId}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ item: json.data });
      });
  }

  render() {
    const { onDel, onInc, onDec } = this.props;
    return (
      <div className="col rounded" style={{ width: "19rem" }}>
        <div className="card h-100 bg-dark text-white shadow border-primary border-1 rounded text-white">
          <img
            height="250rem"
            src={this.state.item.imageUrl}
            className="card-img-top"
            alt={this.state.item.itemTitle}
          />
          <div className="card-body">
            <h5 className="card-title">
              {this.state.item.itemTitle}
              <span className="badge bg-primary m-2">
                {this.state.item.quantity}
              </span>
            </h5>
            <p className="card-text">{this.state.item.itemDesc}</p>
          </div>
          <div className="d-flex justify-content-center mb-2">
            <button
              className="btn btn-secondary"
              onClick={() => onInc(this.state.item)}
            >
              +
            </button>
            <button
              className="btn btn-secondary mx-2"
              onClick={() => onDec(this.state.item)}
            >
              -
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDel(this.state.item.itemId)}
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
