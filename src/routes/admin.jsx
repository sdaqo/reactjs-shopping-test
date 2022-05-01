import React, { Component } from "react";
import ItemForm from "../components/itemForm";
import { Modal } from "react-bootstrap";

class Admin extends Component {
  state = {
    show: false,
  };

  render() {
    return (
      <>
        <span className="d-flex justify-content-center text-white mt-3">
          Under Construction
        </span>
        <Modal
          className="text-white"
          show={this.state.show}
          onHide={this.handleModalClose}
          centered
        >
          {" "}
          <Modal.Body className="bg-dark">
            <ItemForm onClose={this.handleModalClose} />
          </Modal.Body>
        </Modal>
        <button
          className="btn btn-primary mt-3 ms-3"
          onClick={this.handleModalShow}
        >
          Add Item To Database
        </button>
      </>
    );
  }

  handleModalShow = () => {
    this.setState({ show: true });
  };

  handleModalClose = () => {
    this.setState({ show: false });
  };
}

export default Admin;
