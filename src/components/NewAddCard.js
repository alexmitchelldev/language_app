import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
// import { Dropdown, Button } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import Dropdown from "react-dropdown";
import "../index.css";

const FlashcardModal = (props) => {
  const [titleFront, setTitleFront] = useState("");
  const [titleBack, setTitleBack] = useState("");
  const [textFront, setTextFront] = useState("");
  const [textBack, setTextBack] = useState("");
  const [tags, setTags] = useState("");
  const [languageFront, setLanguageFront] = useState("");
  const [languageBack, setLanguageBack] = useState("");

  const options = [
    { key: "en", text: "English", value: "en" },
    { key: "fr", text: "French", value: "fr" },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTitleFront("");
    setTitleBack("");
    setTextFront("");
    setTags("");
    setLanguageFront("");
    setLanguageBack("");
  };

  const handleSave = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const formatTagsString = (tagsString) => {
    return JSON.stringify(
      tagsString
        .split("#")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
    ).replace(/"/g, "'");
  };

  const formatCardAttributeString = (cardAttributeString) => {
    return cardAttributeString.replace(/'/g, "''");
  };

  return (
    <>
      <button
        className="bg-gray-600 hover:bg-gray-800 text-white py-1 px-6 rounded-md mr-2 w-full md:w-auto"
        onClick={handleShow}
      >
        <span className="text-lg font-medium">Add Card (NEW)</span>
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
      <Modal
        show={show}
        onHide={handleClose}
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
            <textarea className="appearance-none min-w-full text-1xl mb-3 no-border no-focus" placeholder="Description..."></textarea>
            <input
              className="appearance-none min-w-full text-1xl no-focus"
              type="text"
              placeholder="Tags..."
            ></input>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="inline-block px-6 py-2.5 bg-gray-800 hover:bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out opacity-60"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="inline-block px-6 py-2.5 bg-blue-800 hover:bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out opacity-60"
            form="add-card-modal"
            value="Submit"
            onClick={handleSave}
          >
            Add Card
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FlashcardModal;
