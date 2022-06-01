import React, { Component } from "react";
import Item from "../components/item";

class Products extends Component {
  state = {
    extraClass: "ms-3",
  };
  constructor() {
    super();
    if (window.innerWidth < 720) {
      this.state.extraClass = "justify-content-center";
    }
  }

  dataItemGen() {
    const items = this.props.itemData.map((item) => (
      <Item key={item.itemId} onAdd={this.props.onAdd} item={item} />
    ));
    return items;
  }

  render() {
    return (
      <>
        <form className="">
          <input
            className="searchBox"
            type="seach"
            placeholder="Search for Products"
            aria-label="Search"
            id="search"
            autoComplete="off"
            onChange={(event) => this.props.onSearch(event.target.value)}
          />
        </form>
        <div
          className={`row row-cols-1 g-4 mt-2 me-0 card-group ${this.state.extraClass}`}
        >
          {!this.props.itemData ? "" : this.dataItemGen()}
        </div>
      </>
    );
  }
}

export default Products;
