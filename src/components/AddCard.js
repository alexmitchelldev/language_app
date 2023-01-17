import React from "react";
import "../index.css";
import CardModal from "./CardModal.js";

class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  addURLSearchParams = (data, params) => {
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        params.set(`${key}`, `${data[key]}`);
      }
    });

    return params;
  }

  addCard = (data) => {
    const newCard = this.addURLSearchParams(data, new URLSearchParams());

    fetch('http://localhost:8002/api/cards', {
      method: "POST",
      body: newCard
    });

    this.handleClose();
  }

  render() {
    const { handleShow, handleClose, addCard } = this;
    const { show } = this.state;

    return (
      <>
        <button
          className="bg-gray-600 hover:bg-gray-800 text-white py-1 px-6 rounded-md mr-2 w-full md:w-auto"
          onClick={handleShow}
        >
          <span className="text-lg font-medium">Add Card</span>
          <svg
            className="h-6 w-6 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        {show ? <CardModal handleClose={handleClose} isAddCard={true} addCard={addCard}/> : null}
      </>
    );
  }
}

export default AddCard;
