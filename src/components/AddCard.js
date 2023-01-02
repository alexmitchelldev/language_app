import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

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
    return JSON.stringify(tagsString.split('#').map((tag) => tag.trim()).filter((tag) => tag !== ''));
  };

  const formatCardAttributeString = (cardAttributeString) => {
    return cardAttributeString.replace(/'/g, "''");
  }

  return (
    <>
      <button
        className="px-5 py-3 mx-auto block text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        onClick={handleShow}
      >
        Add Card
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              // prevent page refresh
              e.preventDefault();
              props.addCard(
                titleFront,
                titleBack,
                textFront,
                tags,
                languageFront,
                languageBack
              );

              setShow(false);
              setTitleFront("");
              setTitleBack("");
              setTextFront("");
              setTags([]);
              setLanguageFront("");
              setLanguageBack("");
            }}
            id="add-card-modal"
            className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name"
                >
                  Title Front
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-title-front"
                  type="text"
                  placeholder="How are you?"
                  onChange={(newTitleFront) => {
                    const formattedTitleFrontString = formatCardAttributeString(newTitleFront.target.value);
                    console.log(formattedTitleFrontString);
                    setTitleFront(formattedTitleFrontString);
                  }}
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-role"
                >
                  Title Back
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-title-back"
                  type="text"
                  placeholder="Ça va?"
                  onChange={(newTitleBack) => {
                    const formattedTitleBackString = formatCardAttributeString(newTitleBack.target.value)
                    setTitleBack(formattedTitleBackString);
                  }}
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-role"
                >
                  Text Front
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-text-front"
                  type="text"
                  placeholder="This expression is used..."
                  onChange={(newTextFront) => {
                    const formattedTextFrontString = formatCardAttributeString(newTextFront.target.value);
                    setTextFront(formattedTextFrontString);
                  }}
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-role"
                >
                  Text Back
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-text-back"
                  type="text"
                  placeholder="Cette expression est utilisée..."
                  onChange={(newTextBack) => {
                    const formattedTextBackString = formatCardAttributeString(newTextBack.target.value);
                    setTextBack(formattedTextBackString);
                  }}
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-role"
                >
                  Tags
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-tags"
                  type="text"
                  placeholder="#beginner #verb"
                  onChange={(newTags) => {
                    const formattedTagsString = formatTagsString(newTags.target.value);
                    console.log(formattedTagsString);
                    setTags(formattedTagsString);
                  }}
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-role"
                >
                  Language Front
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-language-front"
                  type="text"
                  placeholder="FR"
                  onChange={(newLanguageFront) => {
                    setLanguageFront(newLanguageFront.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-role"
                >
                  Language Back
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-language-back"
                  type="text"
                  placeholder="EN"
                  onChange={(newLanguageBack) => {
                    setLanguageBack(newLanguageBack.target.value);
                  }}
                ></input>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="inline-block px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out opacity-60"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="inline-block px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out opacity-60"
            form="add-card-modal"
            value="Submit"
            onClick={handleSave}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCard;
