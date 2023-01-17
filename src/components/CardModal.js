import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-dropdown";

class CardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddCard: props.isAddCard ? props.isAddCard : false,
      isEditCard: props.isEditCard ? props.isEditCard : false,
      isStudyCard: props.isStudyCard ? props.isStudyCard : false,
      handleClose: props.handleClose,
    };
    this.options = [
      { key: "en", text: "English", value: "en" },
      { key: "fr", text: "French", value: "fr" },
    ];
  }

  button() {
    const { isAddCard, isEditCard, isStudyCard, handleClose } = this.state;

    let buttonClass = `inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out opacity-60 ml-2`;
    let buttonText = ``;

    if (isAddCard) {
      buttonClass += " bg-blue-800 hover:bg-blue-600";
      buttonText = "Add";
    } else if (isEditCard) {
      buttonClass += " bg-green-800 hover:bg-green-600";
      buttonText = "Save";
    } else if (isStudyCard) {
      buttonClass += " bg-red-800 hover:bg-red-600";
      buttonText = "Flip";
    }

    return (
      <>
        <button
          className="inline-block px-6 py-2.5 bg-gray-800 hover:bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out opacity-60 mr-2"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className={buttonClass}
          form="add-card-modal"
          value="Submit"
          onClick={handleClose}
        >
          {buttonText}
        </button>
      </>
    );
  }

  render() {
    const { isAddCard, isEditCard, isStudyCard } = this.state;
    const { options } = this.options;
    const { handleClose } = this.state;

    return (
      <>
        <Modal
          show={true}
          dialogClassName="add-card-modal"
          // https://react-bootstrap.github.io/components/modal/
          className="card-modal modal-lg"
        >
          <Modal.Header>
            <Dropdown
              options={options}
              className="relative right-0"
              controlClassName="bg-white rounded border border-gray-300"
              menuClassName="absolute right-0 z-50 mt-1 rounded-md shadow-lg"
              placeholder="Language"
            />
            <button
              className="relative right-0 text-gray-600"
              onClick={handleClose}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </Modal.Header>
          <Modal.Body>
            <form>
              <input
                className="appearance-none min-w-full text-3xl mb-3 no-focus"
                type="text"
                placeholder="Title..."
              ></input>
              <textarea
                className="appearance-none min-w-full text-1xl mb-3 no-border no-focus"
                placeholder="Description..."
              ></textarea>
              <input
                className="appearance-none min-w-full text-1xl no-focus"
                type="text"
                placeholder="Tags..."
              ></input>
            </form>
          </Modal.Body>
          <Modal.Footer class="flex items-center justify-center p-2">
            {isAddCard ? this.button() : null}
            {isEditCard ? this.button() : null}
            {isStudyCard ? this.button() : null}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CardModal;