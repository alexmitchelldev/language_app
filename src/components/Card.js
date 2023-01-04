import { useState, useEffect } from "react";
import EditCard from "./EditCard";
import Modal from "react-bootstrap/Modal";

const MAX_TAGS_TO_DISPLAY = 4;

const Card = (props) => {
  const [tagsStyles, setTagsStyles] = useState([]);
  const [titleFront, setTitleFront] = useState(props.title_front);
  const [titleBack, setTitleBack] = useState(props.title_back);
  const [textFront, setTextFront] = useState(props.text_front);
  const [textBack, setTextBack] = useState(props.text_back);
  const [cardTags, setCardTags] = useState(props.tags);
  const [languageFront, setLanguageFront] = useState(props.language_front);
  const [languageBack, setLanguageBack] = useState(props.language_back);

  let tagsArray = null;

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const HandleDelete = () => {
    setShow(false);
    fetch(`http://localhost:8002/api/cards/${props.card.id}`, {
      method: "DELETE",
    });
  };
  const handleSave = () => {
    setShow(false);
  };
  const handleClose = () => {
    setShow(false);
  };

  const tags = {
    "french comprehensible input": {
      color: {
        background: "bg-red-300",
        text: "text-red-600",
      },
    },
    beginner: {
      color: {
        background: "bg-green-300",
        text: "text-green-600",
      },
    },
    french: {
      color: {
        background: "bg-blue-300",
        text: "text-blue-600",
      },
    },
    "coffee break french": {
      color: {
        background: "bg-yellow-600",
        text: "text-yellow-900",
      },
    },
    verb: {
      color: {
        background: "bg-yellow-200",
        text: "text-yellow-500",
      },
    },
  };


  const formatTagsString = (tagsString) => {
    return JSON.stringify(
      tagsString
        .split("#")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
    );
  };

  const formatCardAttributeString = (cardAttributeString) => {
    return cardAttributeString.replace(/'/g, "''");
  };

  return (
    <>
      <div 
      className="flex-initial w-full md:w-1/3 lg:w-1/5 min-h-64 max-h-64 rounded overflow-hidden shadow-lg m-1 hover:cursor-pointer relative"
      onClick={handleShow}>
        {props.img ? (
          <img
            className="w-full"
            src={props.img ? props.img : null}
            alt="Sunset in the mountains"
          ></img>
        ) : null}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{props.title_front}</div>
          {/* <div className="text-xs">Created: {props.create_date}</div> */}
          <p className="text-gray-700 text-base">{props.text_front}</p>
        </div>
        <div className="pb-10 pl-4">
          {props.tags
            ? cardTags.map((tag, index) => {
                let tagClass = "inline-block rounded-full px-3 py-1 text-xs font-semibold mr-2 hover:cursor-pointer";
                const tagBackground = tags[`${tag}`]
                  ? tags[`${tag}`].color.background
                  : "bg-gray-200";
                const tagText = tags[`${tag}`]
                  ? tags[`${tag}`].color.text
                  : "text-gray-700";
                tagClass += ` ${tagBackground} ${tagText}`;
                return index < MAX_TAGS_TO_DISPLAY ? <span className={tagClass} key={index}>#{tag}</span> : null;
              })
            : null}
            {cardTags.length > MAX_TAGS_TO_DISPLAY ? <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold mr-2 hover:cursor-pointer bg-gray-200">...</span> : null}
        </div>
        <div style={{position: 'absolute', bottom: 0}}>
          <EditCard card={props}/>
        </div>
      </div>
    </>
  );
};

export default Card;
