import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-dropdown";
import "../index.css";
import CardModal from "./CardModal.js";

const AddCard = (props) => {
  const [titleFront, setTitleFront] = useState("");
  const [titleBack, setTitleBack] = useState("");
  const [textFront, setTextFront] = useState("");
  const [textBack, setTextBack] = useState("");
  const [tags, setTags] = useState("");
  const [languageFront, setLanguageFront] = useState("");
  const [languageBack, setLanguageBack] = useState("");

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

  const addURLSearchParams = (data, params) => {
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        params.set(`${key}`, `${data[key]}`);
      }
    });

    return params;
  }

  const addCard = (data) => {
    const newCard = addURLSearchParams(data, new URLSearchParams());

    fetch('http://localhost:8002/api/cards', {
      method: "POST",
      body: newCard
    });

    setShow(false);
  }

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
};

export default AddCard;
