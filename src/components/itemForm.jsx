import React, { Component } from "react";
import addItem from "../misc/addItem";
import { withAlert } from "react-alert";

class ItemForm extends Component {
  state = {
    errorMsg: "",
  };
  render() {
    return (
      <>
        <div className="card-header bg-transparent border-primary text-center fs-3">
          Add Item
        </div>
        <div className="container mb-3 mt-3">
          <form className="text-white" onSubmit={this.handelSubmitEvent}>
            <div className="mb-3">
              <label className="form-label">Item Name</label>
              <input
                type="text"
                name="itemName"
                className="form-control"
                id="itemNameInput"
                placeholder="Item Name"
                required
              />
            </div>
            <label className="form-label">Item Description</label>
            <textarea
              type="text"
              name="itemDesc"
              className="form-control"
              id="descInput"
              placeholder="Item Description"
              aria-label="With textarea"
              required
            />
            <label className="text-danger form-label"></label>
            <label className="form-label">Item Price</label>
            <div className="mb-3 input-group">
              <input
                type="number"
                step="any"
                min="0.1"
                name="itemPrice"
                className="form-control"
                id="itemPriceInput"
                placeholder="Item Price"
                required
              />
              <span className="input-group-text">$</span>
            </div>
            <label className="form-label">Image Url</label>
            <input
              type="url"
              name="itemImageUrl"
              className="form-control"
              id="imgUrlInput"
              placeholder="Image Url"
              required
            />
            <div className="mb-3" />

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              className="btn btn-secondary ms-3"
              onClick={this.props.onClose}
            >
              Close
            </button>
          </form>
          {this.state.errorMsg}
        </div>
      </>
    );
  }

  handelSubmitEvent = async (event) => {
    this.setState({ errorMsg: "" });
    event.preventDefault();
    var { itemName, itemDesc, itemPrice, itemImageUrl } = event.target;
    const dataObj = {
      itemId: Math.random().toString(16).slice(2),
      itemTitle: itemName.value,
      itemDesc: itemDesc.value,
      itemPrice: itemPrice.value,
      imageUrl: itemImageUrl.value,
    };
    const status = await addItem(dataObj);
    this.props.onClose();
    if (status !== "success") {
      this.props.alert.error("Couldn't add item to Database");
      return -1;
    }

    this.props.alert.success("Added Item to Database!");
  };
}

export default withAlert()(ItemForm);
