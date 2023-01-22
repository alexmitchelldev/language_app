import React from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-dropdown";

class CardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddCard: props.isAddCard ? props.isAddCard : false,
      isEditCard: props.isEditCard ? props.isEditCard : false,
      isStudyCard: props.isStudyCard ? props.isStudyCard : false,
      isDeleteCard: false,
      handleClose: props.handleClose,
    };
    this.data = props.data
      ? props.data
      : {
          titleFront: null,
          titleBack: null,
          textFront: null,
          textBack: null,
          tags: null,
          languageFront: null,
          languageBack: null,
        };
    this.options = [
      { key: "en", text: "English", value: "en" },
      { key: "fr", text: "French", value: "fr" },
    ];
    this.regex = {
      singleQuote: /'/g,
      squareBrackets: /\[|\]/g,
    };
  }

  handleDelete = () => {
    this.setState({ isDeleteCard: true });
  };

  button() {
    const { isAddCard, isEditCard, isStudyCard, handleClose } = this.state;
    const { handleDelete } = this;

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
        {isEditCard ? (
          <>
            <button
              className="inline-block px-6 py-2.5 bg-red-800 hover:bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out opacity-60"
              form="card-modal"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        ) : null}
        <button className={buttonClass} form="card-modal" value="Submit">
          {buttonText}
        </button>
      </>
    );
  }

  createTagsArray(tagsString) {
    return JSON.stringify(
      tagsString
        .toString()
        .split("#")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
    ).replace(/"/g, "'");
  }

  renderTags(tags) {
    // https://www.fwait.com/how-to-replace-all-square-brackets-in-javascript/
    const singleQuoteRegex = /'/g;
    const squareBracketsRegex = /\[|\]/g;

    return tags !== null
      ? tags
          .toString()
          .split(`,`)
          .map((tag) => `#${tag}`)
          .join(` `)
          .replace(squareBracketsRegex, ``)
          .replace(singleQuoteRegex, ``)
      : ``;
  }

  formatCardDataForDatabase(cardData) {
    // PostgreSQL INSERT statement for a column of data type VARCHAR will crash if the value contains a single quote
    // Repeating the single quote ensures data is inserted correctly
    const doubleSingleQuote = `''`;
    const singleQuoteRegex = /'/g;

    for (const key in cardData) {
      if (typeof cardData[key] === "string" && key !== "tags") {
        cardData[key] = cardData[key].replace(
          singleQuoteRegex,
          doubleSingleQuote
        );
      }
    }

    return cardData;
  }

  render() {
    const { isAddCard, isEditCard, isStudyCard, isDeleteCard, handleClose } =
      this.state;
    const { data, options, renderTags, formatCardDataForDatabase } = this;
    const { addCard, editCard } = this.props;

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
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (isDeleteCard) {
                  console.log(data);
                  this.props.deleteCard(data.id);
                } else if (isAddCard) {
                  addCard(formatCardDataForDatabase(data));
                } else if (isEditCard) {
                  editCard(formatCardDataForDatabase(data));
                }
              }}
              id="card-modal"
            >
              <input
                className="appearance-none min-w-full text-3xl mb-3 no-focus"
                type="text"
                placeholder="Title..."
                defaultValue={this.data.titleFront}
                onChange={(title) => {
                  this.data.titleFront = title.target.value;
                }}
              ></input>
              <textarea
                className="appearance-none min-w-full text-1xl mb-3 no-border no-focus"
                placeholder="Description..."
                defaultValue={this.data.textFront}
                onChange={(description) => {
                  this.data.textFront = description.target.value;
                }}
              ></textarea>
              <input
                className="appearance-none min-w-full text-1xl no-focus"
                type="text"
                placeholder="Tags..."
                defaultValue={renderTags(data.tags)}
                onChange={(tags) => {
                  this.data.tags = this.createTagsArray(tags.target.value);
                }}
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
