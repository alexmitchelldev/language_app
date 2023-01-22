import React from "react";
import CardModal from "./CardModal.js";

class EditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
    this.data = {
      id: props.card.id,
      titleFront: props.card.title_front,
      titleBack: props.card.title_back,
      textFront: props.card.text_front,
      textBack: props.card.text_back,
      tags: props.card.tags,
      languageFront: props.card.language_front,
      languageBack: props.card.language_back
    }
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  editCard = (data) => {
    const { id } = data;

    const editedCard = this.addURLSearchParams(data, new URLSearchParams());

    // https://stackoverflow.com/questions/71678250/how-to-post-body-data-using-fetch-api
    fetch(`http://localhost:8002/api/cards/${id}`, {
      method: "PUT",
      body: editedCard,
    });

    this.handleClose();
  };
  
  deleteCard = (cardID) => {

    fetch(`http://localhost:8002/api/cards/${cardID}`, {
      method: "DELETE",
    });

    this.handleClose();
  }

  addURLSearchParams = (data, params) => {
    Object.keys(data).forEach((key) => {
      if (data[key] && key !== 'id') {
        params.set(`${key}`, `${data[key]}`);
      }
    });

    return params;
  }

  render () {
    const { handleShow, handleClose, data, editCard, deleteCard } = this;
    const { show } = this.state;

    return (
      <>
      <button
        className="px-2 ml-4 mb-2 block text-sm bg-gray-200 text-gray-500 font-semibold rounded border border-gray-200 hover:bg-gray-100 hover:border-transparent focus:outline-none focus:ring-1"
        onClick={handleShow}
      >
        Edit Card
      </button>
      {show ? <CardModal handleClose={handleClose} isEditCard={true} data={data} editCard={editCard} deleteCard={deleteCard}/> : null}
    </>
    );
  }
}

export default EditCard;
