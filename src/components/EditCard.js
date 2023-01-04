import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

const EditCard = (props) => {
  const [titleFront, setTitleFront] = useState(props.card.title_front);
  const [titleBack, setTitleBack] = useState(props.card.title_back);
  const [textFront, setTextFront] = useState(props.card.text_front);
  const [textBack, setTextBack] = useState(props.card.text_back);
  const [tags, setTags] = useState(props.card.tags);
  const [languageFront, setLanguageFront] = useState(props.card.language_front);
  const [languageBack, setLanguageBack] = useState(props.card.language_back);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const HandleDelete = () => {
    setShow(false);
    fetch(`http://localhost:8002/api/cards/${props.card.id}`, {
      method: "DELETE",
    });
  };

  const editCard = (body) => {
    const id = props.card.id;
    const editCardBody = new URLSearchParams({
      titleFront: body.titleFront,
      titleBack: body.titleBack,
      textFront: body.textFront,
      tags: body.tags,
      languageFront: body.languageFront,
      languageBack: body.languageBack,
    });
    console.log(editCardBody);
    // https://stackoverflow.com/questions/71678250/how-to-post-body-data-using-fetch-api
    fetch(`http://localhost:8002/api/cards/${id}`, {
      method: "PUT",
      body: editCardBody,
    });
  };

  const handleSave = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    console.log(props.card.id);
  };

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
        className="px-2 ml-4 mb-2 block text-sm bg-gray-200 text-gray-500 font-semibold rounded border border-gray-200 hover:bg-gray-100 hover:border-transparent focus:outline-none focus:ring-1"
        onClick={handleShow}
      >
        Edit Card
      </button>
      <Modal show={show} onHide={handleClose} dialogClassName="add-card-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              // prevent page refresh
              e.preventDefault();

              editCard({
                titleFront: formatCardAttributeString(titleFront),
                titleBack: formatCardAttributeString(titleBack),
                textFront: formatCardAttributeString(textFront),
                tags: tags,
                languageFront: formatCardAttributeString(languageFront),
                languageBack: formatCardAttributeString(languageBack),
              });

              setShow(false);
              setTitleFront("");
              setTitleBack("");
              setTextFront("");
              setTags([]);
              setLanguageFront("");
              setLanguageBack("");
            }}
            id="edit-card-modal"
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
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded min-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-title-front"
                  type="text"
                  placeholder="Ça va?"
                  defaultValue={titleFront}
                  onChange={(newTitleFront) => {
                    const formattedTitleFrontString = formatCardAttributeString(
                      newTitleFront.target.value
                    );
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
                  placeholder="How are you?"
                  defaultValue={titleBack}
                  onChange={(newTitleBack) => {
                    const formattedTitleBackString = formatCardAttributeString(
                      newTitleBack.target.value
                    );
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
                  defaultValue={textFront}
                  onChange={(newTextFront) => {
                    const formattedTextFrontString = formatCardAttributeString(
                      newTextFront.target.value
                    );
                    console.log(formattedTextFrontString);
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
                  defaultValue={textBack}
                  onChange={(newTextBack) => {
                    const formattedTextBackString = formatCardAttributeString(
                      newTextBack.target.value
                    );
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
                  defaultValue={tags}
                  onChange={(newTags) => {
                    const formattedTagsString = formatTagsString(
                      newTags.target.value
                    );
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
                  defaultValue={languageFront}
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
                  defaultValue={languageBack}
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
            className="inline-block px-6 py-2.5 bg-gray-800 hover:bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out opacity-60"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="inline-block px-6 py-2.5 bg-red-800 hover:bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out opacity-60"
            form="edit-card-modal"
            onClick={HandleDelete}
          >
            Delete Card
          </button>
          <button
            className="inline-block px-6 py-2.5 bg-blue-800 hover:bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out opacity-60"
            form="edit-card-modal"
            value="Submit"
            onClick={handleSave}
          >
            Save Card
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCard;
